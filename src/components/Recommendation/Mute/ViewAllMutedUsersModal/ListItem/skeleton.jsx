import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";

function Loader() {
  return (
    <div className="margin60 flex">
      <div className="cursor-pointer list-none">
        <div className="relative">
          <Skeleton circle className="width-15 aspect-square rounded-full" />
        </div>
      </div>
      <div className="padding82 w-full flex justify-between gap-8">
        <div className="w-full flex flex-col justify-center">
          <div className="flex items-center">
            <div className="cursor-pointer m-0 no-underline p-0">
              <Skeleton width={80} height={30}></Skeleton>
            </div>
          </div>

          <div className="cursor-pointer m-0 no-underline p-0">
            <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
              <Skeleton width={130} height={15} />
            </div>
          </div>
        </div>

        <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
          <Skeleton width={80} height={35} className="border-radius-7"></Skeleton>
        </div>
      </div>
    </div>
  );
}

export default Loader;
