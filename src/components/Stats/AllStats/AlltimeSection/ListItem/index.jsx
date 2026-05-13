import React from "react";
import { Link } from "react-router-dom";
import { formatUTCToLocalDate } from "../../../../../utils/dates";

function ListItem({ blog }) {
  return (
    <tr>
      <td className="w-full padding83 padding62">
        <div className="h-full cursor-pointer m-0 p-0">
          <div className="width103">
            <div className="flex flex-col custom-gap-5">
              <Link to={`/me/stats/post/${blog._id}`} className="height90 font-bold font-10 color-3 line20 m-0 line-clamp-3">
                {blog.previewTitle}
              </Link>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex items-center flex-wrap">
                  <Link to={`/me/stats/post/${blog._id}`}>{blog.readingTime} min read</Link>
                  <Link to={`/me/stats/post/${blog._id}`} className="padding50">
                    <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                  </Link>
                  <Link to={`/me/stats/post/${blog._id}`}>{formatUTCToLocalDate(blog.createdAt)}</Link>
                  <Link to={`/me/stats/post/${blog._id}`} className="padding50">
                    <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                  </Link>
                  <Link to={`/${blog.slug}/${blog._id}`} className="underline cursor-pointer m-0 p-0">
                    View story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <Link to={`/me/stats/post/${blog._id}`} className="h-full cursor-pointer m-0 p-0">
          <span className="line-h-8 font-10 color-3 font-normal">{blog.views}</span>
        </Link>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <Link to={`/me/stats/post/${blog._id}`} className="h-full cursor-pointer m-0 p-0">
          <span className="line-h-8 font-10 color-3 font-normal">{blog.reads}</span>
        </Link>
      </td>
    </tr>
  );
}

export default ListItem;
