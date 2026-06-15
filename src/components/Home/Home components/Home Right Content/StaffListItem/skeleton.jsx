import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function StaffListItemLoader() {
  return (
    <div className="padding-14 last:!p-0" style={{ paddingTop: 0, paddingInline: 0 }}>
      <div className="h-full w-full">
        <div className="flex items-center margin-7" style={{ marginTop: 0, marginInline: 0 }}>
          <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
            <Skeleton circle className="height-12 aspect-square rounded-full overflow-hidden"></Skeleton>
          </div>
          <div className="padding-23 flex-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
            <div className="cursor-pointer no-underline p-0 m-0 flex items-center relative overflow-hidden">
              <p className="break-words text-ellipsis height-6 overflow-hidden color-3 font-4 custom-line-h-1 font-normal m-0 p-0 invisible">firstname last</p>
              <div className="absolute top-0">
                <Skeleton width={3434} height={3434} />
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-pointer m-0 p-0 no-underline">
          <div className="margin-7 relative overflow-hidden" style={{ marginTop: 0, marginInline: 0 }}>
            <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0 invisible">This Is What </h2>
            <div className="absolute top-0">
              <Skeleton width={3434} height={3434} />
            </div>
          </div>
          <div className="flex items-center custom-gap-2 overflow-hidden">
            <span className="font-4 color-4 custom-line-h-1 font-normal relative overflow-hidden">
              <span>blog date</span>
              <div className="absolute top-0">
                <Skeleton width={3434} height={343} />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffListItemLoader;
