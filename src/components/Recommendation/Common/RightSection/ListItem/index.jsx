import React from "react";
import { Link } from "react-router-dom";

function ListItem() {
  return (
    <div className="w-full h-full">
      <div className="padding-42 flex items-start justify-between w-full">
        <div className="flex">
          <Link to="" className="cursor-pointer no-underline">
            <div className="relative">
              <img src="https://miro.medium.com/v2/resize:fill:64:64/1*1OJwhDGJkOyNc7-ya2TA7w.jpeg" className="width-11 aspect-square rounded-full" />
              <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
            </div>
          </Link>
          <div className="margin-16" style={{ marginBlock: 0 }}>
            <Link to="" className="cursor-pointer no-underline">
              <h2 className="height-15 break-words line-clamp-2 font-bold font-10 color-3 line20 m-0">The Thread Whisperer</h2>
            </Link>
            <Link to="" className="cursor-pointer no-underline">
              <div className="margin44 break-words">
                <p className="height-15 line-clamp-2 font-4 color-4 line20 font-normal m-0">Backend developer</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="width-23">
          <div className="inline-block">
            {true && (
              <button className="bdr-7 padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
                <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
              </button>
            )}
            {false && (
              <button className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
                <span className="color-3 custom-fs-1 line20 font-normal">Following</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
