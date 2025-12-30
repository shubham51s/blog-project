import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonComp() {
  return (
    <tr className="bdr-5" style={{ borderInline: 0, borderBottom: 0 }}>
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="w-full min-w-0 overflow-hidden relative cursor-pointer">
          <div className="margin58 width69 flex items-start custom-gap-2" style={{ marginLeft: 0, marginBlock: 0 }}>
            <div>
              <div className="relative z-[2] cursor-pointer m-0 p-0 height-54 width70 overflow-hidden">
                <Skeleton height={300} width={34343} />
              </div>
            </div>
            <div className="w-full flex items-stretch justify-between custom-gap-3">
              <div className="w-full flex flex-col items-start gap10">
                <div className="w-[60%] break-all min-w-0 overflow-hidden">
                  <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0 p-0">
                    <Skeleton height={30} width={34343} />
                  </h2>
                </div>
                <div className="w-[30%] flex flex-col gap10 overflow-hidden">
                  <div className="flex items-center custom-gap-1">
                    <div className="flex items-center flex-wrap">
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0 w-[5%] overflow-hidden">
                        <Skeleton height={15} width={34343} />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start custom-gap-2">
                    <div className="flex items-center custom-gap-1">
                      <div className="width-19 aspect-square overflow-hidden">
                        <Skeleton height={1040} width={34343} />
                      </div>
                    </div>
                    <div className="flex items-center custom-gap-1">
                      <div className="width-19 aspect-square overflow-hidden">
                        <Skeleton height={1040} width={34343} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* publication */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-[30%] overflow-hidden">
          <Skeleton height={20} width={34343} />
        </div>
      </td>

      {/* status */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-[20%] overflow-hidden">
          <Skeleton height={20} width={34343} />
        </div>
      </td>

      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden flex justify-end">
          <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100">
            <div className="width-13 aspect-square overflow-hidden">{/* <Skeleton height={20} width={34343} /> */}</div>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SkeletonComp;
