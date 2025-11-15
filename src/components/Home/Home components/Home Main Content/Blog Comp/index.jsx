import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiStarFourLight } from "react-icons/pi";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { toast } from "react-toastify";
import MoreComp from "./MoreComponent";
import ShowLessComp from "./ShowLessComp";

function BlogComp({ item, userInfo }) {
  const navigate = useNavigate();
  const [isHideBlog, setIsHideBlog] = useState(false);

  const handleUserProfileClick = () => {
    navigate("/");
  };

  const [blog, setBlog] = useState(item);

  const handleBookmarkBlogBtnClick = (e) => {
    e.stopPropagation();
    if (blog.isBookmarked) {
      setBlog({ ...blog, isBookmarked: false });
    } else {
      setBlog({ ...blog, isBookmarked: true });
    }

    toast.success(`Bookmark ${!blog.isBookmarked ? "added" : "removed"} successfully!`);
  };

  const handleBlogMainClick = () => {
    navigate("/blog/12345");
  };

  function formatDateForBlog(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return diffSec <= 0 ? "just now" : `${diffSec}s ago`;
    }

    if (diffMin < 60) {
      return `${diffMin}m ago`;
    }

    if (diffHour < 24) {
      return `${diffHour}h ago`;
    }

    if (diffDay < 10) {
      return `${diffDay}d ago`;
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    if (date.getFullYear() === now.getFullYear()) {
      return `${month} ${day}`;
    }

    return `${day} ${month} ${year}`;
  }

  return (
    <div className={`overflow-hidden transition-all duration-500 ease-out ${isHideBlog ? "height71" : "height-18"}`}>
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
                                <img className="height-12 aspect-square box-border rounded-full align-middle" src={userInfo.profileImg} alt={userInfo.name} />
                                <div className="height-12 aspect-square absolute top-0 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div onClick={() => handleUserProfileClick()} className="z-[2] relative cursor-pointer flex items-center grow min-w-0">
                            <div className="truncate w-[60%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1">
                              {blog.communityName && <span className="font-light">In </span>}
                              <span className="font-normal no-underline hover:underline">{userInfo.username}</span>
                              {blog.communityName && <span className="font-light"> by </span>}
                              {blog.communityName && <span className="font-normal no-underline hover:underline">{blog.communityName}</span>}
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
                              <h2 className="letter-spacing-6 height-19 line-h-9 font-11 font-bold overflow-hidden text-ellipsis color-3 m-0 p-0">{blog.previewTitle}</h2>
                              <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                                {blog.previewSubtitle && <h3 className="height-15 overflow-hidden text-ellipsis font-10 color-4 custom-line-h-1 font-normal m-0 p-0">{blog.previewSubtitle}</h3>}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="w-full padding-25 cursor-pointer" style={{ paddingBottom: 0, paddingInline: 0 }}>
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
                                    {formatDateForBlog(blog.updatedAt)}
                                    <div className="width-28 height-51 relative flex items-center">
                                      <Link className="z-[2] relative transition-all duration-300 ease-out flex custom-gap-2 items-center no-underline p-0 m-0" to="/">
                                        <div className="flex" title={`${blog.likeCount} claps`}>
                                          <div className="custom-gap-1 flex items-center">
                                            <div className="inline-block width-19 aspect-square">
                                              <PiHandsClappingDuotone className="w-full h-full" />
                                            </div>
                                            <span>{blog.likeCount}</span>
                                          </div>
                                        </div>
                                        <div className="flex" title={`${blog.commentCount} responses`}>
                                          <div className="custom-gap-1 flex items-center">
                                            <div className="inline-block width-19 aspect-square">
                                              <FaRegComment className="w-full h-full" />
                                            </div>
                                            <span>{blog.commentCount}</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="flex justify-end items-center grow-0 shrink-0 basis-0 color-6">
                                    <ShowLessComp setIsHideBlog={setIsHideBlog} />
                                    <div>
                                      <div className="inline-block">
                                        <button onClick={(e) => handleBookmarkBlogBtnClick(e)} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Save">
                                          <div className="width-13 aspect-square">
                                            {!blog?.isBookmarked && <CiBookmarkPlus className="w-full h-full align-middle" />}
                                            {blog?.isBookmarked && <IoBookmark className="w-full h-full align-middle" />}
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    <MoreComp blog={blog} />
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* right section working */}
                        <div className="margin-25 shrink-0 cursor-pointer" style={{ marginRight: 0, marginBlock: 0 }}>
                          <img src={blog.previewImg} className="bg-10 border-radius-5 align-middle width-29 height-52" />
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
