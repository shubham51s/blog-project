import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import { UserContext } from "../../../context/userContext";
import { formatMonthAndDayLong } from "../../../utils/monthDateLongFormatter";

function ListCommentDrawer({ setIsCommentDrawerOpen }) {
  const { userInfo } = useContext(UserContext);
  const commentsContainer = useRef(null);
  const [enableInp, setEnableInp] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [loaders, setLoaders] = useState({
    commentLoader: false,
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

  const handleAddComment = async (type) => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCommentBtnClick = () => {};

  const handleClickOutside = (e) => {
    const commentBtn = document.getElementById("listCommentBtn");

    if (commentsContainer.current && !commentsContainer.current.contains(e.target) && commentBtn && !commentBtn.contains(e.target)) {
      handleCloseCommentsDrawer();
    }
  };

  useEffect(() => {
    setIsShow(true);
    document.addEventListener("click", handleClickOutside);
    // fetchComments();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={commentsContainer} className={`transition-all duration-200 ease box-shadow-3 bdr-5 fixed flex flex-col box-border h-full justify-stretch right-0 top-2 overflow-y-auto overflow-x-hidden custom-bg-8 z-[999]" ${isShow ? "width-40" : "w-0"}`} style={{ borderRight: 0, borderBlock: 0 }}>
      <div className="overflow-auto">
        <div className="padding-3 flex items-center justify-between">
          <div className="flex">
            <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">{`Responses 20`}</h2>
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
          <div className="flex flex-col relative bg-11 custom-fs-1">
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
                  <button onClick={() => handleAddComment(2)} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal cursor-pointer m-0 ${editor?.getText().length > 0 && !loaders.commentLoader ? "opacity-100" : "opacity-[0.2]"}`} disabled={editor?.getText().length === 0 || loaders.commentLoader}>
                    Respond
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="margin-2">
          {comments.map((item) => (
            <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }} key={item._id}>
              <div className="h-full w-full">
                <div className="custom-p-y-1 padding-42" style={{ paddingInline: 0 }}>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block cursor-pointer relative">
                        <div className="relative">
                          <img src={item.user.profileImg} className="width-11 aspect-square box-border rounded-full align-middle" />
                        </div>
                      </div>
                      <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                        <div className="flex items-center">
                          <div className="cursor-pointer transition-all duration-400 ease-in-out hover:underline">
                            <p className="break-all text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{item.user.name}</p>
                          </div>
                          {item.user._id === userInfo._id && (
                            <div className="bg-[rgb(26,137,23)] text-white margin-19 border-radius-3 padding-6 line-h-7 font-8 font-normal" style={{ marginBlock: 0, marginRight: 0, paddingBlock: 0 }}>
                              Author
                            </div>
                          )}
                        </div>
                        <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">
                          <span>{formatMonthAndDayLong(item.updatedAt)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="inline-block">
                      <Popover.Root>
                        <Popover.Trigger>
                          <div className="custom-px-2 padding-36 cursor-pointer m-0">
                            <div className="width-13 aspect-square">
                              <IoIosMore className="w-full h-full" />
                            </div>
                          </div>
                        </Popover.Trigger>
                        <Popover.Content side="bottom" align="middle" sideOffset={1}>
                          <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                            <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                              {item.user._id === userInfo._id && (
                                <li className="padding-1 custom-fs-1 color-4 font-normal">
                                  <button onClick={() => handleDeleteCommentBtnClick(item._id)} className="text-[#c94a4a] cursor-pointer m-0 p-0">
                                    Delete response
                                  </button>
                                </li>
                              )}

                              {item.user._id !== userInfo._id && (
                                <li className="padding-1 custom-fs-1 color-4 font-normal">
                                  <button className="text-[#c94a4a] cursor-pointer m-0 p-0">Report response...</button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </Popover.Content>
                      </Popover.Root>
                    </div>
                  </div>
                  <div className="margin-35 break-words" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div className="padding-27">
                      <div className="color-3 custom-fs-1 line-h-8 font-normal" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListCommentDrawer;
