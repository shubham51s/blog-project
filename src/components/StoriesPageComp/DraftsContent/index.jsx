import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "./BlogComp";
import SkeletonComp from "../skeleton";
import { Link } from "react-router-dom";

function DraftContainer({ draftsCount, setDraftsCount }) {
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true); // min loading time
  const minLoadingTimeout = useRef(null);

  const getPublishedBlogs = async (skip) => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/blogs/published?skip=${blogs.length}&limit=${50}`);

      const result = await response.json();

      if (response?.status === 200) {
        if (skip === 0) {
          setBlogs(result?.data?.blogs || []);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPublishedBlogs(0);

    if (minLoadingTimeout.current) clearTimeout(minLoadingTimeout.current);

    minLoadingTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
    }, 800);

    return () => {
      if (minLoadingTimeout.current) clearTimeout(minLoadingTimeout.current);
    };
  }, []);

  return (
    <>
      {(defaultLoader || isLoading || blogs.length > 0) && (
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
              {blogs.length > 0 && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {blogs.length === 0 && Array.from({ length: 3 }).map((_, i) => <SkeletonComp key={i} />)}
            </tbody>
          </table>
        </div>
      )}
      {!defaultLoader && !isLoading && blogs.length === 0 && (
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
