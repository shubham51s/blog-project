import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsComp from "../../components/PostDetailsPageComponents/Comments comp";
import BlogRecommendComp from "../../components/PostDetailsPageComponents/Blog Recommendation";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { FaHandsClapping } from "react-icons/fa6";
import MoreOptionsComp from "../../components/PostDetailsPageComponents/MoreOptionsComp";
import { UserContext } from "../../context/userContext";
import ShowClapsComp from "../../components/PostDetailsPageComponents/ShowLikes";
import BlogDetailsSkeletonComp from "./skeleton";
import BlogDetailsErrorComp from "./notFound";

function PostDetailsPage() {
  const { title, id } = useParams();
  const { userInfo } = useContext(UserContext);
  const { fetchRequest } = useApi();
  const navigate = useNavigate();
  const [isShowFullImg, setIsShowFullImg] = useState(false);
  const fullImgRef = useRef(null);
  const [blog, setBlog] = useState();
  const [readingTime, setReadingTime] = useState();
  const [myPrevClapsCount, setMyPrevClapsCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAnyErr, setIsAnyErr] = useState(false);
  const loadingTimeout = useRef(null);
  const [clapDetails, setClapDetails] = useState({
    totalClaps: 0,
    myClaps: 0,
    isLoading: false,
    isShowClapsComp: false,
    clappedUsers: [],
    skip: 0,
    clappedUsersCount: 0,
  });

  let clapsTimeout = useRef(null);
  const clapsClickedCount = useRef(0);

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

  const formatDate = (dateString) => {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffMs = now - inputDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays === 0) {
      if (diffHrs > 0) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
      if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
      return `${diffSec} second${diffSec > 1 ? "s" : ""} ago`;
    }

    if (diffDays === 1) {
      return `1 day ago`;
    }

    const options = { month: "short", day: "numeric", year: "numeric" };
    return inputDate.toLocaleDateString("en-US", options);
  };

  const calculateReadingTime = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;

    const text = div.textContent || "";
    const words = text.trim().split(/\s+/).length;

    const wordsPerMinute = 265;
    const readMinFromWords = words / wordsPerMinute;

    const imageCount = div.querySelectorAll("img").length;
    const imageTime = imageCount * (12 / 60); // 12 sec = 0.2 min

    const totalTime = Math.ceil(readMinFromWords + imageTime);

    const time = `${totalTime} min read`;
    setReadingTime(time);
  };

  const getMyClapsCount = async (blogId) => {
    try {
      const response = await fetchRequest(`/claps/${blogId}`, "GET");

      if (response.status === 200) {
        const result = await response.json();
        setMyPrevClapsCount(result.data.count);
        setClapDetails((prev) => ({ ...prev, myClaps: result.data.count }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const undoMyClaps = async () => {
    try {
      const response = await fetchRequest(`/claps/${blog._id}`, "DELETE");
      // const result = await response.json();

      if (response.status === 200) {
        setClapDetails((prev) => ({ ...prev, myClaps: 0, totalClaps: blog.clapsCount - myPrevClapsCount >= 0 ? blog.clapsCount - myPrevClapsCount : 0 }));
        setBlog((prev) => ({ ...prev, clapsCount: prev.clapsCount - myPrevClapsCount >= 0 ? prev.clapsCount - myPrevClapsCount : 0 }));
        setMyPrevClapsCount(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addClaps = async () => {
    const remaining = 50 - clapDetails.myClaps;
    const clapsToAdd = Math.min(remaining, clapsClickedCount.current);
    clapsClickedCount.current = 0;

    setClapDetails((prev) => ({ ...prev, isLoading: true }));
    try {
      const params = {
        clapsCount: clapsToAdd,
        blog: blog._id,
      };

      const response = await fetchRequest(`/claps`, "POST", params);

      setClapDetails((prev) => ({ ...prev, isLoading: false }));

      if (response?.status === 200) {
        const result = await response.json();
        const updatedClaps = result.clapsCount;
        setClapDetails((prev) => ({ ...prev, myClaps: updatedClaps, totalClaps: blog.clapsCount - myPrevClapsCount + updatedClaps }));
      }
    } catch (err) {
      setClapDetails((prev) => ({ ...prev, isLoading: false }));
      console.error(err);
    }
  };

  const handleAddClapsBtnClick = () => {
    if (clapDetails.myClaps >= 50) return;

    clapsClickedCount.current++;

    setClapDetails((prev) => {
      const newTotal = blog.clapsCount - myPrevClapsCount + Math.min(prev.myClaps + clapsClickedCount.current, 50);
      return {
        ...prev,
        totalClaps: newTotal,
      };
    });

    if (clapsTimeout.current) clearTimeout(clapsTimeout.current);

    clapsTimeout.current = setTimeout(() => {
      addClaps();
    }, 2000);
  };

  const fetchBlogDetails = async () => {
    try {
      const response = await fetchRequest(`/blogs/${id}`, "GET");

      const result = await response.json();

      if (response?.status === 200) {
        const blog = result?.data?.blog;
        console.log("result.data.blog: ", blog);
        setClapDetails((prev) => ({ ...prev, totalClaps: blog.clapsCount }));
        getMyClapsCount(blog._id);
        setBlog(blog);
        calculateReadingTime(blog.content);
      } else {
        setIsAnyErr(true);
      }
    } catch (err) {
      setIsAnyErr(true);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleShowClapsUi = () => {
    if (clapDetails.totalClaps <= 0) return;

    setClapDetails((prev) => ({ ...prev, isShowClapsComp: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchBlogDetails();

    // minimun loading time
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);

    loadingTimeout.current = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    };
  }, []);

  return (
    <>
      <div className="custom-bg-8">
        <HeaderComp />
        {/* home content */}
        <div className="flex">
          <HomeLeftMenuComp />
          {/* width need to check later given different width than original */}
          {isInitialLoading && <BlogDetailsSkeletonComp />}
          {blog && !isInitialLoading && !isAnyErr && (
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
                  <div className="absolute translateY-1 top-0 width-17 transition-all duration-300 linear opacity-100 pointer-none">
                    <div className="flex justify-center">
                      <div className="margin-27 min-w-0 w-full custom-max-w-1" style={{ marginBlock: 0 }}>
                        <div className="width-30 flex items-start flex-col">
                          <a href="#" className="no-underline p-0 m-0">
                            <div className="relative">
                              <img src={blog.community.profileImg} className="width-31 aspect-square border-radius-5 block align-middle" />
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
                            <h1 className="letter-spacing-7 line-h-10 font-12 margin-30 mt-0 font-bold color-3">{blog.heading.charAt(0).toUpperCase() + blog.heading.slice(1)}</h1>
                          </div>
                          <div>
                            <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">{blog.previewSubtitle}</h2>
                            <div className="w-full">
                              <div className="flex items-center custom-gap-5">
                                <div className="flex items-center custom-gap-5 ">
                                  <div className="flex items-baseline">
                                    <img src={blog.author.profileImg} className="width-11 aspect-square rounded-full" />
                                  </div>
                                  <span className="custom-fs-1 custom-line-h-1 color-3 font-normal">
                                    <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                      <div className="flex items-center flex-nowrap">
                                        <div className="flex items-center custom-fs-1 custom-line-h-1 color-3">
                                          {blog.author.name
                                            .split(" ")
                                            .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                                            .join(" ")}
                                        </div>
                                        <div className="inline-block width-33"></div>
                                        <div className="inline-block">
                                          {userInfo?._id !== blog.author._id && (
                                            <button className="bdr-7 padding-28 padding-20 width-24 border-radius-7 cursor-pointer flex justify-between items-center m-0">
                                              <span className="custom-fs-1 custom-line-h-1 color-3 w-full font-normal whitespace-nowrap">Follow</span>
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className="flex items-center flex-wrap">
                                  <span className="custom-fs-1 custom-line-h-1 color-3 font-medium color-4">
                                    <div className="flex grow shrink-0 basis-auto">
                                      <span>{readingTime}</span>
                                      <div className="padding-6 flex items-center text-center" style={{ paddingBlock: 0 }}>
                                        .
                                      </div>
                                      <span>{formatDate(blog.updatedAt)}</span>
                                    </div>
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between margin-14 padding-35 bdr-5" style={{ marginBottom: 0, marginInline: 0, borderInline: 0 }}>
                                <div className="flex items-center">
                                  <div className="width-34 flex items-center">
                                    <div className="select-none margin-19 relative flex items-center" style={{ marginLeft: 0, marginBlock: 0 }}>
                                      <button onClick={handleAddClapsBtnClick} className={`select-none p-0 m-0 width-13 aspect-square opacity-[0.8] transition-all duration-300 linear ${userInfo?._id === blog.author._id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`} title={`${userInfo?._id === blog.author._id ? "You cannot applaud your own story" : "Clap"}`} disabled={userInfo?._id === blog.author._id}>
                                        {clapDetails.myClaps <= 0 && <PiHandsClapping className="w-full h-full" />}
                                        {clapDetails.myClaps > 0 && <FaHandsClapping className="w-full h-full" />}
                                      </button>
                                    </div>
                                    <div className="flex items-center text-center margin-19 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100" style={{ marginRight: 0, marginBlock: 0 }}>
                                      <p onClick={() => handleShowClapsUi()} className="font-4 color-6 custom-line-h-1 font-normal m-0 p-0 select-none">
                                        {clapDetails.totalClaps}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="inline-block">
                                    <button className="flex items-center color-6 padding-23 opacity-[0.65] transition-all duration-300 linear cursor-pointer m-0 hover:opacity-100" style={{ paddingInline: 0 }}>
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
                                    <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                                      <div className="width-13 aspect-square">
                                        <MdOutlineBookmarkAdd className="w-full h-full" />
                                      </div>
                                    </button>
                                  </div>
                                  <div className="margin-12 shrink-0 inline-flex items-start" style={{ marginLeft: 0 }}>
                                    <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                                      <div className="width-13 aspect-square">
                                        <IoPlayCircleOutline className="w-full h-full" />
                                      </div>
                                    </button>
                                  </div>
                                  <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                                    <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                                      <div className="width-13 aspect-square">
                                        <GoShare className="w-full h-full" />
                                      </div>
                                    </button>
                                  </div>
                                  <MoreOptionsComp blog={blog} clapDetails={clapDetails} undoMyClaps={undoMyClaps} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div onClick={handlMarkupParentClick} className="markupContainer" dangerouslySetInnerHTML={{ __html: blog.content }} />
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
                                  <button onClick={handleAddClapsBtnClick} className={`width-13 aspect-square opacity-[0.7] transition-all duration-200 linear ${userInfo?._id === blog.author._id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-[0.9]"}`} title={`${userInfo?._id === blog.author._id ? "You cannot applaud your own story" : "Clap"}`} disabled={userInfo?._id === blog.author._id}>
                                    {clapDetails.myClaps <= 0 && <PiHandsClapping className="w-full h-full" />}
                                    {clapDetails.myClaps > 0 && <FaHandsClapping className="w-full h-full" />}
                                  </button>
                                </div>
                                <div className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                                  <p onClick={() => handleShowClapsUi()} className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center cursor-pointer select-none opacity-[0.7] transition-all duration-200 linear hover:opacity-[0.9]" title="View Claps">
                                    {clapDetails.totalClaps}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="margin-12" style={{ marginRight: 0 }}>
                            <span className="inline-block">
                              <div className="flex items-center color-6 opacity-[0.7] transition-all duration-200 linear cursor-pointer hover:opacity-[0.9]" title="Respond">
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
                            <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                              <div className="width-13 aspect-square">
                                <MdOutlineBookmarkAdd className="w-full h-full" title="Save" />
                              </div>
                            </button>
                          </div>
                          <div className="margin-18 flex-grow: 0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                            <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                              <div className="width-13 aspect-square">
                                <GoShare className="w-full h-full" title="Share" />
                              </div>
                            </button>
                          </div>
                          <MoreOptionsComp blog={blog} clapDetails={clapDetails} undoMyClaps={undoMyClaps} />
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
                                    <img src={blog.community.profileImg} className="width-15 aspect-square border-radius-5" />
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
                                <img src={blog.author.profileImg} className="width-15 aspect-square rounded-full" />
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
                            {userInfo?._id !== blog.author._id && (
                              <button className="bdr-7 padding-37 padding-38 border-radius-8 width-34 flex items-center justify-center m-0 cursor-pointer">
                                <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                              </button>
                            )}
                            {userInfo?._id === blog.author._id && (
                              <Link className="text-center no-underline rounded-full bdr-6 custom-bg-1 custom-px-2 custom-py-2 color-2 box-border inline-block custom-fs-1 custom-line-h-1 font-normal opacity-[0.95] transition-all duration-200 linear hover:opacity-100">
                                <div className="whitespace-nowrap">Edit profile</div>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* comments section */}
                <CommentsComp blog={blog} setBlog={setBlog} />
                {blog && <BlogRecommendComp blog={blog} />}
              </div>
            </div>
          )}
          {!isInitialLoading && isAnyErr && <BlogDetailsErrorComp />}
        </div>
      </div>

      {/* full screen image view */}
      {isShowFullImg && (
        <div onClick={() => handleCloseFullImg()} className="w-screen h-screen max-w-screen max-h-screen fixed inset-0 z-[999] flex items-center justify-center custom-bg-4 select-none pointer-events-auto">
          <img onClick={() => handleCloseFullImg()} src={isShowFullImg} className="h-full max-w-full max-h-full cursor-zoom-out" />
        </div>
      )}

      {clapDetails.isShowClapsComp && <ShowClapsComp clapDetails={clapDetails} setClapDetails={setClapDetails} blog={blog} />}
    </>
  );
}

export default PostDetailsPage;
