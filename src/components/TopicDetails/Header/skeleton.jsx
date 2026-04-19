import React from "react";
import Skeleton from "react-loading-skeleton";

function HeaderLoader() {
  return (
    <div className="flex justify-center">
      <div className="margin-12 margin70 w-full min-w-0 custom-max-w-1">
        <div className="flex flex-col items-center">
          <Skeleton width={250} height={35} className="letter-spacing-7 line-h-10" />

          <div className="font-10 margin-37 color-4 margin75 font-medium flex justify-center">
            <Skeleton width={150} height={25} className="margin-37" />
          </div>

          <Skeleton width={80} height={35} className="border-radius-8" />
        </div>
      </div>
    </div>
  );
}

export default HeaderLoader;
