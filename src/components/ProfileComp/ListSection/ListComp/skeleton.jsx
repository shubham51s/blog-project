import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import MoreButton from "./MoreButton";
import Skeleton from "react-loading-skeleton";

function ListLoader() {
  return (
    <div className="relative w-full width55 z-0 flex justify-between margin57 bdr-5 border-radius-3">
      <div className="grow shrink-0 basis-0 padding-3 padding76 flex flex-col break-words justify-between">
        <div className="no-underline">
          <div className="flex opacity-[0.95] transition-all duration-75 linear hover:opacity-100">
            <div className="relative">
              <Skeleton circle className="height-12 aspect-square" />
            </div>
            <div className="flex items-center z-[1] padding50" style={{ paddingRight: 0 }}>
              <p className="height-6 break-words overflow-hidden line-clamp-1 text-ellipsis color-3 custom-fs-1 line20 font-normal m-0">
                <Skeleton width={90} height={450} />
              </p>
            </div>
          </div>
        </div>
        <div className="margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
          <h2 className="height-61 line-h-8 font-3 overflow-hidden line-clamp-2 font-bold text-ellipsis color-3 m-0">
            <Skeleton height={22} width={190} />
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex margin-6 items-center">
            <p className="font-4 color-4 line20 font-normal m-0">
              <Skeleton width={60} height={10} />
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="relative h-full flex overflow-hidden justify-end">
          <div className="relative bg-10 z-[3] bdr18" style={{ borderLeft: 0, borderBlock: 0 }}>
            <div className="h-full">
              <Skeleton className="height78 width79 bg-10" />
            </div>
          </div>
          <div className="relative z-[2] bg-10 margin63 padding-23 bdr18" style={{ paddingRight: 0, paddingBlock: 0, borderLeft: 0, borderBlock: 0 }}>
            <div className="h-full">
              <Skeleton className="height78 width79 bg-10" />
            </div>
          </div>
          <div className="relative z-[1] bg-10 margin64 padding-23" style={{ paddingRight: 0, paddingBlock: 0 }}>
            <div className="h-full">
              <Skeleton className="height78 width79 bg-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLoader;
