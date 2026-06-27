import React, { useState } from "react";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { CiBookmarkPlus } from "react-icons/ci";
import { formatMonthAndDayShort } from "../../../utils/monthDateFormatter";
import { Link, useNavigate } from "react-router-dom";
import noPreviewImg from "../../../assets/images/noPreviewImage.png";
import { formatNumberCompact, getImageUrl } from "../../../utils/common";
import ActionBtn from "./ActionBtn";
import SaveBlog from "../../Common/Buttons/ToggleBlogSave";

function BlogComp({ item }) {
  const [blog, setBlog] = useState(item);

  const handleAfterBlogDelete = () => {
    setBlog(null);
  };

  return (
    <>
      {blog && (
        <div className="padding-39 grow-0" style={{ maxWidth: "50%", flexBasis: "50%", paddingBlock: 0 }}>
          <div className="padding-43 h-full" style={{ paddingTop: 0, paddingInline: 0 }}>
            <article className="h-full cursor-pointer">
              <div className="h-full box-border">
                <div className="h-full w-full">
                  <div className="grid relative h-full custom-gap-8 grid-rows-[auto_1fr] grid-cols-12 grid-area-1">
                    <Link to={`/${blog.slug}`} className="[grid-area:image]">
                      <div>
                        <img loading="lazy" src={blog.previewImg ? getImageUrl(blog.previewImg) : noPreviewImg} className="object-cover object-center aspect-[2/1] w-full align-middle" />
                      </div>
                    </Link>
                    <div className="[grid-area:content] flex flex-col justify-center">
                      <div className="grow flex flex-col w-full">
                        {!blog.publication && (
                          <div className="margin-21 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                            <Link to={`/profile/${blog.author.username}`} className="margin-16 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                              <img loading="lazy" src={blog.author.profileImg} className="height-12 aspect-square rounded-full" />
                            </Link>
                            <Link to={`/profile/${blog.author.username}`} title={blog.author.name} className="break-words text-ellipsis height-6 color-3 overflow-hidden font-4 capitalize custom-line-h-1 font-normal m-0 p-0">
                              {blog.author.name}
                            </Link>
                          </div>
                        )}
                        {blog.publication && (
                          <div className="margin-21 flex items-center overflow-hidden truncate" style={{ marginTop: 0, marginInline: 0 }}>
                            <Link to={`/publication/${blog.publication.slug}`} className="margin-16 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                              <img loading="lazy" src={blog.publication.profileImg} className="height-12 aspect-square br13" />
                            </Link>
                            <div className="padding-23 whitespace-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                              <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">In</p>
                            </div>
                            <Link to={`/publication/${blog.publication.slug}`} title={blog.publication.name} className="break-words truncate height-6 color-3 overflow-hidden capitalize font-4 custom-line-h-1 font-normal m-0 p-0">
                              {blog.publication.name}
                            </Link>
                            <div className="padding-23" style={{ paddingBlock: 0 }}>
                              <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">by</p>
                            </div>
                            <Link to={`/profile/${blog.author.username}`} title={blog.author.name} className="break-words text-ellipsis height-6 color-3 overflow-hidden font-4 capitalize custom-line-h-1 font-normal m-0 p-0">
                              {blog.author.name}
                            </Link>
                          </div>
                        )}
                        <Link to={`/${blog.slug}`} className="grow shrink-0 basis-auto padding-33 break-words" style={{ paddingTop: 0, paddingInline: 0 }}>
                          <div>
                            <h2 className="height-61 line-h-8 font-3 font-bold text-ellipsis color-3 overflow-hidden m-0">{blog.previewTitle}</h2>
                          </div>
                          <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                            <h3 className="height-15 text-ellipsis font-10 overflow-hidden color-4 custom-line-h-1 font-normal m-0">{blog.previewSubtitle}</h3>
                          </div>
                        </Link>
                        <span className="font-4 color-4 custom-line-h-1 font-normal">
                          <div className="height-50 flex justify-between">
                            <Link to={`/${blog.slug}`} className="flex custom-gap-2 items-center">
                              <span>{formatMonthAndDayShort(blog.updatedAt)}</span>
                              <div className="width-28 height-51 relative flex items-center">
                                <div className="relative flex items-center custom-gap-2 no-underline m-0 p-0 transition-all duration-75 ease">
                                  <div className="flex items-center custom-gap-1" title={`${formatNumberCompact(blog.clapsCount)} claps`}>
                                    <div className="width-19 aspect-square">
                                      <PiHandsClapping className="w-full h-full" />
                                    </div>
                                    <span>{formatNumberCompact(blog.clapsCount)}</span>
                                  </div>
                                  <div className="flex items-center custom-gap-1" title={`${formatNumberCompact(blog.commentCount)} responses`}>
                                    <div className="width-19 aspect-square">
                                      <FiMessageCircle className="w-full h-full" />
                                    </div>
                                    <span>{formatNumberCompact(blog.commentCount)}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="grow-0 shrink-0 basis-0 flex items-center justify-end">
                              <div className="flex justify-end items-center grow-0 shrink-0 basis-0 color-6">
                                <div>
                                  <SaveBlog item={blog} />
                                </div>
                                <ActionBtn blog={blog} setBlog={setBlog} handleAfterBlogDelete={handleAfterBlogDelete} />
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogComp;
