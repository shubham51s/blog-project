import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "../../../components/ProfileComp/HomeSection/BlogComp";
import BlogLoader from "../../../components/ProfileComp/HomeSection/BlogComp/skeleton";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import List from "../List";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function Home() {
  const { user } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(null);
  const limit = 10;
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getUserBlogs = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/blogs/user/${user._id}?cursor=${scroll.cursor}&limit=${limit}` : `/blogs/user/${user._id}?limit=${limit}`;
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
    loadMore: getUserBlogs,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (user && !user.isNoBlogPublished && !hasFetched.current) {
      setIsLoading(true);
      getUserBlogs();
      hasFetched.current = true;
    }
  }, [user]);

  return (
    <>
      {(!user || (user && !user.isNoBlogPublished)) && (
        <div className="grow shrink-0 basis-auto">
          <div className="custom-px-2">
            <div>
              {(!user || isLoading) && Array.from({ length: 2 }).map((_, i) => <BlogLoader key={i} />)}
              {!isLoading && user && !user.isNoBlogPublished && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {!isLoading && user && !user.isNoBlogPublished && blogs.length > 0 && scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
            </div>
          </div>
        </div>
      )}

      {/* show lists components in home section when user has not published a single blog */}
      {user && user.isNoBlogPublished && <List />}
    </>
  );
}

export default Home;
