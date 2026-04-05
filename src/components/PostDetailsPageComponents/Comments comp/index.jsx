import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { UserContext } from "../../../context/userContext";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { formatMonthAndDayLong } from "../../../utils/monthDateLongFormatter";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function CommentsComp({ blog, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const limit = 20;
  const allCommentsBtnRef = useRef(null);
  const allCommentsContentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [isCommentLoader, setIsCommentLoader] = useState(false);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });
  const [commentsDrawer, setCommentsDrawer] = useState({
    isShow: false,
    input: "",
    isAddComment: false,
  });

  const [commentsMain, setCommentsMain] = useState({
    input: "",
    isAddComment: false,
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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setCommentsMain((prev) => ({ ...prev, input: html }));
    },
  });

  if (!editor) return null;

  const editor2 = useEditor({
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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setCommentsDrawer((prev) => ({ ...prev, input: html }));
    },
  });

  if (!editor2) return null;

  const handleEnableAddComment = () => {
    if (!commentsMain.isAddComment) setCommentsMain((prev) => ({ ...prev, isAddComment: true }));
    editor?.commands.focus();
  };

  const handleEnableAddComment2 = () => {
    if (!commentsDrawer.isAddComment) setCommentsDrawer((prev) => ({ ...prev, isAddComment: true }));
    editor2?.commands.focus();
  };

  const handleDisableAddComment = () => {
    setCommentsMain((prev) => ({ ...prev, input: "", isAddComment: false }));
    editor?.commands.clearContent();
  };

  const handleDisableAddComment2 = () => {
    setCommentsDrawer((prev) => ({ ...prev, input: "", isAddComment: false }));
    editor2?.commands.clearContent();
  };

  const handleCloseCommentsDrawer = () => {
    handleDisableAddComment2();
    setCommentsDrawer((prev) => ({ ...prev, isShow: false }));
  };

  const handleShowMoreCommentsClick = () => {
    handleDisableAddComment2();
    setCommentsDrawer((prev) => ({ ...prev, isShow: !prev.isShow }));
  };

  const handleClickOutside = (e) => {
    if (allCommentsContentRef.current && !allCommentsContentRef.current.contains(e.target) && allCommentsBtnRef.current && !allCommentsBtnRef.current.contains(e.target)) {
      handleCloseCommentsDrawer();
    }
  };

  const handleCommentTextStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const handleDrawerCommentInputTextStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor2.chain().focus().toggleBold().run();
    if (type === "i") editor2.chain().focus().toggleItalic().run();
  };

  const handleAddCommentBtnClick = async (type) => {
    setIsCommentLoader(true);
    try {
      const params = {
        blog: blog._id,
        content: type === 1 ? commentsMain.input : commentsDrawer.input,
      };

      const response = await requestHandler("/comment", "POST", params);
      const result = await response.json();
      setIsCommentLoader(false);

      if (response.status === 201) {
        if (type === 1) {
          handleDisableAddComment();
        } else {
          handleDisableAddComment2();
        }

        const newComment = result.data.comment;
        setComments((prev) => [newComment, ...prev]);

        const commentCount = blog.commentCount + 1;
        setBlog((prev) => ({ ...prev, commentCount }));

        // fetchComments();
      } else {
        showToast(response.message || "Something went wrong", "error");
      }
    } catch (err) {
      setIsCommentLoader(false);
      showToast("Something went wrong", "error");
      console.error(err);
    }
  };

  const handleDeleteCommentBtnClick = async (commentId) => {
    try {
      const response = await requestHandler(`/comment/${commentId}`, "DELETE");

      if (response.status === 200) {
        setComments((prev) => prev.filter((item) => item._id !== commentId));
        const commentCount = blog.commentCount > 0 ? blog.commentCount - 1 : 0;
        setBlog((prev) => ({ ...prev, commentCount }));
        // fetchComments();
        showToast("Comment deleted successfully");
      } else {
        const result = await response.json();
        showToast(result.message || "Something went wrong", "error");
      }
    } catch (err) {
      showToast("Something went wrong", "error");
      console.error("handleDeleteCommentBtnClick catch block: ", err);
    }
  };

  const fetchComments = async () => {
    if (!scroll.hasMore) return;

    setScroll((prev) => ({ ...prev, loading: true }));
    try {
      const url = scroll.cursor ? `/comment/${blog._id}?cursor=${scroll.cursor}&limit=${limit}` : `/comment/${blog._id}?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response.status === 200 && result?.data?.comments) {
        setComments((prev) => [...prev, ...result.data.comments]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchComments,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    fetchComments();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="margin-29" style={{ marginTop: 0, marginInline: 0 }}>
        <div className="margin-27 bdr-5 w-full" style={{ marginTop: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>
        <div className="flex justify-center">
          <div className="max-width-2 margin-2 min-w-0 w-full">
            <div className="flex items-center justify-between">
              {blog.commentCount > 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">{`Responses (${blog.commentCount})`}</h2>}
              {blog.commentCount <= 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">No responses yet</h2>}
              <div className="flex height-4 aspect-square">
                <AiTwotoneSafetyCertificate className="w-full h-full cursor-pointer opacity-[0.9] transition-all duration-100 ease-out hover:opacity-100" title="View community guidelines" />
              </div>
            </div>

            <div className="margin-22 margin-33 bdr-5 padding-14" style={{ marginInline: 0, borderTop: 0, borderInline: 0, paddingTop: 0, paddingInline: 0 }}>
              <div className="color-3 custom-fs-1 line-h-8 font-normal">
                <div className="margin-11" style={{ marginTop: 0 }}>
                  <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                    <div className="relative">
                      <img src={userInfo.profileImg} className="width-11 aspect-square rounded-full align-middle" />
                    </div>
                    <div className="flex flex-col justify-center items-start margin-7" style={{ marginRight: 0, marginBlock: 0 }}>
                      <div className="flex flex-wrap items-baseline">
                        <span className="break-words color-3 custom-fs-1 custom-line-h-1 font-normal">{userInfo.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`border-radius-3 flex flex-col bg-11 transition-colors duration-400 ease-in ${commentsMain.isAddComment ? "padding-40" : ""}`} style={{ paddingTop: 0, paddingInline: 0 }}>
                    <div className="flex flex-col relative">
                      <div onClick={handleEnableAddComment} className={`transition-all duration-400 ease-in-out ${commentsMain.isAddComment ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                        <div className="relative whitespace-pre-wrap wrap-break-word height-59">
                          <EditorContent editor={editor} className={`w-full border-0 outline-0 ${commentsMain.isAddComment ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
                        </div>
                      </div>

                      <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${commentsMain.isAddComment ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                        <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                          <div className="flex">
                            <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center  transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                              <div className="width-38 aspect-square">
                                <FaBold className="h-full w-full" onClick={(e) => handleCommentTextStyleChange(e, "b")} title="Bold" />
                              </div>
                            </div>
                            <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                              <div className="width-38 aspect-square">
                                <FaItalic className="h-full w-full" onClick={(e) => handleCommentTextStyleChange(e, "i")} title="Italic" />
                              </div>
                            </div>
                          </div>
                        </span>
                        {commentsMain.isAddComment && (
                          <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                            <div>
                              <button onClick={handleDisableAddComment} className="border-0 padding-27 padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0 opacity-[0.9] transition-all duration-200 ease-out cursor-pointer hover:opacity-100">
                                Cancel
                              </button>
                            </div>
                            <button onClick={() => handleAddCommentBtnClick(1)} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 transition-all cursor-pointer duration-200 ease-out hover:opacity-100 ${editor?.getText().length > 0 && !isCommentLoader ? "opacity-[0.95] hover:opacity-100" : "opacity-[0.2]"}`} disabled={editor?.getText().length === 0 || isCommentLoader}>
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

            {/* user comments */}

            {comments.length > 0 &&
              comments.slice(0, 3).map((item) => (
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
                                <p className="break-words text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{item.user.name}</p>
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

            {comments.length > 3 && (
              <div className="margin-14" style={{ marginBottom: 0, marginInline: 0 }}>
                <button ref={allCommentsBtnRef} onClick={handleShowMoreCommentsClick} className="bdr-7 cursor-pointer border-radius-9 text-center padding-5 box-border color-3 custom-fs-1 inline-block custom-line-h-1 font-medium">
                  See all responses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Show all comments component */}
      {/* only when to show all comments (>3) */}
      <div ref={allCommentsContentRef} className={`width-40 transition-transform duration-600 ease box-shadow-3 bdr-5 fixed flex flex-col box-border h-full justify-stretch right-0 top-2 overflow-auto custom-bg-8 z-[999]" ${commentsDrawer.isShow ? "visible translate-x-0" : "translate-x-full invisible"}`} style={{ borderRight: 0, borderBlock: 0 }}>
        <div className="overflow-auto">
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
                  <button onClick={() => handleCloseCommentsDrawer()} className="cursor-pointer m-0 p-0 flex width-13 aspect-square opacity-75  transition-all duration-300 ease-in-out hover:opacity-100">
                    <IoMdClose className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bdr-5 padding-3 margin-2" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
            <div className="flex flex-col relative bg-11 custom-fs-1">
              <div onClick={handleEnableAddComment2} className={`transition-all duration-400 ease-in-out ${commentsDrawer.isAddComment ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                <div className="relative whitespace-pre-wrap wrap-break-word height-62">
                  <EditorContent editor={editor2} className={`w-full border-0 outline-0 ${commentsDrawer.isAddComment ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
                </div>
              </div>

              <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${commentsDrawer.isAddComment ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                  <div className="flex">
                    <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor2.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                      <div className="width-25 aspect-square">
                        <FaBold className="h-full w-full" onClick={(e) => handleDrawerCommentInputTextStyleChange(e, "b")} title="Bold" />
                      </div>
                    </div>
                    <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor2.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                      <div className="width-25 aspect-square">
                        <FaItalic className="h-full w-full" onClick={(e) => handleDrawerCommentInputTextStyleChange(e, "i")} title="Italic" />
                      </div>
                    </div>
                  </div>
                </span>
                {commentsDrawer.isAddComment && (
                  <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisableAddComment2();
                        }}
                        className="border-0 padding-27 cursor-pointer padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0"
                      >
                        Cancel
                      </button>
                    </div>
                    <button onClick={() => handleAddCommentBtnClick(2)} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal cursor-pointer m-0 ${editor2?.getText().length > 0 && !isCommentLoader ? "opacity-100" : "opacity-[0.2]"}`} disabled={editor2?.getText().length === 0 || isCommentLoader}>
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
                              <p className="break-words text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{item.user.name}</p>
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
            {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsComp;
