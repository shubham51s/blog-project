import React, { useState } from "react";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { formatMonthAndDayShort } from "../../../utils/monthDateFormatter";
import { useNavigate } from "react-router-dom";

function BlogComp({ blogDetails }) {
  const [isCommunity, setIsCommunity] = useState(blogDetails.hasOwnProperty("community"));
  const navigate = useNavigate();

  const handleViewFullBlog = () => {
    const title = blogDetails.previewTitle.split(" ").join("-");
    navigate(`/${title}/${blogDetails._id}`);
    window.location.reload();
  };

  return (
    <div className="padding-39 grow-0" style={{ maxWidth: "50%", flexBasis: "50%", paddingBlock: 0 }}>
      <div className="padding-43 h-full" style={{ paddingTop: 0, paddingInline: 0 }}>
        <article onClick={() => handleViewFullBlog()} className="h-full cursor-pointer">
          <div className="h-full box-border">
            <div className="h-full w-full">
              <div className="grid relative h-full custom-gap-8 grid-rows-[auto_1fr] grid-cols-12 grid-area-1">
                <div className="[grid-area:image]">
                  <div>
                    <img src={blogDetails.previewImg} className="object-cover object-center aspect-[2/1] w-full align-middle" />
                  </div>
                </div>
                <div className="[grid-area:content] flex flex-col justify-center">
                  <div className="grow flex flex-col w-full">
                    <div className="margin-21 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="margin-16" style={{ marginLeft: 0, marginBlock: 0 }}>
                        {isCommunity && <img src={blogDetails.community.profileImg} className="height-12 aspect-square border-radius-5" />}
                        {!isCommunity && <img src={blogDetails.author.profileImg} className="height-12 aspect-square rounded-full" />}
                      </div>
                      {isCommunity && (
                        <div className="padding-23 whitespace-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                          <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">In</p>
                        </div>
                      )}
                      {isCommunity && (
                        <div className="">
                          <p className="break-all text-ellipsis height-6 color-3 overflow-hidden capitalize font-4 custom-line-h-1 font-normal m-0 p-0" title={blogDetails.community.name}>
                            {blogDetails.community.name}
                          </p>
                        </div>
                      )}
                      {isCommunity && (
                        <div className="padding-23" style={{ paddingBlock: 0 }}>
                          <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">by</p>
                        </div>
                      )}
                      <div className="">
                        <p className="break-all text-ellipsis height-6 color-3 overflow-hidden font-4 capitalize custom-line-h-1 font-normal m-0 p-0" title={blogDetails.author.name}>
                          {blogDetails.author.name}
                        </p>
                      </div>
                    </div>

                    <div className="grow shrink-0 basis-auto padding-33 break-words" style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="">
                        <h2 className="height-61 line-h-8 font-3 font-bold text-ellipsis color-3 overflow-hidden m-0">{blogDetails.previewTitle}</h2>
                      </div>
                      <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                        <h3 className="height-15 text-ellipsis font-10 overflow-hidden color-4 custom-line-h-1 font-normal m-0">{blogDetails.previewSubtitle}</h3>
                      </div>
                    </div>

                    <span className="font-4 color-4 custom-line-h-1 font-normal">
                      <div className="height-50 flex justify-between">
                        <div className="flex custom-gap-2 items-center">
                          <span className="">{formatMonthAndDayShort(blogDetails.updatedAt)}</span>
                          <div className="width-28 height-51 relative flex items-center">
                            {/* pending from here claps and comments icon with value */}
                            <a href="#" className="relative flex items-center custom-gap-2 no-underline m-0 p-0 transition-all duration-300 ease-out">
                              <div className="flex items-center custom-gap-1" title={`${blogDetails.clapsCount} claps`}>
                                <div className="width-19 aspect-square">
                                  <PiHandsClapping className="w-full h-full" />
                                </div>
                                <span className="">{blogDetails.clapsCount}</span>
                              </div>
                              <div className="flex items-center custom-gap-1" title={`${blogDetails.commentCount} responses`}>
                                <div className="width-19 aspect-square">
                                  <FiMessageCircle className="w-full h-full" />
                                </div>
                                <span className="">{blogDetails.commentCount}</span>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="grow-0 shrink-0 basis-0 flex items-center justify-end">
                          <div className="inline-block">
                            <button className="relative padding-33 cursor-pointer m-0" title="Save">
                              <div className="width-13 aspect-square">
                                <CiBookmarkPlus className="w-full h-full" />
                              </div>
                            </button>
                          </div>
                          <div className="margin-26">
                            <div className="inline-block">
                              <button className="relative padding-33 cursor-pointer m-0" title="More">
                                <div className="width-13 aspect-square">
                                  <IoIosMore className="w-full h-full" />
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
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogComp;
