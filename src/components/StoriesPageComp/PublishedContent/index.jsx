import React, { useEffect, useState } from "react";
import BlogComp from "./BlogComp";
import { useRequestHandler } from "../../../hooks/requestHandler";

function PublishContainer({ publishedCount, setPublishedCount, isInitialLoading, getAllStoriesCount }) {
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isInitialLoading) {
      getAllStoriesCount();
    } else if (publishedCount > 0) {
      getPublishedBlogs(0);
    }
  }, [isInitialLoading]);

  return (
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
          {blogs.map((item) => (
            <BlogComp key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublishContainer;
