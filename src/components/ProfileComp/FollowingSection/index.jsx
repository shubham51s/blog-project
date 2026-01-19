import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

function FollowingList({ item }) {
  const [author, setAuthor] = useState(item);

  return (
    <div className="margin60 flex">
      <Link to={`/profile/${item.followee.username}`} className="no-underline">
        <div className="relative">
          <img src={author.followee.profileImg} alt={author.followee.name} className="width-15 aspect-square box-border rounded-full" />
          <div className="absolute top-0 boxShadow7 width-15 aspect-square box-border rounded-full"></div>
        </div>
      </Link>

      <div className="padding82 w-full flex justify-between">
        <div className="w-full flex flex-col justify-center">
          <div className="flex items-center">
            <Link to="/" className="no-underline m-0 p-0">
              <h2 className="height-15 line-clamp-2 font-10 font-normal color-3 line20 m-0" title={author.followee.name}>
                {author.followee.name}
              </h2>
            </Link>
          </div>
          {author.followee.bio && (
            <Link to="/" className="cursor-pointer m-0 p-0 no-underline">
              <div className="whitespace-pre-wrap w-full max-w-full margin44 break-all">
                <p className="color-4 custom-fs-1 line20 font-normal m-0">{author.followee.bio}</p>
              </div>
            </Link>
          )}
        </div>

        <div className="margin-14 flex justify-end items-start" style={{ marginRight: 0, marginBlock: 0 }}>
          <button className="bdr17-hover padding-28 padding-20 border-radius-7 cursor-pointer flex items-center m-0 transition-all duration-500 ease opacity-100 hover:opacity-100">
            <div className="break-keep text-center inline-block">Following</div>
            <div className="text-right padding-23" style={{ paddingRight: 0, paddingBlock: 0 }}>
              <div className="width-19 aspect-square">
                <IoIosArrowDown className="w-full h-full" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowingList;
