import React from "react";
import Skeleton from "react-loading-skeleton";

function ListItemLoader() {
  return (
    <tr>
      <td className="w-full padding83 padding62">
        <div className="h-full cursor-pointer m-0 p-0">
          <div className="width103">
            <div className="flex flex-col custom-gap-5">
              <div className="height90 font-bold font-10 color-3 line20 m-0 line-clamp-3 overflow-hidden">
                <Skeleton width={813430} height={25} />
              </div>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex items-center flex-wrap">
                  <Skeleton width={140} height={15} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <div className="h-full cursor-pointer m-0 p-0">
          <Skeleton width={35} height={25} />
        </div>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <div className="h-full cursor-pointer m-0 p-0">
          <Skeleton width={35} height={25} />
        </div>
      </td>
    </tr>
  );
}

export default ListItemLoader;
