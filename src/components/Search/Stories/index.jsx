import React, { useContext, useEffect, useRef, useState } from "react";
import { defaultLoaderTime } from "../../../constants/constant";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useOutletContext } from "react-router-dom";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import BlogComp from "../../Home/Home components/Home Main Content/Blog Comp";
import BlogLoader from "../../Home/Home components/Home Main Content/Blog Comp/skeleton";
import NoContent from "../NoContent";

function StoriesSection() {
  const { requestHandler } = useRequestHandler();
  const search = useOutletContext();
  const limit = 5;
  const loaderTimeout = useRef(null);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getBlogs = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/blogs/search?search=${search}&cursor=${scroll.cursor}&limit=${limit}` : `/blogs/search?search=${search}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs?.length) {
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
    loadMore: getBlogs,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getBlogs();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {!defaultLoader && !isLoading && blogs.length > 0 && (
        <>
          {blogs.map((item) => (
            <BlogComp item={item} key={item._id} />
          ))}
          {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
        </>
      )}

      {!defaultLoader && !isLoading && blogs.length === 0 && <NoContent />}

      {(defaultLoader || isLoading) && Array.from({ length: 3 }).map((_, i) => <BlogLoader key={i} />)}
    </>
  );
}

export default StoriesSection;
