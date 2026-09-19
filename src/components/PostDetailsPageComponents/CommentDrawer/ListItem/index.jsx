import React, { useContext, useState } from "react";
import { EditorContent, h, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../../../context/userContext";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { Link } from "react-router-dom";

function ListItem({ item, setBlog, setRecentComments }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState(item);
  const [isLoading, setIsLoading] = useState();
  const [isEdit, setIsEdit] = useState(false);

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
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    shouldRerenderOnTransaction: true,
  });

  if (!editor) return null;

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/comment/${comment._id}`, "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        setBlog((prev) => ({ ...prev, commentCount: prev.commentCount > 0 ? prev.commentCount - 1 : 0 }));
        showToast("Successfully deleted response.");
        setRecentComments((prev) => prev.filter((item) => item._id !== comment._id));
        setComment(null);
      } else {
        showToast(result?.message || "Some error occured.", "error");
      }
    } catch (err) {
      showToast("Some error occured.", "error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEditBtnClick = () => {
    setIsEdit(false);
  };

  const handleUpdateComment = async () => {
    setIsLoading(true);
    try {
      const params = {
        content: editor?.getHTML(),
        commentId: comment._id,
      };

      const response = await requestHandler("/comment/update", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.content) {
        setComment((prev) => ({ ...prev, content: result.data.content, updatedAt: result.data.updatedAt }));
        setRecentComments((prev) =>
          prev.map((item) => {
            if (item._id.toString() === comment._id.toString()) {
              const updated = { ...item, content: result.data.content, updatedAt: result.data.updatedAt };
              return updated;
            }

            return item;
          }),
        );
        handleCancelEditBtnClick();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputStyleChange = (e, type) => {
    e.preventDefault(); // prevent editor losing focus
    if (type === "b") editor.chain().focus().toggleBold().run();
    if (type === "i") editor.chain().focus().toggleItalic().run();
  };

  const handleEditBtnClick = () => {
    setIsEdit(true);
    editor?.commands.setContent(comment.content);
    editor?.commands.focus();
  };

  return (
    <>
      {comment && (
        <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
          {!isEdit && (
            <div className="h-full w-full">
              <div className="custom-p-y-1 padding-42" style={{ paddingInline: 0 }}>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="inline-block cursor-pointer relative">
                      <div className="relative">
                        <img loading="lazy" src={comment.user.profileImg} className="width-11 aspect-square box-border rounded-full align-middle" />
                      </div>
                    </div>
                    <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                      <div className="flex items-center">
                        <Link to={`/profile/${comment.user.username}`} className="cursor-pointer transition-all duration-400 ease-in-out hover:underline">
                          <p className="break-words text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{comment.user.name}</p>
                        </Link>
                        {comment.user._id === userInfo._id && (
                          <div className="bg-11 color-4 margin-19 border-radius-3 padding-6 line-h-7 font-8 font-normal" style={{ marginBlock: 0, marginRight: 0, paddingBlock: 0 }}>
                            You
                          </div>
                        )}
                      </div>
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">
                        <span>{formatMonthAndDayLong(comment.createdAt)}</span>
                        {comment.createdAt !== comment.updatedAt && <span> (edited)</span>}
                      </p>
                    </div>
                  </div>
                  {comment.user._id === userInfo._id && (
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
                            {comment.user._id === userInfo._id && (
                              <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                                <li className="padding-1 custom-fs-1 color-4 font-normal">
                                  <button onClick={handleEditBtnClick} disabled={isLoading} className="color-3 cursor-pointer m-0 p-0 opacity-[0.9] transition-all duration-75 ease-in hover:opacity-100">
                                    Edit response
                                  </button>
                                </li>
                                <li className="padding-1 custom-fs-1 color-4 font-normal">
                                  <button onClick={() => handleDeleteComment()} disabled={isLoading} className="text-[#c94a4a] cursor-pointer m-0 p-0">
                                    Delete response
                                  </button>
                                </li>
                              </ul>
                            )}
                            {comment.user._id !== userInfo._id && (
                              <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                                <li className="padding-1 custom-fs-1 color-4 font-normal">
                                  <button className="text-[#c94a4a] cursor-pointer m-0 p-0">Report response...</button>
                                </li>
                              </ul>
                            )}
                          </div>
                        </Popover.Content>
                      </Popover.Root>
                    </div>
                  )}
                </div>
                <div className="margin-35 break-words" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div className="padding-27">
                    <div className="color-3 custom-fs-1 line-h-8 font-normal" dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {isEdit && (
            <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
              <div className="flex flex-col relative bg-11 custom-fs-1 margin-11 padding72" style={{ paddingTop: 0 }}>
                <div className={`transition-all duration-400 ease-in-out padding-39 height-57`}>
                  <div className="relative whitespace-pre-wrap wrap-break-word height-62">
                    <EditorContent editor={editor} className={`w-full border-0 outline-0`} />
                  </div>
                </div>
                <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out height-58 opacity-100`} style={{ marginRight: 0, marginBlock: 0 }}>
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
                  <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                    <div>
                      <button onClick={handleCancelEditBtnClick} className="border-0 padding-27 cursor-pointer padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0" disabled={isLoading}>
                        Cancel
                      </button>
                    </div>
                    <button onClick={handleUpdateComment} className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal cursor-pointer m-0 ${editor?.getText().trim().length > 0 && editor?.getHTML() !== comment?.content && !isLoading ? "opacity-100" : "opacity-[0.2]"}`} disabled={editor?.getText().trim().length === 0 || isLoading}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ListItem;
