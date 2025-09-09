import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiStarFourLight } from "react-icons/pi";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { RiMoreLine } from "react-icons/ri";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { toast } from "react-toastify";

function BlogComp({ item }) {
  const handleUserProfileClick = () => {
    useNavigate("/");
  };

  const [blog, setBlog] = useState(item);

  const handleShowLessLikeThisBtnClick = () => {};

  const handleBookmarkBlogBtnClick = () => {
    if (blog.isBookmarked) {
      setBlog({ ...blog, isBookmarked: false });
    } else {
      setBlog({ ...blog, isBookmarked: true });
    }

    toast.success(`Bookmark ${!blog.isBookmarked ? "added" : "removed"} successfully!`);
  };

  const handleBlogMainClick = () => {};

  return (
    <div className="height-18 overflow-hidden">
      <div className="flex justify-center">
        <div className="w-full max-width-2 margin-2 min-w-0">
          <div className="w-full margin-14" style={{ marginBottom: 0, marginInline: 0 }}>
            <article onClick={() => handleBlogMainClick()}>
              <div className="box-content">
                <div className="w-full h-full">
                  <div className="flex relative">
                    <div className="w-full">
                      {/* writer section */}
                      <div className="flex w-full">
                        <div className="margin-21 flex items-center w-full" style={{ marginTop: 0, marginInline: 0 }}>
                          <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <div onClick={() => handleUserProfileClick()} className="relative z-[2] no-underline cursor-pointer">
                              <div className="relative">
                                <img className="height-12 aspect-square box-border rounded-full align-middle" src={blog.profileUrl} alt={blog.name} />
                                <div className="height-12 aspect-square absolute top-0 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div onClick={() => handleUserProfileClick()} className="z-[2] relative cursor-pointer flex items-center grow min-w-0">
                            <div className="truncate w-[60%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1">
                              {blog.channelName && <span className="font-light">In </span>}
                              <span className="font-normal no-underline hover:underline">{blog.userName}</span>
                              {blog.channelName && <span className="font-light"> by </span>}
                              {blog.channelName && <span className="font-normal no-underline hover:underline">{blog.channelName}</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* blog section */}
                      <div className="flex">
                        {/* left section */}
                        <div className="grow shrink basis-auto" style={{ wordBreak: "break-word" }}>
                          <div>
                            <div className="flex flex-col static cursor-pointer">
                              <h2 className="letter-spacing-6 height-19 line-h-9 font-11 font-bold overflow-hidden text-ellipsis color-3 m-0 p-0">{blog.title}</h2>
                              <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                                <h3 className="height-15 overflow-hidden text-ellipsis font-10 color-4 custom-line-h-1 font-normal m-0 p-0">{blog.description}</h3>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="w-full padding-25" style={{ paddingBottom: 0, paddingInline: 0 }}>
                              <span className="font-4 color-4 custom-line-h-1 font-normal">
                                <div className="height-50 flex justify-between items-center">
                                  <div className="flex items-center custom-gap-2 align-middle text-center">
                                    <div className="box-content flex">
                                      <div className="inline-block">
                                        <button className="z-[2] relative border-none cursor-pointer p-0 m-0 bg-transparent" title="Member-only story">
                                          <div className="inline-block width-19 aspect-square">
                                            <PiStarFourLight className="w-full h-full align-middle text-yellow-600" />
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    {blog.createtAt}
                                    <div className="width-28 height-51 relative flex items-center">
                                      <Link className="z-[2] relative transition-all duration-300 ease-out flex custom-gap-2 items-center no-underline p-0 m-0" to="/">
                                        <div className="flex" title={`${blog.likes} claps`}>
                                          <div className="custom-gap-1 flex items-center">
                                            <div className="inline-block width-19 aspect-square">
                                              <PiHandsClappingDuotone className="w-full h-full" />
                                            </div>
                                            <span>{blog.likes}</span>
                                          </div>
                                        </div>
                                        <div className="flex" title={`${blog.comments} responses`}>
                                          <div className="custom-gap-1 flex items-center">
                                            <div className="inline-block width-19 aspect-square">
                                              <FaRegComment className="w-full h-full" />
                                            </div>
                                            <span>{blog.comments}</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="flex justify-end items-center flex-grow-0 shrink-0 basis-0 color-6">
                                    <div>
                                      <div className="inline-block">
                                        <button onClick={() => handleShowLessLikeThisBtnClick()} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Show less like this">
                                          <div className="width-13 aspect-square">
                                            <CiCircleMinus className="w-full h-full align-middle" />
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="inline-block">
                                        <button onClick={() => handleBookmarkBlogBtnClick()} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Save">
                                          <div className="width-13 aspect-square">
                                            {!blog?.isBookmarked && <CiBookmarkPlus className="w-full h-full align-middle" />}
                                            {blog?.isBookmarked && <IoBookmark className="w-full h-full align-middle" />}
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="margin-26">
                                      <div className="inline-block">
                                        <button className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="More">
                                          <div className="width-13 aspect-square">
                                            <RiMoreLine className="w-full h-full align-middle" />
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* right section working */}
                        <div className="margin-25 shrink-0" style={{ marginRight: 0, marginBlock: 0 }}>
                          <img src={blog.images} className="bg-10 border-radius-5 align-middle width-29 height-52" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="margin-11 h-0 bdr-5 w-full" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComp;
