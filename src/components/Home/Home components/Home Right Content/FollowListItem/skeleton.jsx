import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function FollowListItemLoader({ item }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-full w-full">
      <div className="w-full padding-18 flex items-start justify-between px-0" style={{ paddingTop: 0 }}>
        <div className="flex justify-center overflow-hidden">
          <div className="shrink-0">
            <Skeleton className="width-11 aspect-square rounded-full"></Skeleton>
          </div>
          <div className="margin-16" style={{ marginBlock: 0 }}>
            <div className="relative overflow-hidden">
              <h2 className="height-15 font-bold line-clamp-2 break-words font-10 color-3 custom-line-h-1 m-0 p-0 invisible">firsname last</h2>
              <div className="absolute top-0">
                <Skeleton width={3434} height={3434} />
              </div>
            </div>
            <div>
              <div className="margin44 break-words relative">
                <p className="height-15 font-4 color-4 font-normal line20 m-0 line-clamp-2 invisible">Writer & </p>
                <div className="absolute top-0">
                  <Skeleton width={343} height={3434} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="width-23 flex justify-end items-center">
          <div className="inline-block">
            <button className="flex items-center justify-center padding-20 padding-28 border-radius-7 bg-transparent cursor-pointer m-0 relative overflow-hidden">
              <span className="invisible">Follow</span>
              <div className="absolute top-0">
                <Skeleton width={3434} height={3434} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowListItemLoader;
