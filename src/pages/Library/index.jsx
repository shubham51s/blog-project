import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { IoLockClosed } from "react-icons/io5";
import { useApi } from "../../hooks/useApi";
import BlogComp from "../../components/LibraryComp/BlogComp";
import Loader from "./skeleton";
import { CiBookmarkPlus } from "react-icons/ci";
import { getFullDate } from "../../utils/getFullDate";

function SavedBlogsPage() {
  const { userInfo } = useContext(UserContext);
  const { fetchRequest } = useApi();
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const initialLoaderTimeout = useRef(null);
  const [loaders, setLoaders] = useState({
    isLoading: true,
    isInitialLoader: true,
  });
  const limit = 10;

  const getBookmarkedBlogsList = async (skip) => {
    try {
      const response = await fetchRequest(`/bookmarks?skip=${skip}&limit=${limit}`, "GET");

      const result = await response.json();

      if (loaders.isLoading) setLoaders((prev) => ({ ...prev, isLoading: false }));

      if (response?.status === 200) {
        if (skip === 0) {
          setBlogs(result?.data?.blogs || []);
        } else {
          setBlogs((prev) => [...prev, ...(result?.data?.blogs || [])]);
        }
      }
    } catch (err) {
      console.error(err);
      if (loaders.isLoading) setLoaders((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const getMyBookmarksCount = async () => {
    try {
      const response = await fetchRequest("/bookmarks/count", "GET");

      const result = await response.json();

      if (response?.status === 200) {
        if (result?.data?.count > 0) {
          setBookmarksCount(result.data.count);
          getBookmarkedBlogsList(0);
        } else {
          setLoaders((prev) => ({ ...prev, isLoading: false }));
        }
      } else {
        setLoaders((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      console.error(err);
      setLoaders((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleRemoveBookmarkedBlog = (id) => {
    const updatedBlogs = blogs.filter((item) => item._id !== id);
    setBlogs(updatedBlogs);
    setBookmarksCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    getMyBookmarksCount();

    if (initialLoaderTimeout.current) clearTimeout(initialLoaderTimeout.current);

    // minimum loading time (show minimum loader)
    initialLoaderTimeout.current = setTimeout(() => {
      setLoaders((prev) => ({ ...prev, isInitialLoader: false }));
    }, 1000);
  }, []);

  return (
    <>
      {!loaders.isLoading && !loaders.isInitialLoader && (
        <div className="flex flex-col min-h-screen custom-bg-8 font-normal overflow-x-hidden overflow-y-auto max-h-full">
          <div className="flex justify-center">
            {userInfo && (
              <div className="min-w-0 w-full max-width-2 margin-12 my-0">
                <header className="margin54 margin55 flex items-start justify-between">
                  <div className="flex">
                    <div className="margin-3">
                      <Link className="cursor-pointer m-0 p-0 no-underline">
                        <div className="relative">
                          <img className="width-15 aspect-square rounded-full" src={userInfo.profileImg} />
                          <div className="absolute top-0 cursor-pointer width-15 aspect-square rounded-full boxShadow7"></div>
                        </div>
                      </Link>
                    </div>
                    <div>
                      <div className="line-h-8 font-10 color-3 font-normal">
                        <div className="margin-19 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                          <Link className="cursor-pointer m-0 p-0 no-underline">
                            <div className="flex items-center">{userInfo.username}</div>
                          </Link>
                        </div>
                      </div>
                      {blogs.length > 0 && (
                        <div className="flex items-center flex-wrap">
                          <div className="inline-flex items-center">
                            <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0">
                              <span>{getFullDate(blogs[0].updatedAt)}</span>
                            </p>
                            <span className="margin-9 flex items-center" style={{ marginBlock: 0 }}>
                              <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">.</span>
                            </span>
                            {bookmarksCount > 0 && (
                              <div>
                                <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0">{`${bookmarksCount > 1 ? bookmarksCount + " stories" : bookmarksCount + " story"}`}</p>
                              </div>
                            )}
                            <div className="padding50" style={{ paddingRight: 0 }}>
                              <div className="margin49 align-middle width68 aspect-square color-4" style={{ marginTop: 0, marginInline: 0 }}>
                                <IoLockClosed className="w-full h-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </header>
              </div>
            )}
          </div>

          <div>
            <div className="padding67" style={{ paddingTop: 0, paddingInline: 0 }}>
              {blogs.length > 0 && blogs.map((item) => <BlogComp key={item._id} item={item.blog} bookmarkId={item._id} handleRemoveBookmarkedBlog={handleRemoveBookmarkedBlog} />)}

              {blogs.length === 0 && (
                <div className="flex justify-center">
                  <div className="w-full min-w-0 max-width-2 margin-12">
                    <div className="padding68 padding69 text-center">
                      <div className="padding55 bdr-8 flex items-center">
                        <div className="font-10 color-4 font-normal m-0">
                          Add your favorite stories to your list. Simply click the{" "}
                          <div className="custom-h-2 aspect-square inline-block mb-[-7px]">
                            <CiBookmarkPlus className="w-full h-full" />
                          </div>{" "}
                          on any Medium story to get started.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* loader */}
      {(loaders.isLoading || loaders.isInitialLoader) && <Loader />}
    </>
  );
}

export default SavedBlogsPage;
