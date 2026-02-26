import React from "react";
import { Link } from "react-router-dom";
import { RiFileList2Line } from "react-icons/ri";

function TopicListItem() {
  return (
    <div className="margin60 flex">
      <Link className="cursor-pointer list-none">
        <div className="width-15 aspect-square rounded-full bg-11 flex items-center justify-center">
          <div className="width-19 aspect-square">
            <RiFileList2Line className="w-full h-full" />
          </div>
        </div>
      </Link>
      <div className="padding82 w-full flex justify-between">
        <div className="w-full flex flex-col">
          <div className="flex items-center">
            <Link className="cursor-pointer m-0 no-underline p-0">
              <h2 className="height-15 font-10 font-semibold color-3 line20 m-0 line-clamp-2">Tracy Cranford</h2>
            </Link>
          </div>
          <Link className="cursor-pointer m-0 no-underline p-0">
            <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
              <p className="custom-fs-1 color-4 line20 font-normal m-0">415K stories · 134K writers</p>
            </div>
          </Link>
        </div>

        <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
          {true && (
            <button className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
              <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Following</div>
            </button>
          )}
          {false && (
            <button className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
              <div className="color-3 custom-fs-1 line20 font-normal">Follow</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicListItem;
