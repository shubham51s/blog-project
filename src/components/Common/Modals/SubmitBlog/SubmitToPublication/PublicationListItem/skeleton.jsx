import React from "react";
import Skeleton from "react-loading-skeleton";

function PublicationListSkeleton() {
  return (
    <button className="flex flex-col m-0 p-0 cursor-pointer border-radius-3 bdr-8">
      <div className="grow-0 shrink-0 basis-auto height-2 w-full flex flex-col overflow-hidden">
        <Skeleton width={3434} height={34343} />
      </div>

      <div className="grow shrink-0 basis-auto flex flex-col custom-gap-5 padding-18 padding-19">
        <div className="flex custom-gap-5">
          <div className="relative height-2 aspect-square overflow-hidden">
            <Skeleton width={34343} height={433434} className="border-radius-5" />
          </div>
          <div className="flex items-center justify-center text-left height-15 w-full overflow-hidden">
            <Skeleton width={80000} height={24} />
          </div>
        </div>
        <div className="grow shrink-0 basis-auto flex text-left height-15 w-full overflow-hidden">
          <Skeleton width={180} height={15} />
        </div>
        <div className="flex">
          <Skeleton width={50} height={10} className="font-4 line20 color-4 font-normal m-0"></Skeleton>
        </div>
      </div>
    </button>
  );
}

export default PublicationListSkeleton;
