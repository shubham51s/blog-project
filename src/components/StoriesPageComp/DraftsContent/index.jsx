import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "./BlogComp";
import SkeletonComp from "../skeleton";
import { Link } from "react-router-dom";
import { defaultLoaderTime } from "../../../constants/constant";

function DraftContainer({ isInitialLoading, draftsCount }) {
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLoader, setDefaultLoader] = useState(true); // min loading time
  const loaderTimeout = useRef(null);

  const getDraftBlogsList = async () => {
    try {
      const response = await requestHandler(`/draft/all?skip=${0}&limit=${50}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.drafts) {
        setBlogs(result.data.drafts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialLoading && draftsCount > 0) {
      setIsLoading(true);
      getDraftBlogsList();
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
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {(defaultLoader || isLoading || isInitialLoading) && Array.from({ length: 3 }).map((_, i) => <SkeletonComp key={i} />)}
            </tbody>
          </table>
        </div>
      )}
      {!defaultLoader && !isLoading && !isInitialLoading && !blogs.length && (
        <div className="flex flex-col justify-center items-center custom-gap-3 padding-19 padding71">
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">No stories in draft.</p>
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">
            Why not{" "}
            <Link to="/new-story" className="underline cursor-pointer m-0 p-0">
              start writing one?
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default DraftContainer;
