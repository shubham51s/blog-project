import React, { useEffect, useRef, useState } from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsComp from "../../components/PostDetailsPageComponents/Comments comp";
import BlogRecommendComp from "../../components/PostDetailsPageComponents/Blog Recommendation";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";

function PostDetailsPage() {
  const { title, id } = useParams();
  const { fetchRequest } = useApi();
  const navigate = useNavigate();
  const [isShowFullImg, setIsShowFullImg] = useState(false);
  const fullImgRef = useRef(null);
  const [blog, setBlog] = useState();

  const handleClickOutside = (e) => {};

  const fetchBlogDetails = async () => {
    try {
      const response = await fetchRequest(`/blogs/${id}`, "GET");

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Something went wrong!");
        navigate("/");
        return;
      }

      if (response.status === 200) setBlog(result.data.blog);
      console.log("result: ", result.data.blog);
    } catch (err) {
      console.log("fetchBlogDetails catch block: ", err);
      toast.error("Something went wrong!");
      navigate("/");
    }
  };

  const handlMarkupParentClick = (e) => {
    const imageEl = e.target.closest("img");
    if (imageEl && imageEl.src) {
      setIsShowFullImg(imageEl.src);
      window.addEventListener("scroll", handleOnScroll);
    }
  };

  // add on scroll event only when full size image is open (to close this full size image on scroll) and remove listener when full size image is closed
  const handleOnScroll = () => {
    handleCloseFullImg();
  };

  const handleCloseFullImg = () => {
    setIsShowFullImg(false);
    window.removeEventListener("scroll", handleOnScroll);
  };

  useEffect(() => {
    fetchBlogDetails();
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return (
    <>
      {/* skeleton loader pending */}
      {blog && (
        <div className="custom-bg-8">
          <HeaderComp />
          {/* home content */}
          <div className="flex">
            <HomeLeftMenuComp />
            {/* width need to check later given different width than original */}
            <div className="width-17 grow shrink basis-auto">
              <div>
                {blog.community && (
                  <div className="bdr-5 w-full">
                    <div className="height-55 w-full"></div>
                    <div className="flex justify-center">
                      <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
                        <div className="height-3 flex items-center">
                          <div className="width-32">
                            <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                              <h2 className="line-h-8 font-3 font-medium color-3 p-0 m-0">
                                <div className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden">{blog.community.name}</div>
                              </h2>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className=""></div>

                {/* left section (about community) */}
                {blog.community && (
                  <div className="absolute translateY-1 top-0 width-17 transition-all duration-300 ease-out opacity-100 pointer-none">
                    <div className="flex justify-center">
                      <div className="margin-27 min-w-0 w-full custom-max-w-1" style={{ marginBlock: 0 }}>
                        <div className="width-30 flex items-start flex-col">
                          <a href="#" className="no-underline p-0 m-0">
                            <div className="relative">
                              <img src={blog.community.profileImg} alt={blog.community.name} className="width-31 aspect-square border-radius-5 block align-middle" />
                            </div>
                          </a>
                          <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                          <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0">
                            <span>{blog.community.about}</span>
                          </p>
                          <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                          <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                            <button className="underline cursor-pointer m-0 p-0">Follow publication</button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="margin-28" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="flex justify-center">
                    <div className="w-full min-w-0 max-width-2 margin-12"></div>
                  </div>

                  <article>
                    <div className="break-words margin-25" style={{ marginInline: 0, marginBottom: 0 }}>
                      <div className="flex justify-center">
                        <div className="w-full min-w-0 max-width-2 margin-12">
                          <div>
                            <h1 className="letter-spacing-7 line-h-10 font-12 margin-30 mt-0 font-bold color-3">{blog.heading}</h1>
                          </div>
                          <div>
                            <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">{blog.previewSubtitle}</h2>
                            <div className="w-full">
                              <div className="flex items-center custom-gap-5">
                                <div className="flex items-center custom-gap-5 ">
                                  <div className="flex items-baseline">
                                    <img src={blog.author.profileImg} alt={blog.author.name} className="width-11 aspect-square" />
                                  </div>
                                  <span className="custom-fs-1 custom-line-h-1 color-3 font-normal">
                                    <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                      <div className="flex items-center flex-nowrap">
                                        <div className="flex items-center custom-fs-1 custom-line-h-1 color-3">{blog.author.name}</div>
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
                                    <div className="flex grow shrink-0 basis-auto">
                                      <span>{blog.readTime || "no time"}</span>
                                      <div className="padding-6 flex items-center text-center" style={{ paddingBlock: 0 }}>
                                        .
                                      </div>
                                      <span>{blog.updatedAt}</span>
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
                                      <p className="font-4 color-6 custom-line-h-1 font-normal m-0 p-0">{blog.likeCount}</p>
                                    </div>
                                  </div>
                                  <div className="inline-block">
                                    <button className="flex items-center color-6 padding-23 opacity-[0.65] transition-all duration-300 ease-out cursor-pointer m-0 hover:opacity-100" style={{ paddingInline: 0 }}>
                                      <div className="width-13 aspect-square">
                                        <FiMessageCircle className="w-full h-full" />
                                      </div>
                                      <p className="font-4 custom-line-h-1 font-normal m-0 p-0 flex items-center text-center">
                                        <span className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                                          {blog.commentCount}
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

                          <div onClick={handlMarkupParentClick} className="markupContainer" dangerouslySetInnerHTML={{ __html: blog.content }} />

                          {/* need to add zoom in out logic here (maybe) */}
                          {/* <figure className="margin-25 clear-both" style={{ marginBottom: 0, marginInline: 0 }}>
                            <div className="z-auto cursor-zoom-in relative w-full transition ease-in-out duration-300">
                              <div className="width-35 mr-auto ml-auto">
                                <picture>{blogDetails.images.length > 0 && <img onClick={() => setIsShowFullImg(blogDetails.images[0])} src={blogDetails.images[0]} alt={blogDetails.heading} className="h-auto w-full max-w-full align-middle" />}</picture>
                              </div>
                            </div>
                          </figure> */}

                          {/* paragraphs are dynamic */}
                          {/* {blogDetails.paragraphs.map((item, index) => (
                            <p key={index} className="letter-spacing-2 line-h-5 margin-32 font-3 break-words color-3 font-normal p-0" style={{ marginBottom: 0, marginInline: 0 }}>
                              {item}
                            </p>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* <div className="flex justify-center"></div> */}
                </div>

                <div className=""></div>

                <footer className="margin-28 static height-54 height-53 border-t-0 box-content flex items-center custom-bg-8" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="grow shrink-0 basis-auto">
                    <div className="flex justify-center">
                      <div className="min-w-0 w-full max-width-2 margin-2 flex justify-between">
                        <div className="flex items-center">
                          <div className="width-36">
                            <span className="inline-block">
                              <div className="flex items-center">
                                <div className="select-none color-6 margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                                  <div className="width-13 aspect-square opacity-[0.7] transition-all duration-200 ease-out cursor-pointer hover:opacity-[0.9]">
                                    <PiHandsClapping className="w-full h-full" title="Clap" />
                                  </div>
                                </div>
                                <div>
                                  <p className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center cursor-pointer opacity-[0.7] transition-all duration-200 ease-out hover:opacity-[0.9]" title="View Claps">
                                    {blog.likeCount}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="margin-12" style={{ marginRight: 0 }}>
                            <span className="inline-block">
                              <div className="flex items-center color-6 opacity-[0.7] transition-all duration-200 ease-out cursor-pointer hover:opacity-[0.9]" title="Respond">
                                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                                  <div className="width-13 aspect-square">
                                    <FiMessageCircle className="w-full h-full opacity-[0.9]" />
                                  </div>
                                </div>
                                <div>
                                  <p className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center">{blog.commentCount}</p>
                                </div>
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="margin-18 flex-grow: 0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                            <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                              <div className="width-13 aspect-square">
                                <MdOutlineBookmarkAdd className="w-full h-full" title="Save" />
                              </div>
                            </button>
                          </div>
                          <div className="margin-18 flex-grow: 0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                            <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                              <div className="width-13 aspect-square">
                                <GoShare className="w-full h-full" title="Share" />
                              </div>
                            </button>
                          </div>
                          <div className="flex-grow: 0 shrink-0 basis-auto">
                            <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 ease-out cursor-pointer hover:opacity-100">
                              <div className="width-13 aspect-square">
                                <IoIosMore className="w-full h-full" title="More" />
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
                      {/* community details */}
                      {blog.community && (
                        <div className="custom-margin-b-1">
                          <div className="flex items-start">
                            <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
                              <div className="">
                                <Link className="no-underline">
                                  <div className="relative">
                                    <img src={blog.community.profileImg} alt={blog.community.name} className="width-15 aspect-square border-radius-5" />
                                  </div>
                                </Link>
                              </div>
                            </div>
                            <div className="flex flex-col grow shrink-0 basis-auto">
                              <div className="width-37">
                                <a href="#" className="m-0 p-0 cursor-pointer flex items-center no-underline">
                                  <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                                    <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                                      {`Published in ${blog.community.name}`}
                                    </span>
                                  </h2>
                                </a>
                                <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
                                  <div className="grow-0 shrink-0 basis-auto">
                                    <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                                      <a href="#" className="cursor-pointer m-0 p-0 no-underline hover:underline">{`${blog.community.followersCount} followers`}</a>
                                    </span>
                                  </div>
                                  <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
                                    <span className="margin-16" style={{ marginBlock: 0 }}>
                                      <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
                                    </span>
                                    <a href="#" className="cursor-pointer m-0 p-0 no-underline hover:underline">
                                      {`Last published ${blog.community.lastPublishedTime}`}
                                    </a>
                                  </div>
                                </div>
                                <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                                  <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                                    <span className="break-words">{blog.community.about}</span>
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
                      )}
                      <div className="flex items-start">
                        <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
                          <div className="">
                            <Link className="no-underline">
                              <div className="relative">
                                <img src={blog.author.profileImg} alt={blog.author.name} className="width-15 aspect-square rounded-full" />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col grow shrink-0 basis-auto">
                          <div className="width-37">
                            <a href="#" className="m-0 p-0 cursor-pointer flex items-center no-underline">
                              <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                                <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                                  {`Written by ${blog.author.name
                                    .split(" ")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}`}
                                </span>
                              </h2>
                            </a>
                            <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
                              <div className="grow-0 shrink-0 basis-auto">
                                <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                                  <a href="#" className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">{`${blog.author.followerCount} followers`}</a>
                                </span>
                              </div>
                              <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
                                <span className="margin-16" style={{ marginBlock: 0 }}>
                                  <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
                                </span>
                                <a href="#" className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">
                                  {`${blog.author.followingCount} following`}
                                </a>
                              </div>
                            </div>
                            {blog.author.about && (
                              <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                                <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                                  <span className="break-words">{blog.author.about}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="flex">
                            <button className="bdr-7 padding-37 padding-38 border-radius-8 width-34 flex items-center justify-center m-0 cursor-pointer">
                              <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* comments section */}
                <CommentsComp />
                <BlogRecommendComp />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* full screen image view */}
      {isShowFullImg && (
        <div onClick={() => handleCloseFullImg()} className="w-screen h-screen max-w-screen max-h-screen fixed inset-0 z-[999] flex items-center justify-center custom-bg-4 select-none pointer-events-auto">
          <img onClick={() => handleCloseFullImg()} src={isShowFullImg} className="h-full max-w-full max-h-full cursor-zoom-out" />
        </div>
      )}
    </>
  );
}

export default PostDetailsPage;
