import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import noPreview from "../../../../assets/images/noPreviewImage.png";
import { formatNumberCompact, getImageUrl } from "../../../../utils/common";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { FaHandsClapping } from "react-icons/fa6";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiMoreFill } from "react-icons/ri";
import ActionBtn from "./ActionBtn";
import { UserContext } from "../../../../context/userContext";
import SaveBlog from "../../../Common/Buttons/ToggleBlogSave";

function ListItem({ item }) {
  const [blog, setBlog] = useState(item);
  const { userInfo } = useContext(UserContext);
  const [isMyBlog, setIsMyBlog] = useState(userInfo._id === blog.author._id);

  const handleAfterBlogDelete = () => {
    setBlog(null);
  };

  return (
    <>
      {blog && (
        <div className="col-span-2">
          <article className="h-full">
            <div className="box-content h-full">
              <div className="h-full w-full">
                <div className="relative h-full flex flex-col custom-gap-2">
                  <Link to={`/${blog.slug}/${blog._id}`} className="block">
                    <img loading="lazy" src={blog.previewImg ? getImageUrl(blog.previewImg) : noPreview} className="w-full border-radius-5 bg-10 object-cover aspect-[2/1] object-center" />
                  </Link>
                  <div className="grow">
                    <div className="w-full flex flex-col">
                      <div className="box-border break-words">
                        {!blog.publication && (
                          <div className="font-4 color-4 line20 font-normal">
                            <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                              <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                                <Link to={`/profile/${blog.author.username}`} className="cursor-pointer m-0 p-0">
                                  <div className="relative">
                                    <img loading="lazy" src={blog.author.profileImg} className="width86 aspect-square rounded-full" />
                                    <div className="absolute top-0 width86 aspect-square rounded-full boxShadow7"></div>
                                  </div>
                                </Link>
                              </div>
                              <div>
                                <Link to={`/profile/${blog.author.username}`} className="cursor-pointer m-0 p-0 flex items-center">
                                  <p className="break-all height-6 font-4 color-4 line20 font-normal m-0 transition-all duration-75 ease hover:underline">{isMyBlog ? "You" : blog.author.name}</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {blog.publication && (
                          <div className="font-4 color-4 line20 font-normal">
                            <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                              <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                                <Link to={`/publication/${blog.publication.slug}`} className="cursor-pointer m-0 p-0">
                                  <div className="relative">
                                    <img loading="lazy" src={blog.publication.profileImg} className="width86 aspect-square br13" />
                                    <div className="absolute top-0 width86 aspect-square br13 boxShadow7"></div>
                                  </div>
                                </Link>
                              </div>
                              <div className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                                <span className="break-all height-6 font-4 color-4 line20 font-normal">In </span>

                                <Link to={`/publication/${blog.publication.slug}`} className="inline hover:underline">
                                  <span className="break-all height-6 font-4 color-3 line20 font-normal" title={blog.publication.name}>
                                    {blog.publication.name}
                                  </span>
                                </Link>

                                <span className="break-all height-6 font-4 color-4 line20 font-normal"> by </span>

                                <Link to={`/profile/${blog.author.username}`} className="inline hover:underline">
                                  <span className="break-all height-6 font-4 color-3 line20 font-normal" title={blog.author.name}>
                                    {isMyBlog ? "You" : blog.author.name}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <Link to={`/${blog.slug}/${blog._id}`} className="flex flex-col cursor-pointer m-0 p-0">
                            <h2 className="height84 line-clamp-4 font-3 line-h-8 font-semibold color-3 m-0">{blog.previewTitle}</h2>
                            <div className="padding72" style={{ paddingBottom: 0 }}>
                              <h3 className="height-15 line20 font-10 line-clamp-2 color-3 font-normal m-0">{blog.previewSubtitle}</h3>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="font-4 color-4 line20 font-normal">
                    <div className="flex justify-between height-50">
                      <Link to={`/${blog.slug}/${blog._id}`} className="flex items-center custom-gap-2 color-3 transition-all duration-75 ease opacity-[0.85]">
                        <div className="whitespace-nowrap">
                          {/* <span>{formatMonthAndDayShort()}</span> */}
                          <span>Apr 11</span>
                        </div>
                        <div className="width-28 height-51 flex items-center relative">
                          <div className="flex items-center custom-gap-2">
                            <div className="flex items-center custom-gap-1">
                              <div className="width-19 aspect-square">
                                <FaHandsClapping className="w-full h-full" />
                              </div>
                              <span>{formatNumberCompact(blog.clapsCount)}</span>
                            </div>
                            <div className="flex items-center custom-gap-1">
                              <div className="width-19 aspect-square">
                                <IoChatbubbleSharp className="w-full h-full" />
                              </div>
                              <span>{formatNumberCompact(blog.commentCount)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="grow-0 shrink-0 flex items-center justify-end">
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
          </article>
        </div>
      )}
    </>
  );
}

export default ListItem;
