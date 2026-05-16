import React from "react";
import Skeleton from "react-loading-skeleton";

function BlogLoader() {
  return (
    <div className={`margin51 first:!mt-0 overflow-hidden transition-all duration-500 ease-out height-18`}>
      <div className="w-full margin-14" style={{ marginBottom: 0, marginInline: 0 }}>
        <article>
          <div className="box-content">
            <div className="w-full h-full">
              <div className="flex relative">
                <div className="w-full">
                  <div className="flex w-full">
                    <div className="margin-21 flex items-center w-full" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <div className="relative z-[2] no-underline ">
                          <div className="height-12 aspect-square">
                            <Skeleton circle className="w-full aspect-square" />
                          </div>
                        </div>
                      </div>
                      <div className="z-[2] relative  flex items-center grow min-w-0">
                        <div className="truncate w-[20%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1 max-w-[50%] overflow-hidden">
                          <Skeleton height={30} width={34343} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* blog section */}
                  <div className="flex">
                    {/* left section */}
                    <div className="grow shrink basis-auto max-w-[60%] overflow-hidden" style={{ wordBreak: "break-word" }}>
                      <div>
                        <div className="flex flex-col static ">
                          <h2 className="letter-spacing-6 height-19 max-w-[80%] overflow-hidden">
                            <Skeleton height={35} width={34343} />
                          </h2>
                          <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                            <h3 className="height-15 overflow-hidden text-ellipsis font-10 color-4 custom-line-h-1 font-normal m-0 p-0">
                              <Skeleton height={25} width={34343} />
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="w-[50%] padding-25 overflow-hidden" style={{ paddingBottom: 0, paddingInline: 0 }}>
                          <Skeleton height={20} width={3434} />
                        </div>
                      </div>
                    </div>
                    <div className="margin-25 shrink-0 " style={{ marginRight: 0, marginBlock: 0 }}>
                      <div className="bg-10 border-radius-5 align-middle width-29 height-52 overflow-hidden">
                        <Skeleton className="w-full aspect-square" />
                      </div>
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
  );
}

export default BlogLoader;
