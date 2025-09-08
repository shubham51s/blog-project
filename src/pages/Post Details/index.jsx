import React, { useState } from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import CommentsComp from "../../components/PostDetailsPageComponents/Comments comp";

function PostDetailsPage() {
  const [blogDetails, setBlogDetails] = useState({
    id: 1,
    community: {
      name: "Philosophy Today",
      image: "https://miro.medium.com/v2/resize:fill:48:48/1*PUDx_xvsheMfWyuDj5_Kxg.png",
      description: "Philosophy Today is dedicated to current philosophy, logic, and thought.",
      followers: "515K",
      lastPublishedTime: "8 hours ago",
      about: "Practical wisdom for life drawn from philosophy, psychology, spirituality and personal experiences.",
    },
    author: {
      name: "Gen. A Ishimwe",
      followers: "61K",
      following: "400",
      about: "The wisdom of great minds. My essays cross between psychology, philosophy and self-improvement.",
      profileImg: "https://miro.medium.com/v2/resize:fill:40:40/1*Rfb_-NdeQ6kzcR3JmVdH9A.jpeg",
    },
    heading: "Why the Middle Class Suffers the Most: The Paradox of Choice",
    description: "How Trying to Optimize Your Life is Part of the Problem",
    readTime: "4 min read",
    date: "May 7, 2025",
    clapsCount: "3.6K",
    commentCount: "150",
    images: ["https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3lCgOLAxH3lgdeodzV7L_g.jpeg"],
    paragraphs: ["It usually happens to me on a random day. Nothing’s wrong. Life at home is good. Work’s okay. I’m still in touch with my close friends. But I feel existentially stuck. Not in pain. Not in crisis. Just this dull, dragging emptiness. It’s that weird state where everything’s “fine,” but nothing feels good That’s not even the worst part. The terrible part of this feeling is being stuck in your head, looking for answers.", "The problem isn’t the big things in life.", "But it doesn’t mean you’re not broken. Or ungrateful.", "Science has a term for it. It’s called the lack of interest, enjoyment or pleasure from life’s experiences .” In short, you don’t feel pleasure, even when nothing’s technically wrong.", "It’s like your brain forgets how to enjoy life. Or how to be curious and how to wonder. And when curiosity dies, so does joy. We don’t feel stuck because something happened. We feel stuck because nothing happens. Time collapses in our reality. And our brain stops reacting. But there’s a way out.", "The human brain is not a fan of repetition. It wants novelty. Change. Challenge, even when you don’t…"],
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
                                <img src={blogDetails.author.profileImg} alt={blogDetails.author.name} className="width-11 aspect-square" />
                              </div>
                              <span className="custom-fs-1 custom-line-h-1 color-3 font-normal">
                                <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                  <div className="flex items-center flex-nowrap">
                                    <div className="flex items-center custom-fs-1 custom-line-h-1 color-3">{blogDetails.author.name}</div>
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
                                      {blogDetails.commentCount}
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

                      <figure className="margin-25 clear-both" style={{ marginBottom: 0, marginInline: 0 }}>
                        {/* need to add zoom in out logic here (maybe) */}
                        <div className="z-auto cursor-zoom-in relative w-full transition ease-in-out duration-300">
                          <div className="width-35 mr-auto ml-auto">
                            <picture>{blogDetails.images.length > 0 && <img src={blogDetails.images[0]} alt={blogDetails.heading} className="h-auto w-full max-w-full align-middle" />}</picture>
                          </div>
                        </div>
                      </figure>

                      {/* paragraphs are dynamic */}
                      {blogDetails.paragraphs.map((item, index) => (
                        <p key={index} className="letter-spacing-2 line-h-5 margin-32 font-3 break-words color-3 font-normal p-0" style={{ marginBottom: 0, marginInline: 0 }}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* <div className="flex justify-center"></div> */}
            </div>

            <div className=""></div>

            <footer className="margin-28 static height-54 height-53 border-t-0 box-content flex items-center custom-bg-8" style={{ marginTop: 0, marginInline: 0 }}>
              <div className="grow-1 shrink-0 basis-auto">
                <div className="flex justify-center">
                  <div className="min-w-0 w-full max-width-2 margin-2 flex justify-between">
                    <div className="flex items-center">
                      <div className="width-36">
                        <span className="inline-block">
                          <div className="flex items-center">
                            <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                              <div className="width-13 aspect-square opacity-[0.80] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                <PiHandsClapping className="w-full h-full" />
                              </div>
                            </div>
                            <div>
                              <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0 text-center">{blogDetails.clapsCount}</p>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="margin-12" style={{ marginRight: 0 }}>
                        <span className="inline-block">
                          <div className="flex items-center">
                            <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                              <div className="width-13 aspect-square opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                                <FiMessageCircle className="w-full h-full" />
                              </div>
                            </div>
                            <div>
                              <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0 text-center">{blogDetails.commentCount}</p>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                        <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                          <div className="width-13 aspect-square">
                            <MdOutlineBookmarkAdd className="w-full h-full" />
                          </div>
                        </button>
                      </div>
                      <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                        <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                          <div className="width-13 aspect-square">
                            <GoShare className="w-full h-full" />
                          </div>
                        </button>
                      </div>
                      <div className="grow-0 shrink-0 basis-auto">
                        <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                          <div className="width-13 aspect-square">
                            <IoIosMore className="w-full h-full" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>

            {/* about author & community */}
            <div className="margin-27" style={{ marginTop: 0, marginInline: 0 }}>
              <div className="flex justify-center">
                <div className="min-w-0 w-full max-width-2 margin-2">
                  <div className="custom-margin-b-1">
                    <div className="flex">
                      <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
                        <div className="">
                          <Link className="no-underline">
                            <div className="relative">
                              <img src={blogDetails.community.image} alt={blogDetails.community.name} className="width-15 aspect-square border-radius-5" />
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col grow-0 shrink-0 basis-auto">
                        <div className="width-37">
                          <a href="#" className="m-0 p-0 cursor-pointer flex items-center no-underline">
                            <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                              <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                                {`Published in ${blogDetails.community.name}`}
                              </span>
                            </h2>
                          </a>
                          <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
                            <div className="grow-0 shrink-0 basis-auto">
                              <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                                <a href="#" className="cursor-pointer m-0 p-0 no-underline">{`${blogDetails.community.followers} followers`}</a>
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
                              <span className="margin-16" style={{ marginBlock: 0 }}>
                                <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
                              </span>
                              <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                                {`Last published ${blogDetails.community.lastPublishedTime}`}
                              </a>
                            </div>
                          </div>
                          <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                            <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                              <span className="break-words">{blogDetails.community.about}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex">
                          <button className="bdr-7 padding-37 padding-38 border-radius-8 width-34 flex items-center justify-center m-0">
                            <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
                      <div className="">
                        <Link className="no-underline">
                          <div className="relative">
                            <img src={blogDetails.community.image} alt={blogDetails.community.name} className="width-15 aspect-square border-radius-5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col grow-0 shrink-0 basis-auto">
                      <div className="width-37">
                        <a href="#" className="m-0 p-0 cursor-pointer flex items-center no-underline">
                          <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                            <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                              {`Written by ${blogDetails.author.name}`}
                            </span>
                          </h2>
                        </a>
                        <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
                          <div className="grow-0 shrink-0 basis-auto">
                            <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                              <a href="#" className="cursor-pointer m-0 p-0 no-underline">{`${blogDetails.author.followers} followers`}</a>
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
                            <span className="margin-16" style={{ marginBlock: 0 }}>
                              <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
                            </span>
                            <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                              {`${blogDetails.author.following} following`}
                            </a>
                          </div>
                        </div>
                        <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                          <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                            <span className="break-words">{blogDetails.author.about}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex">
                        <button className="bdr-7 padding-37 padding-38 border-radius-8 width-34 flex items-center justify-center m-0">
                          <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* comments section */}
            {/* working */}
            <CommentsComp />
            <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
