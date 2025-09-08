import React, { useState } from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { IoIosMore } from "react-icons/io";

function PostDetailsPage() {
  const [blogDetails, setBlogDetails] = useState({
    id: 1,
    name: "Gen. A Ishimwe",
    community: {
      name: "Philosophy Today",
      image: "https://miro.medium.com/v2/resize:fill:48:48/1*PUDx_xvsheMfWyuDj5_Kxg.png",
      description: "Philosophy Today is dedicated to current philosophy, logic, and thought.",
    },
    heading: "Why the Middle Class Suffers the Most: The Paradox of Choice",
    description: "How Trying to Optimize Your Life is Part of the Problem",
    userProfileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*Rfb_-NdeQ6kzcR3JmVdH9A.jpeg",
    readTime: "4 min read",
    date: "May 7, 2025",
    clapsCount: "3.6K",
    messageCount: "150",
    images: ["https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3lCgOLAxH3lgdeodzV7L_g.jpeg"],
  });

  return (
    <div className="custom-bg-8">
      <HeaderComp />
      {/* home content */}
      <div className="flex">
        <HomeLeftMenuComp />
        {/* width need to check later given different width than original */}
        <div className="width-17 grow-1 shrink-1 basis-auto">
          <div>
            <div className="bdr-5 w-full">
              <div className="height-55 w-full"></div>
              <div className="flex justify-center">
                <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
                  <div className="height-3 flex items-center">
                    <div className="width-32">
                      <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                        <h2 className="line-h-8 font-3 font-medium color-3 p-0 m-0">
                          <div className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden">{blogDetails.community.name}</div>
                        </h2>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=""></div>

            <div className="absolute translateY-1 top-0 width-17 transition-all duration-300 ease-out opacity-100 pointer-none">
              <div className="flex justify-center">
                <div className="margin-27 min-w-0 w-full custom-max-w-1" style={{ marginBlock: 0 }}>
                  <div className="width-30 flex items-start flex-col">
                    <a href="#" className="no-underline p-0 m-0">
                      <div className="relative">
                        <img src={blogDetails.community.image} alt={blogDetails.community.name} className="width-31 aspect-square border-radius-5 block align-middle" />
                      </div>
                    </a>
                    <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                    <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0">
                      <span>{blogDetails.community?.description}</span>
                    </p>
                    <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                    <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                      <button className="underline cursor-pointer m-0 p-0">Follow publication</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-28" style={{ marginTop: 0, marginInline: 0 }}>
              <div className="flex justify-center">
                <div className="w-full min-w-0 max-width-2 margin-12"></div>
              </div>

              <article>
                <div className="break-words margin-25" style={{ marginInline: 0, marginBottom: 0 }}>
                  <div className="flex justify-center">
                    <div className="w-full min-w-0 max-width-2 margin-12">
                      <div>
                        <h1 className="letter-spacing-7 line-h-10 font-12 margin-30 mt-0 font-bold color-3">{blogDetails.heading}</h1>
                      </div>
                      <div>
                        <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">{blogDetails.description}</h2>
                        <div className="w-full">
                          <div className="flex items-center custom-gap-5">
                            <div className="flex items-center custom-gap-5 ">
                              <div className="flex items-baseline">
                                <img src={blogDetails.userProfileImg} alt={blogDetails.name} className="width-11 aspect-square" />
                              </div>
                              <span className="custom-fs-1 custom-line-h-1 color-3 font-normal">
                                <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                  <div className="flex items-center flex-nowrap">
                                    <div className="flex items-center custom-fs-1 custom-line-h-1 color-3">{blogDetails.name}</div>
                                    <div className="inline-block width-33"></div>
                                    <div className="inline-block">
                                      <button className="bdr-7 padding-28 padding-20 width-24 border-radius-7 cursor-pointer flex justify-between items-center m-0">
                                        <span className="custom-fs-1 custom-line-h-1 color-3 w-full font-normal">Follow</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div className="flex items-center flex-wrap">
                              <span className="custom-fs-1 custom-line-h-1 color-3 font-normal color-4">
                                <div className="flex grow-1 shrink-0 basis-auto">
                                  <span>{blogDetails.readTime}</span>
                                  <div className="padding-6 flex items-center text-center" style={{ paddingBlock: 0 }}>
                                    .
                                  </div>
                                  <span>{blogDetails.date}</span>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between margin-14 padding-35 bdr-5" style={{ marginBottom: 0, marginInline: 0, borderInline: 0 }}>
                            <div className="flex items-center">
                              <div className="width-34 flex items-center">
                                <div className="select-none margin-19 relative flex items-center" style={{ marginLeft: 0, marginBlock: 0 }}>
                                  <button className="select-none cursor-pointer p-0 m-0 width-13 aspect-square opacity-[0.8] transition-all duration-300 ease-out hover:opacity-100">
                                    <PiHandsClapping className="w-full h-full" />
                                  </button>
                                </div>
                                <div className="flex items-center text-center opacity-[0.65] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                  <p className="font-4 color-6 custom-line-h-1 font-normal m-0 p-0">{blogDetails.clapsCount}</p>
                                </div>
                              </div>
                              <div className="inline-block">
                                <button className="flex items-center color-6 padding-23 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer m-0 hover:opacity-100" style={{ paddingInline: 0 }}>
                                  <div className="width-13 aspect-square">
                                    <FiMessageCircle className="w-full h-full" />
                                  </div>
                                  <p className="font-4 custom-line-h-1 font-normal m-0 p-0 flex items-center text-center">
                                    <span className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                                      {blogDetails.messageCount}
                                    </span>
                                  </p>
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                                <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                  <div className="width-13 aspect-square">
                                    <MdOutlineBookmarkAdd className="w-full h-full" />
                                  </div>
                                </button>
                              </div>
                              <div className="margin-12 shrink-0 inline-flex items-start" style={{ marginLeft: 0 }}>
                                <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                  <div className="width-13 aspect-square">
                                    <IoPlayCircleOutline className="w-full h-full" />
                                  </div>
                                </button>
                              </div>
                              <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                                <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                  <div className="width-13 aspect-square">
                                    <GoShare className="w-full h-full" />
                                  </div>
                                </button>
                              </div>
                              <div className="shrink-0 inline-block">
                                <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                  <div className="width-13 aspect-square">
                                    <IoIosMore className="w-full h-full" />
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* working */}
                      <figure className="margin-25 clear-both" style={{ marginBottom: 0, marginInline: 0 }}>
                        {/* need to add zoom in out logic here (maybe) */}
                        <div className="z-auto cursor-zoom-in relative w-full transition ease-in-out duration-300">
                          <div className="width-35 mr-auto ml-auto">
                            <picture>{blogDetails.images.length > 0 && <img src={blogDetails.images[0]} alt={blogDetails.heading} className="h-auto w-full max-w-full align-middle" />}</picture>
                          </div>
                        </div>
                      </figure>

                      {/* paragraphs are dynamic */}
                      <p className="letter-spacing-2 line-h-5 margin-32 font-3 break-words color-3 font-normal p-0" style={{ marginBottom: 0, marginInline: 0 }}></p>
                      <p className=""></p>
                      <p className=""></p>
                    </div>
                  </div>
                </div>
              </article>

              <div className="flex justify-center"></div>
            </div>

            <div className=""></div>

            <footer className="margin-28 static height-54 height-53 border-t-0 box-content flex items-center custom-bg-8" style={{ marginTop: 0, marginInline: 0 }}></footer>

            <div className="margin-27" style={{ marginTop: 0, marginInline: 0 }}></div>

            <div className="margin-29" style={{ marginTop: 0, marginInline: 0 }}></div>

            <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
