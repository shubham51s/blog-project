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
import { useApi } from "../../../hooks/useApi";
import { toast } from "react-toastify";

function CommentsComp({ blog }) {
  const { fetchRequest } = useApi();
  const { userInfo } = useContext(UserContext);
  const [commentInp, setCommentInp] = useState("");
  const [commentInp2, setCommentInp2] = useState("");
  const [isShowAllComments, setIsShowAllComments] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  const [isAddComment2, setIsAddComment2] = useState(false);
  const allCommentsBtnRef = useRef(null);
  const allCommentsContentRef = useRef(null);
  const [commentsCount, setCommentsCount] = useState(blog.commentCount);
  const [comments, setComments] = useState([]);

  const [userComments, setUserComments] = useState([
    {
      _id: 0,
      name: "Yana Bostongirl",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*w3tvZB5IHnwLb244e12-1w.jpeg",
      comment: "Thank you for reading!",
      date: "Aug 20",
    },
    {
      _id: 1,
      name: "Madison Clarke",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*TjQ8gFFDcmp0C6PHJIKI1A.jpeg",
      comment: "Toxic people can drain so much energy—setting boundaries really is self-protection.",
      date: "Aug 20",
    },
    {
      _id: 2,
      name: "Shaant",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*_0nIFKGQWE56R5MDpoYXkQ.jpeg",
      comment: "They crave attention for good deeds. C’mon, if you are a good person, great, but you don’t need a drumroll every time you smile at a stranger or help an elderly person cross the road.",
      date: "Aug 20",
    },
    {
      _id: 3,
      name: "Madison Clarke",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*TjQ8gFFDcmp0C6PHJIKI1A.jpeg",
      comment: "Toxic people can drain so much energy—setting boundaries really is self-protection.",
      date: "Aug 20",
    },
    {
      _id: 4,
      name: "Madison Clarke",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*TjQ8gFFDcmp0C6PHJIKI1A.jpeg",
      comment: "Toxic people can drain so much energy—setting boundaries really is self-protection.",
      date: "Aug 20",
    },
  ]);

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
      setCommentInp(html);
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
      setCommentInp2(html);
    },
  });

  if (!editor2) return null;

  const handleEnableAddComment = () => {
    if (isAddComment) return;

    setIsAddComment(true);
    editor?.commands.focus();
  };

  const handleEnableAddComment2 = () => {
    if (isAddComment2) return;

    setIsAddComment2(true);
    editor2?.commands.focus();
  };

  const handleDisableAddComment = () => {
    setCommentInp("");
    setIsAddComment(false);
    editor?.commands.clearContent();
  };

  const handleDisableAddComment2 = () => {
    setCommentInp2("");
    setIsAddComment2(false);
    editor2?.commands.clearContent();
  };

  const handleShowMoreCommentsClick = () => {
    handleDisableAddComment2();
    setIsShowAllComments(!isShowAllComments);
  };

  const handleClickOutside = (e) => {
    if (allCommentsContentRef.current && !allCommentsContentRef.current.contains(e.target) && allCommentsBtnRef.current && !allCommentsBtnRef.current.contains(e.target)) {
      setIsShowAllComments(false);
    }
  };

  const handleCommentTextStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const handleAddCommentBtnClick = async (type) => {
    try {
      const params = {
        blog: blog._id,
        content: type === 1 ? commentInp : commentInp2,
      };

      const response = await fetchRequest("/comment", "POST", params);
      const result = await response.json();

      if (response.status === 201) {
        if (type === 1) {
          handleDisableAddComment();
        } else {
          handleDisableAddComment2();
        }

        setCommentsCount((prev) => prev + 1);
        fetchComments();
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (err) {
      console.log("handleAddCommentBtnClick catch block: ", err);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteCommentBtnClick = async (commentId) => {
    try {
      const response = await fetchRequest(`/comment/${commentId}`, "DELETE");

      if (response.status === 200) {
        setCommentsCount((prev) => (prev > 0 ? prev - 1 : 0));
        fetchComments();
        toast.success("Comment deleted successfully");
      } else {
        const result = await response.json();
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log("handleDeleteCommentBtnClick catch block: ", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetchRequest(`/comment/${blog._id}`, "GET");
      const result = await response.json();

      if (response.status === 200) {
        setComments(result?.data?.comments);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (err) {
      console.log("fetchComments catch blog: ", err);
    }
  };

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
              {commentsCount > 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">{`Responses (${commentsCount})`}</h2>}
              {commentsCount <= 0 && <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">No responses yet</h2>}
              <div className="flex height-4 aspect-square">
                <AiTwotoneSafetyCertificate className="w-full h-full cursor-pointer opacity-[0.9] transition-all duration-100 ease-out hover:opacity-100" title="View community guidelines" />
              </div>
            </div>

            <div className="margin-22 margin-33 bdr-5 padding-14" style={{ marginInline: 0, borderTop: 0, borderInline: 0, paddingTop: 0, paddingInline: 0 }}>
              <div className="color-3 custom-fs-1 line-h-8 font-normal">
                <div className="margin-11" style={{ marginTop: 0 }}>
                  <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                    <div className="relative">
                      <img src={userInfo.profileImg} alt={userInfo.name} className="width-11 aspect-square rounded-full align-middle" />
                    </div>
                    <div className="flex flex-col justify-center items-start margin-7" style={{ marginRight: 0, marginBlock: 0 }}>
                      <div className="flex flex-wrap items-baseline">
                        <span className="break-words color-3 custom-fs-1 custom-line-h-1 font-normal">{userInfo.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`border-radius-3 flex flex-col bg-11 transition-colors duration-400 ease-in ${isAddComment ? "padding-40" : ""}`} style={{ paddingTop: 0, paddingInline: 0 }}>
                    <div className="flex flex-col relative">
                      <div onClick={handleEnableAddComment} className={`transition-all duration-400 ease-in-out ${isAddComment ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                        <div className="relative whitespace-pre-wrap wrap-break-word height-59">
                          {/* <textarea ref={inputRef} value={commentInp} onInput={(e) => handleCommentInputChange(e)} placeholder="What are your thoughts?" className={`w-full border-0 outline-0 ${isAddComment ? "pointer-events-auto" : "height-60 pointer-events-none"}`}></textarea> */}
                          <EditorContent editor={editor} className={`w-full border-0 outline-0 ${isAddComment ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
                        </div>
                      </div>

                      <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${isAddComment ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                        <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                          <div className="flex">
                            <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center  transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("bold") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                              <div className="width-38 aspect-square">
                                <FaBold className="h-full w-full" onClick={(e) => handleCommentTextStyleChange(e, "b")} title="Bold" />
                              </div>
                            </div>
                            <div className={`inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center  transition-all duration-200 ease-out hover:bg-[#ede6e6] ${editor.isActive("italic") ? "bg18 bdr-8" : "bdr16"}`} style={{ marginBlock: 0 }}>
                              <div className="width-38 aspect-square">
                                <FaItalic className="h-full w-full" onClick={(e) => handleCommentTextStyleChange(e, "i")} title="Italic" />
                              </div>
                            </div>
                          </div>
                        </span>
                        {isAddComment && (
                          <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                            <div>
                              <button onClick={handleDisableAddComment} className="border-0 padding-27 padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0 cursor-pointer opacity-[0.9] transition-all duration-200 ease-out hover:opacity-100">
                                Cancel
                              </button>
                            </div>
                            <button onClick={() => handleAddCommentBtnClick(1)} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 transition-all duration-200 ease-out hover:opacity-100 ${editor?.getText().length > 0 ? "opacity-[0.95] hover:opacity-100" : "opacity-[0.1] pointer-events-none"}`}>
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
                              <img src={item.user.profileImg} alt={item.user.name} className="width-11 aspect-square box-border rounded-full align-middle" />
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
                              <span>{item.updatedAt}</span>
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
      <div ref={allCommentsContentRef} className={`transition-transform duration-600 ease box-shadow-3 bdr-5 pointer-events-none" ${isShowAllComments ? "fixed flex flex-col box-border h-full justify-stretch visible translateX-1 left-full top-0 overflow-auto custom-bg-8 z-[520] width-40" : "hidden translate-x-0"}`} style={{ borderRight: 0, borderBlock: 0 }}>
        <div className="overflow-auto grow">
          <div className="padding-3 flex items-center justify-between">
            <div className="flex">
              <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">{`Responses (${commentsCount})`}</h2>
            </div>
            <div className="flex">
              <div className="custom-h-2 aspect-square">
                <AiTwotoneSafetyCertificate className="w-full h-full" />
              </div>
              <div className="relative rightCustom-1">
                <div className="relative top-0 right-0">
                  <button onClick={() => setIsShowAllComments(false)} className="cursor-pointer m-0 p-0 flex width-13 aspect-square opacity-75  transition-all duration-300 ease-in-out hover:opacity-100">
                    <IoMdClose className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bdr-5 padding-3 margin-2" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
            <div className="flex flex-col relative bg-11 custom-fs-1">
              <div onClick={handleEnableAddComment2} className={`transition-all duration-400 ease-in-out ${isAddComment2 ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                <div className="relative whitespace-pre-wrap wrap-break-word height-62">
                  {/* <textarea ref={inputRef2} value={commentInp2} onInput={(e) => handleCommentInputChange2(e)} placeholder="What are your thoughts?" className={`w-full border-0 outline-0 ${isAddComment2 ? "pointer-events-auto" : "height-60 pointer-events-none"}`}></textarea> */}
                  <EditorContent editor={editor2} className={`w-full border-0 outline-0 ${isAddComment2 ? "pointer-events-auto" : "height-60 pointer-events-none"}`} />
                </div>
              </div>

              <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${isAddComment2 ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                  <div className="flex">
                    <div className="inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center" style={{ marginBlock: 0 }}>
                      <div className="width-25 aspect-square">
                        <FaBold className="h-full w-full" />
                      </div>
                    </div>
                    <div className="inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center" style={{ marginBlock: 0 }}>
                      <div className="width-25 aspect-square">
                        <FaItalic className="h-full w-full" />
                      </div>
                    </div>
                  </div>
                </span>
                {isAddComment2 && (
                  <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                    <div>
                      <button onClick={handleDisableAddComment2} className="border-0 padding-27 padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0">
                        Cancel
                      </button>
                    </div>
                    <button className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 ${editor2?.getText().length > 0 ? "opacity-100" : "opacity-[0.1]"}`}>Respond</button>
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
                            <img src={item.profileImg} alt={item.name} className="width-11 aspect-square box-border rounded-full align-middle" />
                          </div>
                        </div>
                        <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                          <div className="flex items-center">
                            <div className="cursor-pointer transition-all duration-400 ease-in-out hover:underline">
                              <p className="break-all text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{item.name}</p>
                            </div>
                            {item.user._id === userInfo._id && (
                              <div className="bg-[rgb(26,137,23)] text-white margin-19 border-radius-3 padding-6 line-h-7 font-8 font-normal" style={{ marginBlock: 0, marginRight: 0, paddingBlock: 0 }}>
                                Author
                              </div>
                            )}
                          </div>
                          <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">
                            <span>{item.date}</span>
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
                          <Popover.Content side="bottom" sideOffset={1}>
                            <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                              <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                                {item._id === userInfo._id && (
                                  <li className="padding-1 custom-fs-1 color-4 font-normal">
                                    <button onClick={() => handleDeleteCommentBtnClick(item_id)} className="text-[#c94a4a] cursor-pointer m-0 p-0">
                                      Delete response
                                    </button>
                                  </li>
                                )}

                                {item._id !== userInfo._id && (
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
                        <div className="color-3 custom-fs-1 line-h-8 font-normal">{item.comment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsComp;
