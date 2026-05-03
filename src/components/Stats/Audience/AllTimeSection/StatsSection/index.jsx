import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { CiCircleInfo } from "react-icons/ci";
import * as RadixTooltip from "@radix-ui/react-tooltip";

function StatsSection({ isLoading }) {
  return (
    <div className="margin56">
      {!isLoading && (
        <div className="margin58 flex items-baseline gap16 flex-wrap" style={{ marginInline: 0 }}>
          <div className="grow-0 shrink-0 basis-auto flex self-stretch">
            <div className="flex flex-col items-start">
              <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">23</h2>
              <div className="flex items-center justify-center padding94">
                <span className="whitespace-nowrap line-h-8 font-10 color-3 font-normal">Followers</span>
                <div className="grow-0 shrink-0 basis-auto text-left self-end margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                  <RadixTooltip.Provider delayDuration={50}>
                    <RadixTooltip.Root>
                      <RadixTooltip.Trigger asChild>
                        <div className="width84 aspect-square cursor-pointer line-h-8">
                          <CiCircleInfo className="w-full h-full" />
                        </div>
                      </RadixTooltip.Trigger>
                      <RadixTooltip.Portal>
                        <RadixTooltip.Content side="right" align="center" sideOffset={10} className="box-shadow-4 custom-bg-8 width-9 overflow-hidden padding-6">
                          <span className="color-3 custom-fs-1">Readers who follow you on Medium. This excludes deactivated, deleted, or suspended users.</span>
                          <RadixTooltip.Arrow className="fill-white" />
                        </RadixTooltip.Content>
                      </RadixTooltip.Portal>
                    </RadixTooltip.Root>
                  </RadixTooltip.Provider>
                </div>
              </div>
              <div className="line-h-8 font-10 color-3 font-normal">0 from last month</div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="margin58 flex items-baseline gap16 flex-wrap" style={{ marginInline: 0 }}>
          <div className="grow-0 shrink-0 basis-auto flex self-stretch">
            <div className="flex flex-col items-start">
              <div className="relative letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">
                000
                <div className="absolute inset-0 overflow-hidden">
                  <Skeleton width={3434} height={3434} />
                </div>
              </div>
              <div className="flex items-center justify-center padding94">
                <div className="relative whitespace-nowrap">
                  <span className="line-h-8 font-10 color-3 font-normal">Followers</span>
                  <div className="absolute inset-0 overflow-hidden">
                    <Skeleton width={3434} height={3434} />
                  </div>
                </div>
              </div>
              <div className="relative line-h-8 font-10 color-3 font-normal">
                0 from last month
                <div className="absolute inset-0 overflow-hidden">
                  <Skeleton width={3434} height={3434} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsSection;
