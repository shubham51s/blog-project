import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiStarFourLight } from "react-icons/pi";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { UserContext } from "../../../../context/userContext";
import MoreButton from "./MoreButtonComp";
import noPreviewImg from "../../../../assets/images/noPreviewImage.png";
import { showToast } from "../../../../utils/toaster";
import { getImageUrl } from "../../../../utils/common";

function BlogComp({ item }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [blog, setBlog] = useState({ ...item, isMyBlog: userInfo._id === item.author._id });
  const [isHideBlog, setIsHideBlog] = useState(false);
  const [loaders, setLoaders] = useState({
    isBookmarkLoader: false,
  });

  const deleteBookmark = async () => {
    setLoaders((prev) => ({ ...prev, isBookmarkLoader: true }));

    try {
      const params = {
        blog: blog._id,
      };

      const response = await requestHandler("/bookmarks/delete", "POST", params);

      const result = await response.json();

      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));

      if (response?.status === 200) {
        setBlog({ ...blog, isBookmarked: false });
        showToast("Blog unsaved");
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));
    }
  };

  const addBookmark = async () => {
    setLoaders((prev) => ({ ...prev, isBookmarkLoader: true }));

    try {
      const params = {
        blog: blog._id,
      };

      const response = await requestHandler("/bookmarks", "POST", params);

      const result = await response.json();
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));

      if (response?.status === 200) {
        setBlog({ ...blog, isBookmarked: true });
        showToast("Blog saved");
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      showToast("Some error occured", "error");
      console.error(err);
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));
    }
  };

  const handleBookmarkBlogBtnClick = (e) => {
    if (loaders.isBookmarkLoader) return;

    e.stopPropagation();
    if (blog.isBookmarked) {
      deleteBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <div className={`overflow-hidden transition-all duration-500 ease-out ${isHideBlog ? "height71" : "height-18"}`}>
      <div className="flex justify-center">
        <div className="w-full max-width-2 margin-2 min-w-0">
          <div className="w-full margin-14" style={{ marginBottom: 0, marginInline: 0 }}>
            <article>
              <div className="box-content">
                <div className="w-full h-full">
                  <div className="flex relative">
                    <div className="w-full">
                      {/* writer section */}
                      {!blog.publication && (
                        <div className="flex w-full">
                          <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <Link to={`/profile/${blog.author.username}`} className="relative z-[2] no-underline cursor-pointer">
                              <div className="relative">
                                <img className="height-12 aspect-square box-border rounded-full align-middle" src={blog.author.profileImg} />
                                <div className="height-12 aspect-square absolute top-0 rounded-full"></div>
                              </div>
                            </Link>
                          </div>
                          <div className="margin-21 flex items-center w-full" style={{ marginTop: 0, marginInline: 0 }}>
                            <div className="z-[2] relative cursor-pointer flex items-center grow min-w-0">
                              <div className="truncate w-[60%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1">
                                <Link to={`/profile/${blog.author.username}`} title={blog.author.name} className="font-normal no-underline hover:underline">
                                  {blog.isMyBlog ? "You" : blog.author.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {blog.publication && (
                        <div className="flex w-full">
                          <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <Link to={`/publication/${blog.publication.slug}`} className="relative z-[2] no-underline cursor-pointer">
                              <div className="relative">
                                <img className="height-12 aspect-square box-border br13 align-middle" src={blog.publication.profileImg} />
                                <div className="height-12 aspect-square absolute top-0 br13"></div>
                              </div>
                            </Link>
                          </div>
                          <div className="margin-21 flex items-center w-full" style={{ marginTop: 0, marginInline: 0 }}>
                            <div className="z-[2] relative cursor-pointer flex items-center grow min-w-0">
                              <div className="truncate w-[60%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1">
                                <span className="font-light">In </span>
                                <Link to={`/publication/${blog.publication.slug}`} title={blog.publication.name} className="font-normal no-underline hover:underline">
                                  {blog.publication.name}
                                </Link>
                                <span className="font-light"> by </span>
                                <Link to={`/profile/${blog.author.username}`} title={blog.author.name} className="font-normal no-underline hover:underline">
                                  {blog.isMyBlog ? "You" : blog.author.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* blog section */}
                      <div className="flex">
                        {/* left section */}
                        <div className="grow shrink basis-auto" style={{ wordBreak: "break-word" }}>
                          <Link to={`/${blog.slug}/${blog._id}`} className="block">
                            <div className="flex flex-col static cursor-pointer">
                              <h2 className="letter-spacing-6 height-19 line-h-9 font-11 font-bold overflow-hidden text-ellipsis color-3 m-0 p-0">{blog.previewTitle}</h2>
                              <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                                {blog.previewSubtitle && <h3 className="height-15 overflow-hidden text-ellipsis font-10 color-4 custom-line-h-1 font-normal m-0 p-0">{blog.previewSubtitle}</h3>}
                              </div>
                            </div>
                          </Link>

                          <div>
                            <div className="w-full padding-25 cursor-pointer" style={{ paddingBottom: 0, paddingInline: 0 }}>
                              <span className="font-4 color-4 custom-line-h-1 font-normal">
                                <div className="height-50 flex justify-between items-center">
                                  <Link to={`/${blog.slug}/${blog._id}`} className="flex items-center custom-gap-2 align-middle text-center">
                                    {formatMonthAndDayShort(blog.updatedAt)}
                                    <div className="width-28 height-51 relative flex items-center">
                                      <div className="z-[2] relative transition-all duration-300 ease-out flex custom-gap-2 items-center no-underline p-0 m-0">
                                        {blog.clapsCount > 0 && (
                                          <div className="flex" title={`${blog.clapsCount} claps`}>
                                            <div className="custom-gap-1 flex items-center">
                                              <div className="inline-block width-19 aspect-square">
                                                <PiHandsClappingDuotone className="w-full h-full" />
                                              </div>
                                              <span>{blog.clapsCount}</span>
                                            </div>
                                          </div>
                                        )}
                                        {blog.commentCount > 0 && (
                                          <div className="flex" title={`${blog.commentCount} responses`}>
                                            <div className="custom-gap-1 flex items-center">
                                              <div className="inline-block width-19 aspect-square">
                                                <FaRegComment className="w-full h-full" />
                                              </div>
                                              <span>{blog.commentCount}</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </Link>

                                  <div className="flex justify-end items-center grow-0 shrink-0 basis-0 color-6">
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
                                    <MoreButton blog={blog} />
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link to={`/${blog.slug}/${blog._id}`} className="block margin-25 shrink-0 cursor-pointer" style={{ marginRight: 0, marginBlock: 0 }}>
                          <img src={blog.previewImg ? getImageUrl(blog.previewImg) : noPreviewImg} className="bg-10 border-radius-5 align-middle width-29 height-52" />
                        </Link>
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
