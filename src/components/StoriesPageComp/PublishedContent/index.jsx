import React, { useEffect, useState } from "react";
import BlogComp from "./BlogComp";

function PublishContainer({ publishedCount, setPublishedCount, isInitialLoading, getAllStoriesCount }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (isInitialLoading) {
      getAllStoriesCount();
    } else {
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
          {Array.from({ length: 7 }).map((_, i) => (
            <BlogComp key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublishContainer;
