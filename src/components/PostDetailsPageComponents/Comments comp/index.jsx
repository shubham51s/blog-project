import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../../context/userContext";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { formatMonthAndDayLong } from "../../../utils/monthDateLongFormatter";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListItem from "./ListItem";

function CommentsComp({ blog, setBlog, recentComments, setRecentComments, setIsShowDrawer }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const drawerTimeout = useRef(null);
  const [isCommentLoader, setIsCommentLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [input, setInput] = useState("");

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
    shouldRerenderOnTransaction: true,
  });

  if (!editor) return null;

  const enableAddComment = () => {
    if (!isEnable) setIsEnable(true);
    editor?.commands.focus();
  };

  const disableAddComment = () => {
    setIsEnable(false);
    editor?.commands.clearContent();
  };

  const handleTextStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const handleAddComment = async () => {
    setIsLoading(true);
    try {
      const params = {
        blog: blog._id,
        content: editor.getHTML(),
      };
      const response = await requestHandler("/comment", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comment) {
        const newComment = result.data.comment;
        setRecentComments((prev) => [newComment, ...prev]);
        setBlog((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
        disableAddComment();
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    try {
      const response = await requestHandler(`/comment/${blog._id}?limit=${4}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.comments?.length) {
        setRecentComments(result.data.comments);
      } else {
        setRecentComments([]);
      }
    } catch (err) {
      console.error(err);
      setRecentComments([]);
    }
  };

  const handleOpenCommentDrawer = (e) => {
    e.stopPropagation();

    if (!drawerTimeout.current) {
      setIsShowDrawer(true);
      drawerTimeout.current = setTimeout(() => {
        drawerTimeout.current = null;
      }, 300);
      return;
    }

    clearTimeout(drawerTimeout.current);
    drawerTimeout.current = setTimeout(() => {
      setIsShowDrawer(true);
      drawerTimeout.current = null;
    }, 300);
  };

  useEffect(() => {
    if (blog.commentCount) getComments();
  }, []);

  return (
    <>
      {blog.allowComments && (
        <div className="margin-29" style={{ marginTop: 0, marginInline: 0 }}>
          <div className="margin-27 bdr-5 w-full" style={{ marginTop: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>
          <div className="flex justify-center">
            <div className="max-width-2 margin-2 min-w-0 w-full">
              <div className="flex items-center justify-between">
                {blog.commentCount > 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">{`Responses (${blog.commentCount})`}</h2>}
                {blog.commentCount <= 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">No responses yet</h2>}
              </div>
              <div className="margin-22 margin-33 bdr-5 padding-14" style={{ marginInline: 0, borderTop: 0, borderInline: 0, paddingTop: 0, paddingInline: 0 }}>
                <div className="color-3 custom-fs-1 line-h-8 font-normal">
                  <div className="margin-11" style={{ marginTop: 0 }}>
                    <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="relative">
                        <img loading="lazy" src={userInfo.profileImg} className="width-11 aspect-square rounded-full align-middle" />
                      </div>
                      <div className="flex flex-col justify-center items-start margin-7" style={{ marginRight: 0, marginBlock: 0 }}>
                        <div className="flex flex-wrap items-baseline">
                          <span className="break-words color-3 custom-fs-1 custom-line-h-1 font-medium">{userInfo.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`border-radius-3 flex flex-col bg-11 transition-colors duration-400 ease-in ${isEnable ? "padding-40" : ""}`} style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="flex flex-col relative">
                        <div onClick={enableAddComment} className={`transition-all duration-400 ease-in-out ${isEnable ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                          <div className="relative whitespace-pre-wrap wrap-break-word height-59">
                            <EditorContent editor={editor} className={`w-full border-0 outline-0 ${isEnable ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
                          </div>
                        </div>
                        <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${isEnable ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                          <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                            <div className="flex">
                              <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center  transition-all duration-75 ease hover:bg-[#ede6e6] ${editor.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                                <div className="width-38 aspect-square">
                                  <FaBold className="h-full w-full" onClick={(e) => handleTextStyleChange(e, "b")} title="Bold" />
                                </div>
                              </div>
                              <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-75 ease hover:bg-[#ede6e6] ${editor.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                                <div className="width-38 aspect-square">
                                  <FaItalic className="h-full w-full" onClick={(e) => handleTextStyleChange(e, "i")} title="Italic" />
                                </div>
                              </div>
                            </div>
                          </span>
                          {isEnable && (
                            <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                              <div>
                                <button onClick={disableAddComment} className="border-0 padding-27 padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0 opacity-[0.9] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                                  Cancel
                                </button>
                              </div>
                              <button onClick={() => handleAddComment()} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 transition-all duration-75 ease ${editor?.getText().trim().length > 0 && !isLoading ? "opacity-[0.95] cursor-pointer hover:opacity-100" : "opacity-[0.2] cursor-default"}`} disabled={editor?.getText().trim().length === 0 || isLoading}>
                                Respond
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* comments */}
              {recentComments.length > 0 && recentComments.slice(0, 3).map((item) => <ListItem setBlog={setBlog} comment={item} key={item._id} setRecentComments={setRecentComments} />)}

              {recentComments.length > 3 && (
                <div className="margin-14" style={{ marginBottom: 0, marginInline: 0 }}>
                  <button onClick={(e) => handleOpenCommentDrawer(e)} className="listCommentBtn bdr-7 cursor-pointer border-radius-9 text-center padding-5 box-border color-3 custom-fs-1 inline-block custom-line-h-1 font-medium">
                    See all responses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentsComp;
