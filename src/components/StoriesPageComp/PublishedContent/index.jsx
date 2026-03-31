import React, { useEffect, useRef, useState } from "react";
import BlogComp from "./BlogComp";
import { useRequestHandler } from "../../../hooks/requestHandler";
import SkeletonComp from "../skeleton";
import { defaultLoaderTime } from "../../../constants/constant";

function PublishContainer({ isInitialLoading, publishedCount }) {
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLoader, setDefaultLoader] = useState(true); // min loading time
  const loaderTimeout = useRef(null);

  const getPublishedBlogs = async () => {
    try {
      const response = await requestHandler(`/blogs/published?skip=${0}&limit=${50}`);

      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialLoading && publishedCount > 0) {
      setIsLoading(true);
      getPublishedBlogs(0);
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
                <th className="w-[18%] custom-fs-1 color-4 custom-line-h-1 font-medium">Publication</th>
                <th className="w-[18%] custom-fs-1 color-4 custom-line-h-1 font-medium">Status</th>
                <th className="w-[3%] padding-23 custom-fs-1 color-4 custom-line-h-1 font-medium" style={{ paddingBlock: 0 }}></th>
              </tr>
            </thead>

            <tbody className="m-0 no-first-row-border">
              {/* blogs list */}
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {/* loader */}
              {(defaultLoader || isLoading || isInitialLoading) && Array.from({ length: 3 }).map((_, i) => <SkeletonComp key={i} />)}
            </tbody>
          </table>
        </div>
      )}
      {!defaultLoader && !isLoading && !isInitialLoading && blogs.length === 0 && (
        <div className="flex flex-col justify-center items-center custom-gap-3 padding-19 padding71">
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">No published stories yet.</p>
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">We can't wait to see what you write!</p>
        </div>
      )}
    </>
  );
}

export default PublishContainer;
