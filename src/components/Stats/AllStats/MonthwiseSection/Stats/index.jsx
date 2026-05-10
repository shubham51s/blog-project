import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function StatsSection({ isLoading, stats }) {
  return (
    <div className="margin56">
      {!isLoading && (
        <div className="margin58 flex items-baseline gap16 flex-wrap" style={{ marginInline: 0 }}>
          <div className="grow-0 shrink-0 basis-auto flex self-stretch">
            <div className="flex flex-col items-center">
              <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">{stats.viewCount}</h2>
              <div className="flex items-center padding94">
                <div className="whitespace-nowrap">
                  <span className="line-h-8 font-10 color-3 font-normal">Views</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grow-0 shrink-0 basis-auto flex self-stretch">
            <div className="flex flex-col items-center">
              <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">{stats.readCount}</h2>
              <div className="flex items-center padding94">
                <div className="whitespace-nowrap">
                  <span className="line-h-8 font-10 color-3 font-normal">Reads</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grow-0 shrink-0 basis-auto flex self-stretch">
            <div className="flex flex-col items-center">
              <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">
                {stats.followerCount > 0 && <span>+</span>}
                {stats.followerCount}
              </h2>
              <div className="flex items-center padding94">
                <div className="whitespace-nowrap">
                  <span className="line-h-8 font-10 color-3 font-normal">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="margin58 flex items-baseline gap16 flex-wrap" style={{ marginInline: 0 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grow-0 shrink-0 basis-auto flex self-stretch">
              <div className="flex flex-col items-center relative">
                <div className="absolute inset-0 z-[999] overflow-hidden">
                  <Skeleton width={3434} height={3434} />
                </div>
                <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">203</h2>
                <div className="flex items-center padding94">
                  <div className="whitespace-nowrap">
                    <span className="line-h-8 font-10 color-3 font-normal">Followers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatsSection;
