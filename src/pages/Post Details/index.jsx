import React, { useContext, useEffect, useRef, useState } from "react";
import { PiHandsClapping } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsComp from "../../components/PostDetailsPageComponents/Comments comp";
import BlogRecommendComp from "../../components/PostDetailsPageComponents/Blog Recommendation";
import { FaHandsClapping } from "react-icons/fa6";
import MoreOptionsComp from "../../components/PostDetailsPageComponents/MoreOptionsComp";
import { UserContext } from "../../context/userContext";
import ShowClapsComp from "../../components/PostDetailsPageComponents/ShowLikes";
import BlogDetailsSkeletonComp from "./skeleton";
import { showToast } from "../../utils/toaster";
import { FollowingContext } from "../../context/followingContext";
import { useToggleUserFollow } from "../../hooks/toggleUserFollow";
import NotFoundComp from "../../components/Common/NotFound";
import { useRequestHandler } from "../../hooks/requestHandler";
import SaveBlog from "../../components/Common/Buttons/ToggleBlogSave";
import { defaultLoaderTime } from "../../constants/constant";
import { formatUTCToLocalDate } from "../../utils/dates";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Tooltip } from "@mui/material";
import PublicationLeftSection from "../../components/PostDetailsPageComponents/PublicationLeftSection";

function PostDetailsPage() {
  const { slug, id } = useParams();
  const { userInfo } = useContext(UserContext);
  const { requestHandler } = useRequestHandler();
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isShowFullImg, setIsShowFullImg] = useState(false);
  const fullImgRef = useRef(null);
  const [blog, setBlog] = useState(null);
  const [myPrevClapsCount, setMyPrevClapsCount] = useState(0);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [isAnyErr, setIsAnyErr] = useState(false);
  const loadingTimeout = useRef(null);
  const readingTimeout = useRef(null);
  const [loaders, setLoaders] = useState({
    fetchBlog: true,
    following: false,
  });
  const [clapDetails, setClapDetails] = useState({
    totalClaps: 0,
    myClaps: 0,
    isLoading: false,
    isShowClapsComp: false,
    clappedUsers: [],
    skip: 0,
    clappedUsersCount: 0,
  });

  const clapsTimeout = useRef(null);
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

  const getMyClapsCount = async (blogId) => {
    try {
      const response = await requestHandler(`/claps/${blogId}`);

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
      const response = await requestHandler(`/claps/${blog._id}`, "DELETE");
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

      const response = await requestHandler(`/claps`, "POST", params);

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

  const updateBlogReadingTime = async (blogId) => {
    try {
      const params = {
        blogId,
      };
      const response = await requestHandler("/blog/read/update-view-status", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (!result.data.stop) {
          if (readingTimeout.current) clearTimeout(readingTimeout.current);
          readingTimeout.current = setTimeout(() => {
            updateBlogReadingTime(blogId);
            readingTimeout.current = null;
          }, 5000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const readBlog = async (blogId) => {
    try {
      const params = {
        blogId,
      };
      const response = await requestHandler("/blog/read", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (!result.data.stop) {
          if (readingTimeout.current) clearTimeout(readingTimeout.current);
          readingTimeout.current = setTimeout(() => {
            updateBlogReadingTime(blogId);
            readingTimeout.current = null;
          }, 5000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getBlogDetails = async () => {
    setLoaders((prev) => ({ ...prev, fetchBlog: true }));
    try {
      const response = await requestHandler(`/blogs/${slug}/${id}`);

      const result = await response.json();

      if (response?.status === 200 && result?.data?.blog) {
        const blog = result.data.blog;
        setClapDetails((prev) => ({ ...prev, totalClaps: blog.clapsCount }));
        getMyClapsCount(blog._id);
        setBlog(blog);
        readBlog(blog._id);
      } else {
        setIsAnyErr(true);
      }
    } catch (err) {
      setIsAnyErr(true);
      console.error(err);
      showToast("Something went wrong!");
    } finally {
      setLoaders((prev) => ({ ...prev, fetchBlog: false }));
    }
  };

  const handleShowClapsUi = () => {
    if (clapDetails.totalClaps <= 0) return;

    setClapDetails((prev) => ({ ...prev, isShowClapsComp: true }));
  };

  const followAuthor = async () => {
    setLoaders((prev) => ({ ...prev, following: true }));

    const params = {
      _id: blog.author._id,
      name: blog.author.name,
    };
    await followUser(params);

    setLoaders((prev) => ({ ...prev, following: false }));
  };

  const unfollowAuthor = async () => {
    setLoaders((prev) => ({ ...prev, following: true }));

    const params = {
      _id: blog.author._id,
      name: blog.author.name,
    };
    await unfollowUser(params);

    setLoaders((prev) => ({ ...prev, following: false }));
  };

  // to update saved blogs in parent also (to sync, not required in every parent but for some cases like blog details page where there are 2 button for save blog so to sync both)
  const handleToggleBlogSaveInParent = (type, listId) => {
    if (type === "add") setBlog((prev) => ({ ...prev, lists: [...prev.lists, listId] }));
    if (type === "remove") {
      const updatedList = blog.lists.filter((item) => item !== listId);
      setBlog((prev) => ({ ...prev, lists: updatedList }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogDetails();

    // minimun default loading time
    if (!loadingTimeout.current) {
      loadingTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return (
    <>
      {/* home content */}
      {(defaultLoader || loaders.fetchBlog) && <BlogDetailsSkeletonComp />}
      {!defaultLoader && !loaders.fetchBlog && !isAnyErr && (
        <div className="h-full overflow-y-auto relative">
          {/* publication left section */}
          {blog.publication && <PublicationLeftSection publication={blog.publication} />}

          <div className=""></div>

          <div className="margin-28" style={{ marginTop: 0, marginInline: 0 }}>
            <div className="flex justify-center">
              <div className="w-full min-w-0 max-width-2 margin-12"></div>
            </div>

            <article>
              <div className="break-words margin-25" style={{ marginInline: 0, marginBottom: 0 }}>
                <div className="flex justify-center">
                  <div className="w-full min-w-0 max-width-2 margin-12">
                    <div>
                      <h1 className="letter-spacing-7 line-h-10 font-12 margin54 mt-0 font-bold color-3">{blog.heading}</h1>
                    </div>
                    <div>
                      {/* <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">{blog.previewSubtitle}</h2> */}
                      <div className="w-full">
                        <div className="flex items-center custom-gap-5">
                          <div className="flex items-center custom-gap-5 ">
                            <Link to={`/profile/${blog.author.username}`} className="flex items-baseline cursor-pointer">
                              <img src={blog.author.profileImg} className="width-11 aspect-square rounded-full" />
                            </Link>
                            <span className="custom-fs-1 custom-line-h-1 color-3 font-medium">
                              <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                <div className="flex items-center flex-nowrap">
                                  <Link to={`/profile/${blog.author.username}`} className="flex items-center custom-fs-1 custom-line-h-1 color-3 capitalize cursor-pointer hover:underline transition-all duration-75 ease">
                                    {blog.author.name}
                                  </Link>
                                  {userInfo?._id !== blog.author._id && !isFetchUserLoader && (
                                    <>
                                      <div className="inline-block width-33"></div>
                                      <div className="inline-block">
                                        {followingUsers[blog.author._id] && (
                                          <button onClick={unfollowAuthor} disabled={loaders.following} className="bdr17-hover padding-28 padding-20 border-radius-7 cursor-pointer flex justify-between items-center m-0 transition-all duration-700 ease">
                                            <span className="custom-fs-1 custom-line-h-1 font-medium w-full whitespace-nowrap">Following</span>
                                          </button>
                                        )}
                                        {!followingUsers[blog.author._id] && (
                                          <button onClick={followAuthor} disabled={loaders.following} className="bdr-7 padding-28 padding-20 border-radius-7 cursor-pointer flex justify-between items-center m-0">
                                            <span className="custom-fs-1 custom-line-h-1 font-medium w-full whitespace-nowrap">Follow</span>
                                          </button>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="flex items-center flex-wrap">
                            <span className="custom-fs-1 custom-line-h-1 color-3 font-medium color-4">
                              <div className="flex grow shrink-0 basis-auto">
                                {userInfo?._id === blog.author._id && (
                                  <div className="padding-6 flex items-center text-center" style={{ paddingBlock: 0 }}>
                                    •
                                  </div>
                                )}
                                <span>{blog.readingTime} min read</span>
                                <div className="padding-6 flex items-center text-center" style={{ paddingBlock: 0 }}>
                                  •
                                </div>
                                <span>{formatUTCToLocalDate(blog.createdAt)}</span>
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between margin-14 padding-35 bdr-5" style={{ marginBottom: 0, marginInline: 0, borderInline: 0 }}>
                          <div className="flex items-center">
                            <div className="width-34 flex items-center">
                              <div className="select-none margin-19 relative flex items-center" style={{ marginLeft: 0, marginBlock: 0 }}>
                                <button onClick={handleAddClapsBtnClick} className={`select-none p-0 m-0 width-13 aspect-square opacity-[0.8] transition-all duration-300 linear ${userInfo?._id === blog.author._id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`} disabled={userInfo?._id === blog.author._id}>
                                  <Tooltip arrow placement="top" enterDelay={300} title={`${userInfo?._id === blog.author._id ? "You cannot applaud your own story" : "Clap"}`}>
                                    {clapDetails.myClaps <= 0 && <PiHandsClapping className="w-full h-full" />}
                                    {clapDetails.myClaps > 0 && <FaHandsClapping className="w-full h-full" />}
                                  </Tooltip>
                                </button>
                              </div>
                              {clapDetails.totalClaps > 0 && (
                                <div className="flex items-center text-center margin-19 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100" style={{ marginRight: 0, marginBlock: 0 }}>
                                  <p onClick={() => handleShowClapsUi()} className="font-4 color-6 custom-line-h-1 font-normal m-0 p-0 select-none">
                                    {clapDetails.totalClaps}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="inline-block">
                              <button className="flex items-center color-6 padding-23 opacity-[0.65] transition-all duration-300 linear cursor-pointer m-0 hover:opacity-100" style={{ paddingInline: 0 }}>
                                <Tooltip arrow placement="top" enterDelay={300} title="Respond">
                                  <div className="width-13 aspect-square">
                                    <FiMessageCircle className="w-full h-full" />
                                  </div>
                                  {blog.commentCount > 0 && (
                                    <p className="font-4 custom-line-h-1 font-normal m-0 p-0 flex items-center text-center">
                                      <span className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                                        {blog.commentCount}
                                      </span>
                                    </p>
                                  )}
                                </Tooltip>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                              <SaveBlog item={blog} handleToggleBlogSaveInParent={handleToggleBlogSaveInParent} />
                            </div>
                            <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                              <button className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                                <Tooltip arrow placement="top" enterDelay={300} title="Share">
                                  <div className="width-13 aspect-square">
                                    <GoShare className="w-full h-full" />
                                  </div>
                                </Tooltip>
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
                            <button onClick={handleAddClapsBtnClick} className={`width-13 aspect-square opacity-[0.7] transition-all duration-200 linear ${userInfo?._id === blog.author._id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-[0.9]"}`} disabled={userInfo?._id === blog.author._id}>
                              <Tooltip arrow placement="top" enterDelay={300} title={`${userInfo?._id === blog.author._id ? "You cannot applaud your own story" : "Clap"}`}>
                                {clapDetails.myClaps <= 0 && <PiHandsClapping className="w-full h-full" />}
                                {clapDetails.myClaps > 0 && <FaHandsClapping className="w-full h-full" />}
                              </Tooltip>
                            </button>
                          </div>
                          {clapDetails.totalClaps > 0 && (
                            <div className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                              <Tooltip arrow placement="top" enterDelay={300} title="View Claps">
                                <p onClick={() => handleShowClapsUi()} className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center cursor-pointer select-none opacity-[0.7] transition-all duration-200 linear hover:opacity-[0.9]">
                                  {clapDetails.totalClaps}
                                </p>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                    <div className="margin-12" style={{ marginRight: 0 }}>
                      <span className="inline-block">
                        <Tooltip arrow placement="top" enterDelay={300} title="Respond">
                          <div className="flex items-center color-6 opacity-[0.7] transition-all duration-200 linear cursor-pointer hover:opacity-[0.9]">
                            <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                              <div className="width-13 aspect-square">
                                <FiMessageCircle className="w-full h-full opacity-[0.9]" />
                              </div>
                            </div>
                            {blog.commentCount > 0 && (
                              <div>
                                <p className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center">{blog.commentCount}</p>
                              </div>
                            )}
                          </div>
                        </Tooltip>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                      <SaveBlog item={blog} handleToggleBlogSaveInParent={handleToggleBlogSaveInParent} />
                    </div>
                    <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                      <button className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-300 linear cursor-pointer hover:opacity-100">
                        <Tooltip arrow placement="top" enterDelay={300} title="Share">
                          <div className="width-13 aspect-square">
                            <GoShare className="w-full h-full" />
                          </div>
                        </Tooltip>
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
                      <Link to={`/profile/${blog.author.username}`} className="no-underline">
                        <div className="relative">
                          <img src={blog.author.profileImg} className="width-15 aspect-square rounded-full" />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col grow shrink-0 basis-auto">
                    <div className="width-37">
                      <Link to={`/profile/${blog.author.username}`} className="m-0 p-0 cursor-pointer flex items-center no-underline">
                        <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                          <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                            Written by <span className="capitalize">{blog.author.name}</span>
                          </span>
                        </h2>
                      </Link>
                      <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
                        <div className="grow-0 shrink-0 basis-auto">
                          <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                            <Link to={`/profile/${blog.author.username}/followers`} className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">{`${blog.author.followersCount} followers`}</Link>
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
                          <span className="margin-16" style={{ marginBlock: 0 }}>
                            <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
                          </span>
                          <Link to={`/profile/${blog.author.username}/following`} className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">
                            {`${blog.author.followingCount} following`}
                          </Link>
                        </div>
                      </div>
                      {blog.author.bio && (
                        <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                          <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                            <span className="break-words">{blog.author.bio}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="">
                    {userInfo?._id !== blog.author._id && !isFetchUserLoader && (
                      <div className="flex">
                        {followingUsers[blog.author._id] && (
                          <button onClick={unfollowAuthor} disabled={loaders.following} className="bdr17-hover padding-37 padding-38 border-radius-8 flex items-center justify-center m-0 cursor-pointer transition-all duration-700 ease">
                            <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Following</span>
                          </button>
                        )}
                        {!followingUsers[blog.author._id] && (
                          <button onClick={followAuthor} disabled={loaders.following} className="bdr-7 padding-37 padding-38 border-radius-8 flex items-center justify-center m-0 cursor-pointer">
                            <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                          </button>
                        )}
                      </div>
                    )}
                    {userInfo?._id === blog.author._id && (
                      <div className="flex">
                        <Link to="/me/settings#profileInformation" className="text-center no-underline rounded-full bdr-6 custom-bg-1 custom-px-2 custom-py-2 color-2 box-border inline-block custom-fs-1 custom-line-h-1 font-normal opacity-[0.95] transition-all duration-200 linear hover:opacity-100">
                          <div className="whitespace-nowrap">Edit profile</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* comments section */}
          <CommentsComp blog={blog} setBlog={setBlog} />
          {blog && <BlogRecommendComp blog={blog} />}
        </div>
      )}

      {/* full screen image view */}
      {isShowFullImg && (
        <div onClick={() => handleCloseFullImg()} className="w-screen h-screen max-w-screen max-h-screen fixed inset-0 z-[999] flex items-center justify-center custom-bg-4 select-none pointer-events-auto">
          <img onClick={() => handleCloseFullImg()} src={isShowFullImg} className="h-full max-w-full max-h-full cursor-zoom-out" />
        </div>
      )}

      {clapDetails.isShowClapsComp && <ShowClapsComp clapDetails={clapDetails} setClapDetails={setClapDetails} blog={blog} />}

      {!defaultLoader && !loaders.fetchBlog && isAnyErr && <NotFoundComp />}
    </>
  );
}

export default PostDetailsPage;
