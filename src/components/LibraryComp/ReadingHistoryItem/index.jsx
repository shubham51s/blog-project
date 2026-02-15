import React from "react";
import { Link } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { IoChatbubbleSharp } from "react-icons/io5";
import DeleteButton from "./DeleteButton";
import ToggleAddToListButton from "./ToggleAddToListButton";
import MoreButton from "./MoreButton";

function ReadingHistoryItem() {
  const blog = {
    author: {
      name: "Shubham Solat",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*GUbrsCT8rhWifCUj4ahVSg.png",
    },

    publication: {
      name: "Rooted",
      profileImg: "",
    },
  };

  return (
    <>
      <div>
        <div className="margin51">
          <article>
            <div className="box-content">
              <div className="w-full h-full">
                <div className="flex relative">
                  <div className="w-full">
                    <div className="flex items-center justify-between margin-21 custom-gap-2" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="flex items-center">
                        <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <Link to="" className="no-underline cursor-pointer">
                            <div className="relative">
                              <img src={blog.author.profileImg} className="border-radius-5 width86 aspect-square" />
                              <div className="absolute top-0 border-radius-5 width86 aspect-square boxShadow7"></div>
                            </div>
                          </Link>
                        </div>
                        {blog.publication && (
                          <div className="padding-23 whitespace-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                            <p className="font-4 color-4 line20 font-normal m-0">In</p>
                          </div>
                        )}
                        {blog.publication && (
                          <div>
                            <Link to="" className="no-underline cursor-pointer m-0 p-0 flex items-center">
                              <p className="truncate height-6 color-3 font-4 line20 font-normal m-0" title={blog.publication.name}>
                                {blog.publication.name}
                              </p>
                            </Link>
                          </div>
                        )}
                        {blog.publication && (
                          <div className="padding-23" style={{ paddingBlock: 0 }}>
                            <p className="font-4 color-4 line20 font-normal m-0">by</p>
                          </div>
                        )}
                        <div>
                          <Link to="" className="no-underline cursor-pointer m-0 p-0 flex items-center">
                            <p className="truncate height-6 color-3 font-4 line20 font-normal m-0" title={blog.publication.name}>
                              {blog.publication.name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="break-all grow shrink basis-auto">
                        <div>
                          <Link to="" className="flex flex-col cursor-pointer no-underline m-0 p-0">
                            <h2 className="letter-spacing-6 line-clamp-3 height-19 line-h-9 font-11 font-bold color-3 m-0">Miso Ramen in My Kitchen</h2>
                            <div className="custom-px-2" style={{ paddingBottom: 0 }}>
                              <h3 className="line-clamp-2 height-15 font-10 color-4 line20 font-normal m-0">Cooking a multi-day Japanese icon (mostly) from scratch</h3>
                            </div>
                          </Link>
                        </div>

                        <div>
                          <div className="w-full padding72" style={{ paddingBottom: 0 }}>
                            <span className="font-4 color-4 line20 font-normal">
                              <div className="height-50 flex justify-between">
                                <div className="flex items-center custom-gap-2">
                                  <span>Jan 13</span>
                                  <div>
                                    <div className="width-28 height-51 relative flex items-center">
                                      <div className="flex items-center custom-gap-2">
                                        <div>
                                          <div className="flex items-center custom-gap-1">
                                            <div className="width-19 aspect-square">
                                              <FaHandsClapping className="w-full h-full" />
                                            </div>
                                            <span>728</span>
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex items-center custom-gap-1">
                                            <div className="width-19 aspect-square">
                                              <IoChatbubbleSharp className="w-full h-full" />
                                            </div>
                                            <span>11</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="grow-0 shrink-0 basis-0 flex items-center justify-end">
                                  <DeleteButton />
                                  <ToggleAddToListButton />
                                  <MoreButton />
                                  <div></div>
                                </div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="margin-25" style={{ marginRight: 0, marginBlock: 0 }}></div>
                    </div>
                  </div>
                </div>
                <div className="margin-11 h-0 bdr-5 w-full" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default ReadingHistoryItem;
