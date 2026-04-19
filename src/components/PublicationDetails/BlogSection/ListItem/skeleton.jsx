import React from "react";
import Skeleton from "react-loading-skeleton";

function ListItemSkeleton() {
  return (
    <div className="col-span-2 overflow-hidden">
      <article className="h-full">
        <div className="box-content h-full">
          <div className="h-full w-full">
            <div className="relative h-full flex flex-col custom-gap-2">
              <div className="w-full border-radius-5 bg-10 object-cover aspect-[2/1] object-center overflow-hidden">
                <Skeleton width={2343443434} height={3443434344} />
              </div>

              <div>
                <div className="w-full flex flex-col">
                  <div className="box-border break-words">
                    <div>
                      <div className="flex flex-col cursor-pointer m-0 p-0">
                        <div className="height84 line-clamp-4 font-3 line-h-8 font-semibold color-3 m-0 overflow-hidden">
                          <Skeleton width={200} height={30} />
                        </div>
                        <div className="padding72" style={{ paddingBottom: 0 }}>
                          <div className="height-15 line20 font-10 line-clamp-2 color-3 font-normal m-0">
                            <Skeleton width={4420} height={20} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="font-4 color-4 line20 font-normal">
                      <div className="margin-7 flex items-center" style={{ marginBottom: 0, marginInline: 0 }}>
                        <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <div className="width86 aspect-square rounded-full overflow-hidden">
                            <Skeleton width={3434} height={3434} />
                          </div>
                        </div>
                        <div>
                          <div className="break-all height-6 font-4 color-4 line20 font-normal m-0 transition-all duration-75 ease">
                            <Skeleton width={30} height={10} />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Skeleton width={120} height={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ListItemSkeleton;
