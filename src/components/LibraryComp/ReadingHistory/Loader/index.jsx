import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function Loader() {
  return (
    <>
      <div>
        <div className="margin51">
          <article>
            <div className="box-content">
              <div className="w-full h-full">
                <div className="flex relative">
                  <div className="w-full">
                    <div className="flex items-center justify-between margin-21 custom-gap-2" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="flex items-center">
                        <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <div className="no-underline cursor-pointer">
                            <div className="relative">
                              <Skeleton circle className="width86 aspect-square rounded-full" />
                            </div>
                          </div>
                        </div>
                        <Skeleton height={20} width={110} />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="break-words grow shrink basis-auto overflow-hidden">
                        <div>
                          <div className="flex flex-col cursor-pointer no-underline m-0 p-0">
                            <Skeleton height={35} width={5000} className="letter-spacing-6line-clamp-3 height-19 line-h-9 font-11 font-bold color-3 m-0"></Skeleton>
                            <div className="custom-px-2" style={{ paddingBottom: 0 }}>
                              <Skeleton height={25} width={400} className="line-clamp-2 height-15 font-10 color-4 line20 font-normal m-0"></Skeleton>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="w-full padding72" style={{ paddingBottom: 0 }}>
                            <span className="font-4 color-4 line20 font-normal">
                              <div className="height-50 flex justify-between">
                                <div className="flex items-center custom-gap-2">{/* <Skeleton height={20} width={100} /> */}</div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="block margin-25 shrink-0" style={{ marginRight: 0, marginBlock: 0 }}>
                        <Skeleton className="border-radius-5 align-middle width-29 height-52" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="margin-11 h-0 bdr-5 w-full" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default Loader;
