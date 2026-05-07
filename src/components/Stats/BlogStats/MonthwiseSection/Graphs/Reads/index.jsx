import React from "react";
import Skeleton from "react-loading-skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { CiCircleInfo } from "react-icons/ci";
import * as RadixTooltip from "@radix-ui/react-tooltip";

function ReadsGraph({ isLoading, stats, totalReads, totalViews }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const reads = payload.find((p) => p.dataKey === "value")?.value;

    return (
      <div
        className="custom-py-2 custom-px-2 border-radius-1 flex flex-col custom-gap-1 boxShadow11"
        style={{
          background: "#fff",
          borderRadius: "6px",
        }}
      >
        <p>
          <span className="font-4 color-4 line20 font-normal">Apr {label}, 2026</span>
        </p>

        <div className="flex items-center justify-between custom-gap-6">
          <div className="flex items-center" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="width94 aspect-square bdr26 border-[#b3b3b3] margin-9 rounded-full bg-[#F2F2F2]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
            <span className="font-4 color-3 line20 font-normal">Total reads</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{reads}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="margin-36" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="flex items-stretch justify-between">
        <div className="margin-22" style={{ marginLeft: 0, marginBlock: 0 }}>
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Reads</h2>
          <div className="width44 margin44">
            <p className="font-10 line-h-8 color-4 font-normal m-0">People who read your story for at least 30 seconds.</p>
          </div>
          <div className="margin51">
            <div className="flex custom-gap-7 max-w-full">
              <div>
                {isLoading && (
                  <span className="font-10 font-semibold color-3 line20 m-0 relative">
                    000
                    <div className="absolute inset-0 overflow-hidden">
                      <Skeleton width={3434} height={23434} />
                    </div>
                  </span>
                )}
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">{totalReads}</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">Total reads</div>
                </div>
              </div>
              <div>
                {isLoading && (
                  <span className="font-10 font-semibold color-3 line20 m-0 relative">
                    25%
                    <div className="absolute inset-0 overflow-hidden">
                      <Skeleton width={3434} height={23434} />
                    </div>
                  </span>
                )}
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">{totalViews > 0 ? Math.round((totalReads / totalViews) * 100) : 0}%</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">Member read ratio</div>
                  <div className="margin-19" style={{ marginRight: 0, marginBlock: 0 }}>
                    <RadixTooltip.Provider delayDuration={50}>
                      <RadixTooltip.Root>
                        <RadixTooltip.Trigger asChild>
                          <div className="cursor-pointer width84 aspect-square">
                            <CiCircleInfo className="w-full h-full" />
                          </div>
                        </RadixTooltip.Trigger>
                        <RadixTooltip.Portal>
                          <RadixTooltip.Content side="right" align="center" sideOffset={10} className="box-shadow-4 custom-bg-8 width-9 overflow-hidden padding-6">
                            <span className="color-3 custom-fs-1">The percent of members who read your story for at least 30 seconds.</span>
                            <RadixTooltip.Arrow className="fill-white" />
                          </RadixTooltip.Content>
                        </RadixTooltip.Portal>
                      </RadixTooltip.Root>
                    </RadixTooltip.Provider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="w-full height91">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats}>
                <CartesianGrid vertical={true} stroke="#f1f1f2" horizontal={true} strokeDasharray="0" />

                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />

                <Tooltip content={<CustomTooltip />} />

                <Area type="linear" dataKey="value" stroke="#b3b3b3" fill="#e4e0e0" fillOpacity={0.4} strokeWidth={2} dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {isLoading && (
          <div className="w-full height91 overflow-hidden">
            <Skeleton width={3434} height={3434} />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-end margin-12" style={{ marginLeft: 0 }}>
        <div className="flex items-center margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
          <div className="width94 aspect-square bdr26 border-[#b3b3b3] margin-9 rounded-full bg-[#e4e0e0]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
          <span className="font-4 text-[#6B6B6B] line20 font-normal">Reads</span>
        </div>
      </div>
    </div>
  );
}

export default ReadsGraph;
