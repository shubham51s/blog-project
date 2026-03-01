import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function LoaderNew() {
  return (
    <div className="margin60 flex">
      <div className="margin60 flex">
        <div className="list-none">
          <div className="width-15 aspect-square rounded-full flex items-center justify-center">
            <div className="width-19 aspect-square">
              <Skeleton circle className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="padding82 w-full flex justify-between gap-12">
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center">
              <Skeleton width={80} height={30}></Skeleton>
            </div>
            <Skeleton width={170} height={20} className="cursor-pointer m-0 no-underline p-0"></Skeleton>
          </div>

          <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
            <Skeleton width={100} height={35} className="border-radius-7"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoaderNew;
