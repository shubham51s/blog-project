import React, { useEffect, useRef, useState } from "react";
import BlogComp from "./BlogComp";
import { useRequestHandler } from "../../../hooks/requestHandler";
import SkeletonComp from "../skeleton";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { defaultLoaderTime } from "../../../constants/constant";

function Published({ isInitialLoading, publication }) {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true); // min loading time
  const loaderTimeout = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getApprovalPendingBlogs = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));
    try {
      const url = scroll.cursor ? `/publication/approved/${publication._id}?cursor=${scroll.cursor}&limit=${limit}` : `/publication/approved/${publication._id}?limit=${limit}`;
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
    loadMore: getApprovalPendingBlogs,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (!isInitialLoading && publication) {
      getApprovalPendingBlogs();
    }

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, [isInitialLoading]);

  return (
    <>
      {(defaultLoader || isLoading || isInitialLoading || blogs.length > 0) && (
        <div>
          <table className="border-0 border-collapse table-fixed w-full h-fit">
            <thead className="table-header-group text-left relative">
              <tr className="table-row">
                <th className="custom-py-2 w-[60%] custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingLeft: 0 }}>
                  Latest
                </th>
                <th className="w-[18%] custom-fs-1 color-4 custom-line-h-1 font-medium">All writers</th>
                <th className="w-[18%] custom-fs-1 color-4 custom-line-h-1 font-medium">Status</th>
                <th className="w-[3%] padding-23 custom-fs-1 color-4 custom-line-h-1 font-medium" style={{ paddingBlock: 0 }}></th>
              </tr>
            </thead>

            <tbody className="m-0 no-first-row-border">
              {/* blogs list */}
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.length > 0 && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.length > 0 && scroll.hasMore && <tr ref={sentinel} style={{ height: "1px" }}></tr>}
              {/* loader */}
              {(defaultLoader || isLoading || isInitialLoading) && Array.from({ length: 3 }).map((_, i) => <SkeletonComp key={i} />)}
            </tbody>
          </table>
        </div>
      )}
      {!defaultLoader && !isLoading && !isInitialLoading && blogs.length === 0 && (
        <div className="flex flex-col justify-center items-center custom-gap-3 padding-19 padding71">
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">No submissions yet.</p>
        </div>
      )}
    </>
  );
}

export default Published;
