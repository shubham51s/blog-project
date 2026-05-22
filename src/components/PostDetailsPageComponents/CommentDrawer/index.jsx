import React, { useContext, useEffect, useRef, useState } from "react";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../../context/userContext";
import { formatMonthAndDayLong } from "../../../utils/monthDateLongFormatter";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import ListItem from "./ListItem";
import ListLoader from "./ListItem/skeleton";

function CommentDrawer({ blog, setBlog, setIsShowDrawer, setRecentComments }) {
  const limit = 20;
  const container = useRef(null);
  const { requestHandler } = useRequestHandler();
  const defaultTimeout = useRef(null);
  const [isEnable, setIsEnable] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [loaders, setLoaders] = useState({
    fetch: true,
    addComment: false,
    default: true,
  });
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: true,
        codeBlock: true,
        horizontalRule: true,
        listItem: true,
        orderedList: true,
        bulletList: true,
      }),
      Placeholder.configure({
        placeholder: "What are your thoughts?",
      }),
      CharacterCount.configure({
        limit: 3000,
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    // onUpdate: ({ editor }) => {
    //   setInput(editor.getHTML());
    // },
  });

  if (!editor) return null;

  const handleInputStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const disableCommentInput = () => {
    setIsEnable(false);
    editor?.commands.clearContent();
  };

  const closeCommentDrawer = () => {
    setIsShowDrawer(false);
  };

  const enableCommentInput = () => {
    if (!isEnable) setIsEnable(true);
    editor?.commands.focus();
  };

  const handleAddComment = async () => {
    setLoaders((prev) => ({ ...prev, addComment: true }));
    try {
      const params = {
        blog: blog._id,
        content: editor?.getHTML(),
      };

      const response = await requestHandler("/comment", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comment) {
        setComments((prev) => [{ ...result.data.comment }, ...prev]);
        setRecentComments((prev) => [{ ...result.data.comment }, ...prev]);
        setBlog((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
        disableCommentInput();
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
    } finally {
      setLoaders((prev) => ({ ...prev, addComment: false }));
    }
  };

  const getComments = async (isInit = false) => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/comment/${blog._id}?cursor=${scroll.cursor}&limit=${limit}` : `/comment/${blog._id}?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comments?.length) {
        setComments((prev) => [...prev, ...result.data.comments]);
        if (isInit) setRecentComments(result.data.comments.slice(0, 3));
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setScroll((prev) => ({ ...prev, loading: false }));
      setLoaders((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleClickOutside = (e) => {
    const commentBtns = document.querySelectorAll(".listCommentBtn");
    const clickedInsideButton = [...commentBtns].some((btn) => btn.contains(e.target));
    if (container.current && !container.current.contains(e.target) && !clickedInsideButton) {
      closeCommentDrawer();
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getComments,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    setIsShow(true);
    getComments(true);
    document.addEventListener("click", handleClickOutside);

    enableCommentInput();

    if (!defaultTimeout.current) {
      defaultTimeout.current = setTimeout(() => {
        setLoaders((prev) => ({ ...prev, default: false }));
      }, 300);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={container} onClick={(e) => e.stopPropagation()} className={`fixed right-0 top-2 z-[999] height-11 flex flex-col justify-stretch box-border overflow-y-auto overflow-x-hidden overscroll-contain custom-bg-8 box-shadow-3 bdr-5 transition-all duration-100 linear" ${isShow ? "width-40" : "!w-0"}`} style={{ borderRight: 0, borderBlock: 0 }}>
      <div className="overflow-y-auto">
        <div className="padding-3 flex items-center justify-between">
          <div className="flex">
            <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">{`Responses (${blog.commentCount})`}</h2>
          </div>
          <div className="flex">
            <div className="custom-h-2 aspect-square">
              <AiTwotoneSafetyCertificate className="w-full h-full" />
            </div>
            <div className="relative rightCustom-1">
              <div className="relative top-0 right-0">
                <button onClick={() => closeCommentDrawer()} className="cursor-pointer m-0 p-0 flex width-13 aspect-square opacity-75  transition-all duration-75 ease hover:opacity-100">
                  <IoMdClose className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bdr-5 padding-3 margin-2" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
          <div className="flex flex-col relative bg-11 custom-fs-1">
            <div onClick={enableCommentInput} className={`transition-all duration-400 linear ${isEnable ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
              <div className="relative whitespace-pre-wrap wrap-break-word height-62">
                <EditorContent editor={editor} className={`w-full border-0 outline-0 ${isEnable ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
              </div>
            </div>
            <div className={`color-4 margin-34 flex justify-between transition-all duration-400 linear ${isEnable ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
              <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                <div className="flex">
                  <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-75 ease hover:bg-[#ede6e6] ${editor.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                    <div className="width-25 aspect-square">
                      <FaBold className="h-full w-full" onClick={(e) => handleInputStyleChange(e, "b")} title="Bold" />
                    </div>
                  </div>
                  <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-75 ease hover:bg-[#ede6e6] ${editor.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                    <div className="width-25 aspect-square">
                      <FaItalic className="h-full w-full" onClick={(e) => handleInputStyleChange(e, "i")} title="Italic" />
                    </div>
                  </div>
                </div>
              </span>
              {isEnable && (
                <div className="height-58 padding-40 flex self-end" style={{ paddingTop: 0 }}>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        disableCommentInput();
                      }}
                      className="border-0 padding-27 cursor-pointer padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0"
                    >
                      Cancel
                    </button>
                  </div>
                  <button onClick={() => handleAddComment()} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 transition-all duration-75 ease ${editor?.getText().trim().length > 0 && !loaders.addComment ? "opacity-[0.95] cursor-pointer hover:opacity-100" : "opacity-[0.2] cursor-default"}`} disabled={editor?.getText().trim().length === 0 || loaders.addComment}>
                    Respond
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="margin-2">
          {!loaders.fetch && !loaders.default && comments.length > 0 && (
            <>
              {comments.map((item) => (
                <ListItem item={item} setBlog={setBlog} key={item._id} setRecentComments={setRecentComments} />
              ))}
              {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
            </>
          )}

          {(loaders.fetch || loaders.default) && Array.from({ length: blog.commentCount > 4 ? 5 : 3 }).map((_, i) => <ListLoader key={i} />)}
          {!loaders.fetch && !loaders.default && comments.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center margin-36" style={{ marginInline: 0 }}>
              <p className="line-h-8 font-10 color-4 font-normal m-0">There are currently no responses for this story.</p>
              <p className="line-h-8 font-10 color-4 font-normal m-0">Be the first to respond.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentDrawer;
