import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import * as RadixTooltip from "@radix-ui/react-tooltip";

function StatsSection({ blog }) {
  return (
    <div className="flex flex-col gap15 margin-22" style={{ marginInline: 0 }}>
      <div>
        <div className="padding61">
          <h2 className="line-h-8 font-3 font-semibold color-3 m-0">Reach funnel</h2>
          <p className="font-10 line-h-8 color-4 font-normal m-0">How your story has performed since it was published.</p>
        </div>
        <div className="w-full flex items-stretch">
          <div className="grow shrink basis-auto max-w-[calc(33.3333%)] bdr-8 br15" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <div className="padding80 padding61 padding-7">
              <div className="flex flex-col-reverse justify-between items-start custom-gap-3">
                <div>
                  <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">{blog.views}</h2>
                  <div className="inline-flex items-center custom-gap-1">
                    <div className="font-10 line-h-8 color-3 font-normal">Views</div>
                  </div>
                </div>
                <div className="flex items-center custom-gap-1 border-radius-3 bg-10 height94"></div>
              </div>
              <div className="custom-px-2" style={{ paddingBottom: 0 }}>
                <div className="color-4 custom-fs-1 line20 font-normal">Landed on your full story through web.</div>
              </div>
            </div>
          </div>

          <div className="grow shrink basis-auto max-w-[calc(33.3333%)] bdr-8 br15" style={{ borderLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <div className="padding80 padding61 padding-7">
              <div className="flex flex-col-reverse justify-between items-start custom-gap-3">
                <div>
                  <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">{blog.reads}</h2>
                  <div className="inline-flex items-center custom-gap-1">
                    <div className="font-10 line-h-8 color-3 font-normal">Reads</div>
                  </div>
                </div>
                <div className="flex items-center custom-gap-1 border-radius-3 bg-10 height94 padding-6">
                  <span className="font-4 color-3 line20 font-normal">{Math.round((blog.reads / blog.views) * 100)}% Read ratio</span>
                  <div className="inline">
                    <RadixTooltip.Provider delayDuration={50}>
                      <RadixTooltip.Root>
                        <RadixTooltip.Trigger asChild>
                          <div className="width-19 aspect-square cursor-pointer">
                            <CiCircleInfo className="w-full h-full" />
                          </div>
                        </RadixTooltip.Trigger>
                        <RadixTooltip.Portal>
                          <RadixTooltip.Content side="right" align="center" sideOffset={10} className="box-shadow-4 custom-bg-8 width-9 overflow-hidden padding-6">
                            <span className="color-3 custom-fs-1">The percent of people who read your story for at least 30 seconds.</span>
                            <RadixTooltip.Arrow className="fill-white" />
                          </RadixTooltip.Content>
                        </RadixTooltip.Portal>
                      </RadixTooltip.Root>
                    </RadixTooltip.Provider>
                  </div>
                </div>
              </div>
              <div className="custom-px-2" style={{ paddingBottom: 0 }}>
                <div className="color-4 custom-fs-1 line20 font-normal">Read your story for at least 30 seconds.</div>
              </div>
            </div>
          </div>
          {/* <div className=""></div> */}
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
