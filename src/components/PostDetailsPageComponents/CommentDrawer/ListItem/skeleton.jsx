import React from "react";
import Skeleton from "react-loading-skeleton";

function ListLoader() {
  return (
    <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
      <div className="h-full w-full">
        <div className="custom-p-y-1 padding-42" style={{ paddingInline: 0 }}>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="inline-block cursor-pointer relative">
                <div className="width-11 aspect-square box-border rounded-full align-middle overflow-hidden">
                  <Skeleton width={43434} height={34343} />
                </div>
              </div>
              <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                <div className="flex items-center">
                  <div className="cursor-pointer relative overflow-hidden">
                    <p className="break-words text-ellipsis color-3 custom-fs-1font-normal m-0 p-0 invisible">dfdflkd fsds sddl</p>
                    <div className="absolute inset-0">
                      <Skeleton width={3434343} height={98343434} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block">
              <div className="custom-px-2 padding-36 cursor-pointer m-0">
                <div className="width-13 aspect-square"></div>
              </div>
            </div>
          </div>
          <div className="margin-35 break-words" style={{ marginBottom: 0, marginInline: 0 }}>
            <div className="padding-27 relative overflow-hidden">
              <div className="color-3 custom-fs-1 line-h-8 font-normal invisible">dflkdfdl</div>
              <div className="absolute inset-0">
                <Skeleton width={343434} height={34343} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLoader;
