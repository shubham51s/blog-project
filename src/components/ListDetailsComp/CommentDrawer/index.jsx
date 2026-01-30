import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { UserContext } from "../../../context/userContext";
import { formatMonthAndDayLong } from "../../../utils/monthDateLongFormatter";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";
import CommentList from "./CommentList";

function ListCommentDrawer({ setIsCommentDrawerOpen, list, setList }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const commentsContainer = useRef(null);
  const [enableInp, setEnableInp] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [loaders, setLoaders] = useState({
    addCommentLoader: false,
    initialLoader: true,
  });

  const [comments, setComments] = useState([]);

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
        limit: 10000,
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
  });

  if (!editor) return null;

  const handleInputStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const handleDisableCommentInp = () => {
    setEnableInp(false);
    editor?.commands.clearContent();
  };

  const handleCloseCommentsDrawer = () => {
    setIsCommentDrawerOpen(false);
  };

  const handleEnableAddComment = () => {
    if (!enableInp) setEnableInp(true);
    editor?.commands.focus();
  };

  const handleAddComment = async () => {
    setLoaders((prev) => ({ ...prev, addCommentLoader: true }));
    try {
      const params = { listId: list._id, content: editor?.getHTML() };

      const response = await requestHandler("/list/comment/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comment) {
        setComments((prev) => [{ ...result.data.comment }, ...prev]);
        setList((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
        handleDisableCommentInp();
      } else {
        if (response?.status < 500) {
          showToast(result?.msg || "Some error occured");
        } else {
          showToast("Some error occured");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
    } finally {
      setLoaders((prev) => ({ ...prev, addCommentLoader: false }));
    }
  };

  const fetchComments = async (skip) => {
    try {
      const response = await requestHandler(`/list/comment/${list._id}?$skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comments) {
        if (skip === 0) {
          setComments(result.data.comments);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (loaders.initialLoader) setLoaders((prev) => ({ ...prev, initialLoader: false }));
    }
  };

  const handleClickOutside = (e) => {
    const commentBtn = document.getElementById("listCommentBtn");

    if (commentsContainer.current && !commentsContainer.current.contains(e.target) && commentBtn && !commentBtn.contains(e.target)) {
      handleCloseCommentsDrawer();
    }
  };

  useEffect(() => {
    setIsShow(true);
    fetchComments(0);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={commentsContainer} onClick={(e) => e.stopPropagation()} className={`transition-all duration-200 ease box-shadow-3 bdr-5 fixed flex flex-col box-border height-11 justify-stretch right-0 top-2 overflow-y-auto overscroll-contain overflow-x-hidden custom-bg-8 z-[999]" ${isShow ? "width-40" : "w-0"}`} style={{ borderRight: 0, borderBlock: 0 }}>
      <div>
        <div className="padding-3 flex items-center justify-between">
          <div className="flex">
            <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">{`Responses ${list.commentCount}`}</h2>
          </div>
          <div className="flex">
            <div className="custom-h-2 aspect-square">
              <AiTwotoneSafetyCertificate className="w-full h-full" />
            </div>
            <div className="relative rightCustom-1">
              <div className="relative top-0 right-0">
                <button onClick={() => handleCloseCommentsDrawer()} className="cursor-pointer m-0 p-0 flex width-13 aspect-square opacity-75  transition-all duration-300 ease-in-out hover:opacity-100">
                  <IoMdClose className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bdr-5 padding-3 margin-2" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
          <div className="flex flex-col relative bg-11 custom-fs-1 padding72" style={{ paddingTop: 0 }}>
            <div onClick={handleEnableAddComment} className={`transition-all duration-400 ease-in-out ${enableInp ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
              <div className="relative whitespace-pre-wrap wrap-break-word height-62">
                <EditorContent editor={editor} className={`w-full border-0 outline-0 ${enableInp ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
              </div>
            </div>

            <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${enableInp ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
              <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                <div className="flex">
                  <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                    <div className="width-25 aspect-square">
                      <FaBold className="h-full w-full" onClick={(e) => handleInputStyleChange(e, "b")} title="Bold" />
                    </div>
                  </div>
                  <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                    <div className="width-25 aspect-square">
                      <FaItalic className="h-full w-full" onClick={(e) => handleInputStyleChange(e, "i")} title="Italic" />
                    </div>
                  </div>
                </div>
              </span>
              {enableInp && (
                <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDisableCommentInp();
                      }}
                      className="border-0 padding-27 cursor-pointer padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0"
                    >
                      Cancel
                    </button>
                  </div>
                  <button onClick={() => handleAddComment()} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal cursor-pointer m-0 ${editor?.getText().length > 0 && !loaders.addCommentLoader ? "opacity-100" : "opacity-[0.2]"}`} disabled={editor?.getText().length === 0 || loaders.addCommentLoader}>
                    Respond
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="margin-2">
          {loaders.initialLoader && (
            <div className="w-full h-full flex items-end justify-center margin-29" style={{ marginInline: 0 }}>
              <div className="width-7 aspect-square">
                <div className="w-full h-full bdr21 custom-bdr-3 animate-spin rounded-full" style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}></div>
              </div>
            </div>
          )}
          {!loaders.initialLoader && comments.length > 0 && comments.map((item) => <CommentList key={item._id} item={item} setList={setList} />)}
          {!loaders.initialLoader && comments.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center margin-36" style={{ marginInline: 0 }}>
              <p className="line-h-8 font-10 color-4 font-normal m-0">There are currently no responses for this list.</p>
              <p className="line-h-8 font-10 color-4 font-normal m-0">Be the first to respond.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCommentDrawer;
