import React, { useState } from "react";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaHandsClapping } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { IoIosLink } from "react-icons/io";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { Link, useNavigate } from "react-router-dom";
import noPreviewImg from "../../../../assets/images/noPreviewImage.png";
import { getImageUrl, getSubmissionStatus } from "../../../../utils/common";
import ActionBtn from "../../ActionBtn";

function BlogComp({ item }) {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(item);

  const handleBlogClick = () => {
    const title = blog.previewTitle.split(" ").join("-");
    navigate(`/${title}/${blog._id}`);
  };

  return (
    <>
      {blog && (
        <tr className="bdr-5" style={{ borderInline: 0, borderBottom: 0 }}>
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="w-full min-w-0 overflow-hidden relative cursor-pointer">
              <Link to={`/${blog.slug}/${blog._id}`} className="margin58 width69 flex items-start custom-gap-2" style={{ marginLeft: 0, marginBlock: 0 }}>
                <div>
                  <div className="relative z-[2] cursor-pointer m-0 p-0 height-54 width70">
                    <img loading="lazy" src={blog.previewImg ? getImageUrl(blog.previewImg) : noPreviewImg} className="w-full object-cover object-center aspect-[3/2] border-radius-5 align-middle" />
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
              </Link>
            </div>
          </td>

          {/* publication */}
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="min-w-0 w-full overflow-hidden">
              <div className="margin58 overflow-auto" style={{ marginLeft: 0, marginBlock: 0 }}>
                {blog.publication && (
                  <div className="w-full flex items-center custom-gap-3">
                    <Link to={`/publication/${blog.publication.slug}`} className="cursor-pointer shrink-0">
                      <div className="relative">
                        <img loading="lazy" src={blog.publication.profileImg} className="width86 aspect-square br13" />
                        <div className="absolute top-0 boxShadow7 width86 aspect-square br13"></div>
                      </div>
                    </Link>
                    <Link to={`/publication/${blog.publication.slug}`} title={blog.publication.name} className="cursor-pointer overflow-hidden m-0 p-0 transition-all duration-75 ease hover:underline">
                      <div className="max-w-full color-3 custom-fs-1 line20 font-normal truncate">{blog.publication.name}</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </td>

          {/* status */}
          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            {blog.publication && (
              <div className="min-w-0 w-full overflow-hidden">
                <div className="flex width92">
                  <button className="w-full overflow-hidden cursor-pointer m-0 p-0">
                    <div className="text-[#1a8917] whitespace-nowrap custom-fs-1 line20 font-normal text-left">{getSubmissionStatus(blog.publicationInfo.status)}</div>
                  </button>
                </div>
              </div>
            )}
          </td>

          <td className="table-cell padding70" style={{ paddingInline: 0 }}>
            <div className="min-w-0 w-full overflow-hidden flex justify-end">
              <ActionBtn blog={blog} setBlog={setBlog} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default BlogComp;
