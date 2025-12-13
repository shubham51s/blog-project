import React from "react";
import Skeleton from "react-loading-skeleton";

function BlogDetailsSkeletonComp() {
  return (
    <div className="custom-bg-8 width-17 flex justify-center">
      {/* home content */}
      <div className="flex">
        {/* width need to check later given different width than original */}
        <div className="max-width-2 overflow-hidden grow shrink basis-auto">
          <div>
            <div className="margin-28" style={{ marginTop: 0, marginInline: 0 }}>
              <article>
                <div className="break-words margin-25" style={{ marginInline: 0, marginBottom: 0 }}>
                  <div className="flex justify-center">
                    <div className="w-full min-w-0 max-width-2 margin-12">
                      <div>
                        <h1 className="letter-spacing-7 line-h-10 font-12 margin-30 mt-0 font-bold color-3">
                          <Skeleton height={44} width={20034} />
                        </h1>
                      </div>
                      <div>
                        <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">
                          <Skeleton height={30} width={343} />
                        </h2>
                        <div className="w-full">
                          <div className="flex items-center custom-gap-5">
                            <div className="flex items-center custom-gap-5 ">
                              <div className="flex items-baseline">
                                <div className="width-11 aspect-square">
                                  <Skeleton circle className="w-full h-full" />
                                </div>
                              </div>
                              <span className="custom-fs-1 custom-line-h-1 color-3 font-normal">
                                <div className="flex items-center margin-23" style={{ marginTop: 0, marginInline: 0 }}>
                                  <div className="flex items-center flex-nowrap">
                                    <div className="flex items-center custom-fs-1 custom-line-h-1 color-3">
                                      <Skeleton width={343343} height={20} />
                                    </div>
                                    <div className="inline-block width-33">
                                      <Skeleton width={343} height={34} />
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {Array.from({ length: 4 }).map((_, i) => (
                        <div className="flex flex-col mt-10" key={i}>
                          <Skeleton className="margin-31" width={3434} height={30} />
                          <Skeleton className="margin-31" width={3434} height={15} />
                          <Skeleton className="margin-31" width={3434} height={20} />
                          <Skeleton className="margin-31" width={3434} height={25} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailsSkeletonComp;
