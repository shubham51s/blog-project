import React, { useState } from "react";
import { Link } from "react-router-dom";

function FollowListItem({ item }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {false && (
        <div className="h-full w-full">
          <div className="w-full padding-18 flex items-start justify-between px-0" style={{ paddingTop: 0 }}>
            <div className="flex justify-center overflow-hidden">
              <Link className="shrink-0">
                <div className="relative">
                  <img loading="lazy" src={item.profileImg} className="width-11 aspect-square rounded-full" />
                  <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
                </div>
              </Link>
              <div className="margin-16" style={{ marginBlock: 0 }}>
                <Link>
                  <h2 className="height-15 font-bold line-clamp-2 break-words font-10 color-3 custom-line-h-1 m-0 p-0">{item.name}</h2>
                </Link>
                <Link>
                  <div className="margin44 break-words">
                    <p className="height-15 font-4 color-4 font-normal line20 m-0 line-clamp-2">Writer & Developer from Northern Germany. https://byburk.net</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="width-23 flex justify-end items-center">
              <div className="inline-block">
                <button className="flex items-center justify-center bdr-7 padding-20 padding-28 border-radius-7 bg-transparent cursor-pointer m-0">
                  <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-normal">
                    <span className="break-words inline-block">Follow</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {true && (
        <div className="h-full w-full">
          <div className="w-full padding-18 flex items-start justify-between px-0" style={{ paddingTop: 0 }}>
            <div className="flex justify-center overflow-hidden">
              <Link className="shrink-0">
                <div className="relative">
                  <img loading="lazy" src={item.profileImg} className="width-11 aspect-square br13" />
                  <div className="absolute top-0 width-11 aspect-square br13 boxShadow7"></div>
                </div>
              </Link>
              <div className="margin-16" style={{ marginBlock: 0 }}>
                <Link>
                  <h2 className="height-15 font-bold line-clamp-2 break-words font-10 color-3 custom-line-h-1 m-0 p-0">{item.name}</h2>
                </Link>
                <div className="margin84 margin83">
                  <p className="color-3 font-4 line20 font-normal m-0">Publication</p>
                </div>
                <Link>
                  <div className="margin44 break-words">
                    <p className="height-15 font-4 color-4 font-normal line20 m-0 line-clamp-2">Writer & Developer from Northern Germany. https://byburk.net</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="width-23 flex justify-end items-center">
              <div className="inline-block">
                {/* bdr17-hover */}
                <button className="flex items-center justify-center bdr-7 padding-20 padding-28 border-radius-7 bg-transparent cursor-pointer m-0">
                  <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-normal">
                    <span className="break-words inline-block">Follow</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FollowListItem;
