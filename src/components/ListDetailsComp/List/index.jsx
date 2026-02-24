import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import SaveBlog from "./BlogSaveBtn";
import BlogMoreBtn from "./BlogMoreBtn";
import { formatUTCToLocalDate } from "../../../utils/dates";
import { formatNumberCompact } from "../../../utils/common";
import errImg from "../../../assets/images/noPreviewImage.png";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";
import { UserContext } from "../../../context/userContext";

function ListItem({ item, list, setListItems }) {
  const { userInfo } = useContext(UserContext);
  const { requestHandler } = useRequestHandler();
  const [isFocused, setIsFocused] = useState(false);
  const [listItem, setListItem] = useState(item);
  const [note, setNote] = useState(item?.note || "");
  const [noteInput, setNoteInput] = useState(item?.note || "");
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocusToggle = (isFocus) => {
    setIsFocused(isFocus);
    if (isFocus && !isShowBtn) {
      setIsShowBtn(true);
    }
  };

  const handleCancelInput = () => {
    setNoteInput(note);
    setIsShowBtn(false);
  };

  const editNote = async () => {
    setIsLoading(true);
    try {
      const params = {
        blogId: listItem.blog._id,
        listId: listItem.list,
        note: noteInput,
      };

      const response = await requestHandler("/list/items/edit-note", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setNote(noteInput);
        setIsShowBtn(false);
      } else {
        if (response?.status < 500) {
          showToast(result?.message || "Some error occured");
        } else {
          showToast("Some error occured");
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
    }
  };

  return (
    <div className="margin54">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          {/* note */}
          {list.user._id === userInfo._id && (
            <div className="flex items-start justify-between margin-17" style={{ marginTop: 0 }}>
              <div className={`w-[80%] max-w-[80%] padding-17 italic font-4 color-4 ${isFocused ? "bdr20" : "bdr19"}`} style={{ paddingRight: 0, paddingBlock: 0, borderRight: 0, borderBlock: 0 }}>
                <span className="color-3 custom-fs-1 line20 font-normal">
                  <div className="w-full flex flex-col">
                    <div className={`w-full flex padding-28 custom-px-2 bg-10 border-radius-3 ${isFocused ? "bdr-7" : "bdr16"}`}>
                      <input onInput={(e) => setNoteInput(e.target.value)} value={noteInput} onFocus={() => handleFocusToggle(true)} onBlur={() => handleFocusToggle(false)} placeholder={isFocused ? "Write a brief description" : "Add a note..."} type="text" className="grow shrink w-full p-0 outline-0 border-0 m-0 resize-none" />
                    </div>
                  </div>
                </span>
              </div>
              {/* save button */}
              {isShowBtn && (
                <div className="flex items-center justify-end padding-7 w-[20%] max-w-[20%] padding85" style={{ paddingRight: 0 }}>
                  <div>
                    <button onClick={() => handleCancelInput()} disabled={isLoading} className="font-4 color-3 line20 font-normal cursor-pointer m-0 p-0 opacity-[0.75] transition-all duration-75 ease hover:opacity-100">
                      Cancel
                    </button>
                  </div>
                  <div className="padding-7" style={{ paddingRight: 0 }}>
                    <div>
                      <button onClick={editNote} disabled={isLoading} className="font-4 text-[#156d12] line20 font-normal cursor-pointer m-0 p-0 opacity-[0.9] transition-all duration-75 ease hover:opacity-100">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* blog */}
          <article className="">
            <div className="box-content">
              <div className="h-full w-full">
                <div className="relative flex">
                  <div className="w-full">
                    <div className="flex">
                      <div className="margin-21 flex items-center" style={{ marginInline: 0, marginTop: 0 }}>
                        <div className="margin-9" style={{ marginLeft: 0 }}>
                          <Link to="" className="relative no-underline cursor-pointer">
                            <img src={listItem.blog.author.profileImg} className="width86 aspect-square box-border rounded-full" />
                            <div className="absolute top-0 width86 aspect-square box-border rounded-full boxShadow7"></div>
                          </Link>
                        </div>
                        <div>
                          <Link to="" className="no-underline relative cursor-pointer m-0 p-0 flex items-center hover:underline">
                            <p className="break-words line-clamp-1 height-6 font-4 color-3 line20 font-normal m-0" title={listItem.blog.author.name}>
                              {userInfo._id === listItem.blog.author._id ? "You" : listItem.blog.author.name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="break-words grow shrink basis-auto">
                        <div className="">
                          <Link to="" className="flex flex-col">
                            <h2 className="letter-spacing-6 line-clamp-3 height-19 line-h-9 font-11 font-bold overflow-hidden color-3 m-0">{listItem.blog.previewTitle}</h2>
                            <div className="custom-px-2" style={{ paddingBottom: 0 }}>
                              <h3 className="height-15 line-clamp-2 font-10 overflow-hidden color-4 line20 font-normal m-0">{listItem.blog.previewSubtitle}</h3>
                            </div>
                          </Link>
                        </div>
                        <div className="w-full padding72" style={{ paddingBottom: 0 }}>
                          <span className="font-4 color-4 line20 font-normal">
                            <div className="flex justify-between height-50">
                              <div className="flex custom-gap-2 items-center">
                                <span className="">{formatUTCToLocalDate(listItem.blog.updatedAt)}</span>
                                <div className="height-51 width-28 relative flex items-center">
                                  <Link className="relative flex items-center custom-gap-2 no-underline">
                                    <div>
                                      <div className="flex items-center custom-gap-1">
                                        <div className="width-19 aspect-square">
                                          <FaHandsClapping className="w-full h-full" />
                                        </div>
                                        {listItem.blog.clapsCount > 0 && <span>{formatNumberCompact(listItem.blog.clapsCount)}</span>}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex items-center custom-gap-1">
                                        <div className="width-19 aspect-square">
                                          <FaComment className="w-full h-full" />
                                        </div>
                                        {listItem.blog.commentCount > 0 && <span>{formatNumberCompact(listItem.blog.commentCount)}</span>}
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="grow-0 shrink-0 flex justify-end items-center">
                                <SaveBlog />
                                <BlogMoreBtn listItem={listItem} setListItems={setListItems} />
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>

                      <div className="margin-25 shrink-0" style={{ marginRight: 0, marginBlock: 0 }}>
                        <Link to="" className="block no-underline">
                          {listItem.blog.previewImg && <img src={listItem.blog.previewImg} className="border-radius-5 width-29 height-52" />}
                          {!listItem.blog.previewImg && <img src={errImg} className="border-radius-5 width-29 height-52" />}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="margin-11 h-0 w-full" style={{ marginBottom: 0 }}></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
