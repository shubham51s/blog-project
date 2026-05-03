import React from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { PiHandsClapping } from "react-icons/pi";
import { PiHandsClappingBold } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";

function BlogDetails() {
  return (
    <div>
      <div className="margin-27" style={{ marginInline: 0 }}>
        <Link className="cursor-pointer underline m-0 p-0">
          <span className="flex items-center flex-nowrap custom-gap-3">
            <div className="width-13 aspect-square">
              <GoArrowLeft className="w-full h-full" />
            </div>
            <span className="color-3 custom-fs-1 line20 font-normal">Back to Story Stats</span>
          </span>
        </Link>
      </div>

      <div className="mr-auto">
        <div className="flex">
          <Link className="cursor-pointer">
            <div className="height92 width106 margin58" style={{ marginLeft: 0, marginBlock: 0 }}>
              <img src="https://miro.medium.com/v2/resize:fit:0/1*mikrP1WrKNoVdyzDoQ80Yw.jpeg" className="w-full h-full" />
            </div>
          </Link>
          <div className="width105">
            <div className="break-words">
              <Link to="" className="cursor-pointer">
                <h2 className="letter-spacing10 height93 line21 font15 line-clamp-3 color-3 m-0 font-semibold">The Single Most Prevalent AI Writing Tell (Spoiler Alert — It's Not Em Dashes)</h2>
              </Link>
            </div>
            <div className="font-4 color-4 line20 font-normal">
              <div className="padding63 flex items-center">
                <span>1 min read</span>
                <div className="margin73">
                  <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                </div>
                <span>Apr 15, 2026</span>
              </div>
            </div>
            <div className="flex items-center padding63">
              <Link to="" className="flex items-center color-3 transition-all duration-75 ease opacity-[0.75] hover:opacity-100">
                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                  <div className="width86 aspect-square">
                    <PiHandsClappingBold className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <p className="font-4 color-3 line20 font-normal m-0 p-0">25</p>
                </div>
              </Link>
              <Link to="" className="margin-18 flex items-center color-3 transition-all duration-75 ease opacity-[0.75] hover:opacity-100" style={{ marginRight: 0 }}>
                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                  <div className="width86 aspect-square">
                    <FaRegComment className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <p className="font-4 color-3 line20 font-normal m-0 p-0">3</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
