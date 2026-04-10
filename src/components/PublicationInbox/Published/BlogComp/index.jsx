import React, { useState } from "react";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaHandsClapping } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { Link, useNavigate } from "react-router-dom";
import noPreviewImg from "../../../../assets/images/noPreviewImage.png";
import { getImageUrl, getSubmissionStatus } from "../../../../utils/common";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ActionBtn from "./ActionBtn";

function BlogComp({ item }) {
  const [blog, setBlog] = useState(item);

  return (
    <>
      {blog && (
        <tr className="bdr-5" style={{ borderInline: 0, borderBottom: 0 }}>
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <Link to={`/${blog.slug}/${blog._id}`} className="block w-full min-w-0 overflow-hidden relative cursor-pointer">
              <div className="margin58 width69 flex items-start custom-gap-2" style={{ marginLeft: 0, marginBlock: 0 }}>
                <div>
                  <div className="relative z-[2] cursor-pointer m-0 p-0 height-54 width70">
                    <img src={blog.previewImg ? getImageUrl(blog.previewImg) : noPreviewImg} className="w-full object-cover object-center aspect-[3/2] border-radius-5 align-middle" />
                  </div>
                </div>
                <div className="w-full flex items-stretch justify-between custom-gap-3">
                  <div className="w-full flex flex-col items-start gap10">
                    <div className="w-full break-words min-w-0">
                      <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0 p-0">{blog.previewTitle}</h2>
                    </div>
                    <div className="w-full flex flex-col gap10">
                      <div className="flex items-center custom-gap-3">
                        {/* for drafts (status pending) */}
                        {blog.status === "pending" && (
                          <div className="padding-25 margin-23 bg-11 border-radius-2" style={{ paddingBlock: 0, marginBottom: 0, marginInline: 0 }}>
                            <p className="font-4 color-4 line20 font-normal m-0">Draft</p>
                          </div>
                        )}

                        <div className="flex items-center custom-gap-1">
                          <div className="flex items-center flex-wrap">
                            {blog.status !== "pending" && <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">Published {formatMonthAndDayShort(blog.createdAt)}</p>}
                            {blog.status !== "pending" && (
                              <div className="padding-23 custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingBlock: 0 }}>
                                .
                              </div>
                            )}
                            <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">{blog.readingTime} min read</p>
                            <div className="padding-23 custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingBlock: 0 }}>
                              .
                            </div>
                            <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">Updated {formatMonthAndDayShort(blog.updatedAt)}</p>
                          </div>
                        </div>
                      </div>

                      {blog.status !== "pending" && (
                        <div className="flex items-start custom-gap-2">
                          <div className="flex items-center custom-gap-1">
                            <div className="width-19 aspect-square">
                              <FaHandsClapping className="w-full h-full opacity-75" />
                            </div>
                            <p className="font-4 custom-line-h-1 font-normal m-0 p-0">{blog.clapsCount}</p>
                          </div>
                          <div className="flex items-center custom-gap-1">
                            <div className="width-19 aspect-square">
                              <TbMessageCircleFilled className="w-full h-full opacity-75" />
                            </div>
                            <p className="font-4 custom-line-h-1 font-normal m-0 p-0">{blog.commentCount}</p>
                          </div>
                        </div>
                      )}
                      <div className="w-full flex justify-between items-end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </td>

          {/* writers */}
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="min-w-0 w-full overflow-hidden">
              <div className="margin58 overflow-auto" style={{ marginLeft: 0, marginBlock: 0 }}>
                <div className="w-full flex items-center custom-gap-3">
                  <Link to={`/profile/${blog.author.username}`} className="cursor-pointer shrink-0">
                    <div className="relative">
                      <img src={blog.author.profileImg} className="width86 aspect-square rounded-full" />
                      <div className="absolute top-0 boxShadow7 width86 aspect-square rounded-full"></div>
                    </div>
                  </Link>
                  <Link to={`/profile/${blog.author.username}`} title={blog.author.name} className="cursor-pointer overflow-hidden m-0 p-0 transition-all duration-75 ease hover:underline">
                    <div className="max-w-full color-3 custom-fs-1 line20 font-normal truncate">{blog.author.name}</div>
                  </Link>
                </div>
              </div>
            </div>
          </td>

          {/* status */}
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="min-w-0 w-full overflow-hidden">
              <div className="flex width92">
                <button className="w-full overflow-hidden cursor-pointer m-0 p-0">
                  <div className="bg-11 text-left padding-28 padding84 w-fit border-radius10 flex items-center gap9">
                    <div className="custom-fs-1 whitespace-nowrap color-4 line20 font-normal">Pending review</div>
                    <div className="width-19 aspect-square">
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </td>

          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="min-w-0 w-full overflow-hidden flex justify-end">
              <ActionBtn blog={blog} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default BlogComp;
