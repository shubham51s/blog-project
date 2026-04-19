import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";

function HeaderLoader() {
  return (
    <div className="flex flex-col gap11 bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
      <div className="height-55 w-full custom-bg-8"></div>
      <div className="flex justify-center">
        <div className="w-full min-w-0 custom-max-w-1 custom-m-x-1">
          <div className="margin54 flex items-start">
            <div className="relative grow-0 shrink-0 custom-m-r">
              <div className="width70 aspect-square border-radius-5 overflow-hidden">
                <Skeleton width={343434} height={343443} />
              </div>
            </div>

            <div className="grow flex flex-col custom-gap-5 custom-m-r overflow-hidden">
              <div>
                <Skeleton width={140} height={35}></Skeleton>
              </div>
              <div className="flex items-center">
                <Skeleton width={220} height={20} />
              </div>
            </div>

            <div className="grow-0 shrink-0">
              <button className="flex items-center justify-center">
                <Skeleton width={90} height={38} className="border-radius-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLoader;
