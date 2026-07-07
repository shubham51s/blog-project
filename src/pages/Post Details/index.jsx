import React, { useContext, useEffect, useRef, useState } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsComp from "../../components/PostDetailsPageComponents/Comments comp";
import BlogRecommendComp from "../../components/PostDetailsPageComponents/Blog Recommendation";
import MoreOptionsComp from "../../components/PostDetailsPageComponents/MoreOptionsComp";
import { UserContext } from "../../context/userContext";
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
import { formatNumberCompact } from "../../utils/common";
import PublicationSection from "../../components/PostDetailsPageComponents/About/Publication";
import AuthorSection from "../../components/PostDetailsPageComponents/About/Author";
import ClapAction from "../../components/PostDetailsPageComponents/ClapAction";
import FollowBtn from "../../components/PostDetailsPageComponents/FollowBtn";
import ViewFullImage from "../../components/PostDetailsPageComponents/ViewImage";
import CommentAction from "../../components/PostDetailsPageComponents/CommentAction";
import CommentDrawer from "../../components/PostDetailsPageComponents/CommentDrawer";

function PostDetailsPage() {
  const rootUrl = window.location.origin;
  const { slug } = useParams();
  const { userInfo } = useContext(UserContext);
  const { requestHandler } = useRequestHandler();
  const [isShowFullImg, setIsShowFullImg] = useState(false);
  const fullImgRef = useRef(null);
  const [blog, setBlog] = useState(null);
  const [myPrevClapsCount, setMyPrevClapsCount] = useState(0);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loadingTimeout = useRef(null);
  const readingTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [recentComments, setRecentComments] = useState([]);
  const [clapDetails, setClapDetails] = useState({
    totalClaps: 0,
    myClaps: 0,
    skip: 0,
    clappedUsersCount: 0,
  });

  const handlMarkupParentClick = (e) => {
    const imageEl = e.target.closest("img");
    if (imageEl && imageEl.src) {
      setIsShowFullImg(imageEl.src);
    }
  };

  const getMyClapsCount = async (blogId) => {
    try {
      const response = await requestHandler(`/claps/${blogId}`);

      if (response?.status === 200) {
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
      const result = await response.json();

      if (response?.status === 200) {
        setClapDetails((prev) => ({ ...prev, myClaps: 0, totalClaps: blog.clapsCount - myPrevClapsCount >= 0 ? blog.clapsCount - myPrevClapsCount : 0 }));
        setBlog((prev) => ({ ...prev, clapsCount: prev.clapsCount - myPrevClapsCount >= 0 ? prev.clapsCount - myPrevClapsCount : 0 }));
        setMyPrevClapsCount(0);
        return true;
      } else {
        showToast(resul?.message || "Some error occured.");
      }

      return false;
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
      return false;
    }
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
    setIsLoading(true);
    try {
      const response = await requestHandler(`/blogs/${slug}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blog) {
        const blog = result.data.blog;
        setClapDetails((prev) => ({ ...prev, totalClaps: blog.clapsCount }));
        getMyClapsCount(blog._id);
        setBlog(blog);
        readBlog(blog._id);
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // to update saved blogs in parent also (to sync, not required in every parent but for some cases like blog details page where there are 2 button for save blog so to sync both)
  const handleToggleBlogSaveInParent = (type, listId) => {
    if (type === "add") setBlog((prev) => ({ ...prev, lists: [...prev.lists, listId] }));
    if (type === "remove") {
      setBlog((prev) => ({ ...prev, lists: prev.lists.filter((item) => item !== listId) }));
    }
  };

  const handleCopyLink = async () => {
    try {
      const text = `${rootUrl}/${blog.slug}`;
      await navigator.clipboard.writeText(text);
      showToast("Link copied");
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
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
      if (readingTimeout.current) clearTimeout(readingTimeout.current);
    };
  }, []);

  return (
    <>
      {!defaultLoader && !isLoading && blog && (
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
                              <img loading="lazy" src={blog.author.profileImg} className="width-11 aspect-square rounded-full" />
                            </Link>
                            <span className="custom-fs-1 custom-line-h-1 color-3 font-medium">
                              <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                <div className="flex items-center flex-nowrap">
                                  <Link to={`/profile/${blog.author.username}`} className="flex items-center custom-fs-1 custom-line-h-1 color-3 capitalize cursor-pointer hover:underline transition-all duration-75 ease">
                                    {blog.author.name}
                                  </Link>
                                  {userInfo?._id !== blog.author._id && <FollowBtn blog={blog} />}
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
                            <ClapAction clapDetails={clapDetails} setClapDetails={setClapDetails} blog={blog} myPrevClapsCount={myPrevClapsCount} />
                            <CommentAction blog={blog} setBlog={setBlog} setIsShowDrawer={setIsShowDrawer} />
                          </div>
                          <div className="flex items-center">
                            <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                              <SaveBlog item={blog} handleToggleBlogSaveInParent={handleToggleBlogSaveInParent} />
                            </div>
                            <div className="margin-12 shrink-0 inline-block" style={{ marginLeft: 0 }}>
                              <button onClick={handleCopyLink} className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                                <Tooltip arrow placement="top" enterDelay={300} title="Share">
                                  <div className="width-13 aspect-square">
                                    <GoShare className="w-full h-full" />
                                  </div>
                                </Tooltip>
                              </button>
                            </div>
                            <MoreOptionsComp blog={blog} setBlog={setBlog} clapDetails={clapDetails} undoMyClaps={undoMyClaps} />
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
                    <ClapAction clapDetails={clapDetails} setClapDetails={setClapDetails} blog={blog} myPrevClapsCount={myPrevClapsCount} />
                    <CommentAction blog={blog} setBlog={setBlog} setIsShowDrawer={setIsShowDrawer} />
                  </div>
                  <div className="flex items-center">
                    <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                      <SaveBlog item={blog} handleToggleBlogSaveInParent={handleToggleBlogSaveInParent} />
                    </div>
                    <div className="margin-18 grow-0 shrink-0 basis-auto" style={{ marginLeft: 0 }}>
                      <button onClick={handleCopyLink} className="padding-6 padding-36 m-0 opacity-[0.7] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                        <Tooltip arrow placement="top" enterDelay={300} title="Share">
                          <div className="width-13 aspect-square">
                            <GoShare className="w-full h-full" />
                          </div>
                        </Tooltip>
                      </button>
                    </div>
                    <MoreOptionsComp blog={blog} setBlog={setBlog} clapDetails={clapDetails} undoMyClaps={undoMyClaps} />
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* about author & publication */}
          <div className="margin-27" style={{ marginTop: 0, marginInline: 0 }}>
            <div className="flex justify-center">
              <div className="min-w-0 w-full max-width-2 margin-2">
                {/* publication details */}
                {blog.publication && <PublicationSection publication={blog.publication} />}
                <AuthorSection author={blog.author} />
              </div>
            </div>
          </div>

          {/* comments section */}
          <CommentsComp blog={blog} setBlog={setBlog} recentComments={recentComments} setRecentComments={setRecentComments} setIsShowDrawer={setIsShowDrawer} />
          {blog && <BlogRecommendComp blog={blog} />}
        </div>
      )}

      {(defaultLoader || isLoading) && <BlogDetailsSkeletonComp />}
      {!defaultLoader && !isLoading && !blog && <NotFoundComp />}
      {/* full screen image view */}
      {isShowDrawer && <CommentDrawer blog={blog} setBlog={setBlog} setIsShowDrawer={setIsShowDrawer} setRecentComments={setRecentComments} />}
      {isShowFullImg && <ViewFullImage img={isShowFullImg} setIsShowFullImg={setIsShowFullImg} />}
    </>
  );
}

export default PostDetailsPage;
