import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";

function StoryStatsBtn({ blog }) {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      {blog?.author?._id === userInfo._id && (
        <li className="custom-px-2 padding59">
          <Link to={`/me/stats/post/${blog._id}`} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
            <div className="flex items-start text-left">Story stats</div>
          </Link>
        </li>
      )}
    </>
  );
}

export default StoryStatsBtn;
