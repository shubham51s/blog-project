import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import { defaultLoaderTime } from "../../../constants/constant";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListItemSkeleton from "./ListItem/skeleton";
import NoData from "../NoData";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function Blogs({ topic }) {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const hasFetched = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const fetchBlogsByCategory = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/blogs/topic/${topic._id}?cursor=${scroll.cursor}&limit=${limit}` : `/blogs/topic/${topic._id}?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchBlogsByCategory,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (topic && !hasFetched.current) {
      hasFetched.current = true;
      fetchBlogsByCategory();
    }

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, [topic]);

  return (
    <>
      {(isLoading || defaultLoader || blogs.length > 0) && (
        <div className="margin51">
          <div className="flex justify-center">
            <div className="w-full min-w-0 custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
              <div className="padding83">
                <h2 className="font-3 line-h-8 font-medium color-3 m-0">Latest</h2>
              </div>

              <div className="w-full margin-11 mx-auto flex flex-col justify-center" style={{ marginTop: 0 }}>
                <div>
                  <div className="grid grid-flow-row grid-cols-6 gap14">
                    {!isLoading && !defaultLoader && blogs.length > 0 && (
                      <>
                        {blogs.map((item) => (
                          <ListItem item={item} key={item._id} />
                        ))}
                        {scroll.hasMore && <div ref={sentinel} style={{ height: "2px" }}></div>}
                      </>
                    )}

                    {(isLoading || defaultLoader) && (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <ListItemSkeleton key={i} />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !defaultLoader && blogs.length === 0 && <NoData />}
    </>
  );
}

export default Blogs;
