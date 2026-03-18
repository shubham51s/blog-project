import React from "react";
import { Link } from "react-router-dom";

function ListItem() {
  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-between items-start padding-42">
        <div className="flex">
          <Link to="" className="cursor-pointer">
            <div className="relative">
              <img src="https://miro.medium.com/v2/resize:fill:64:64/0*AbhaXOwX9-XpKPtX" alt="" className="width-11 aspect-square rounded-full" />
              <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
            </div>
          </Link>
          <div className="margin-9" style={{ marginBlock: 0 }}>
            <Link to="" className="cursor-pointer m-0 p-0">
              <h2 className="font-semibold break-words line-clamp-2 height-15 font-10 color-3 line20 m-0">shubhams1234</h2>
            </Link>
            <Link to="" className="cursor-pointer m-0 p-0">
              <div className="margin44 break-words">
                <p className="height-15 font-4 color-4 line20 font-normal m-0 line-clamp-2">Software developer</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="width-23">
          <div className="inline-block">
            {false && (
              <button className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
                <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
              </button>
            )}
            {true && (
              <button className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
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
