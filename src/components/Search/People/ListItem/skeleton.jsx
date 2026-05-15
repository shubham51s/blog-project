import React from "react";
import Skeleton from "react-loading-skeleton";

function ListLoader() {
  return (
    <div className="w-full margin77" style={{ marginTop: 0 }}>
      <div>
        <div className="padding87">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="width-15 aspect-square rounded-full overflow-hidden">
                  <Skeleton width={34343} height={34343} />
                </div>
              </div>
              <div className="padding95 padding96">
                <div className="flex items-center">
                  <div className="relative overflow-hidden">
                    <h2 className="font-10 font-semibold color-3 line20 m-0">
                      <span className="truncate">User name</span>
                    </h2>
                    <div className="absolute inset-0">
                      <Skeleton width={34344} height={34344} />
                    </div>
                  </div>
                </div>
                <div className="margin44">
                  <div className="relative overflow-hidden">
                    <p className="height-15 color-4 custom-fs-1 line20 font-normal m-0 line-clamp-2">Founder enjoyalgorithms.com | IIT | Super 30 | Educator | A learner who enjoys computer science, programming, algorithms, and problem-solving.</p>
                    <div className="absolute inset-0">
                      <Skeleton width={3434} height={3434} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="width108">
              <button className="custom-px-2 padding-38 border-radius-8 cursor-pointer relative overflow-hidden">
                <span className="color-3 custom-fs-1 line20 font-normal break-keep">Following</span>
                <div className="absolute inset-0">
                  <Skeleton width={3434} height={3434} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLoader;
