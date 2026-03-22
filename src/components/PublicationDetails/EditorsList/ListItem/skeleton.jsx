import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";

function ListItemSkeleton() {
  return (
    <>
      <div className="relative">
        <div className="flex justify-between">
          <div className="w-full flex">
            <div className="margin-3">
              <div className="relative block">
                <Skeleton circle className="width-15 aspect-square rounded-full" />
              </div>
            </div>
            <div className="w-full width89 flex flex-col m-0 p-0 overflow-hidden">
              <div className="flex justify-between">
                <div>
                  <div>
                    <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                      <Skeleton width={150} height={25} className="line-clamp-2 height-15 font-10 font-medium color-3 line20 m-0"></Skeleton>
                    </div>
                  </div>
                  <Skeleton width={40} height={10} className="font-4 color-4 line20 font-normal m-0"></Skeleton>
                </div>
              </div>
              <div className="margin68" style={{ marginBottom: 0 }}>
                <Skeleton width={200} height={15} className="custom-fs-1 color-4 line20 font-normal m-0"></Skeleton>
              </div>
            </div>
          </div>

          <div className="margin-13 padding-33" style={{ marginRight: 0, paddingBottom: 0, paddingInline: 0 }}>
            <Skeleton width={80} height={35} className="padding-20 padding-28 border-radius-7 m-0"></Skeleton>
          </div>
        </div>
      </div>
      <div className="margin71 h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
    </>
  );
}

export default ListItemSkeleton;
