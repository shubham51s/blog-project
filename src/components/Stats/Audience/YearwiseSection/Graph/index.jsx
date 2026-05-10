import React from "react";
import Skeleton from "react-loading-skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

function AudienceGraph({ isLoading, stats, totalFollowers, selected, prevMonthFollowers }) {
  const getPreviousFollowers = (prev, curr) => {
    const count = curr - prev;

    if (count > 0) return `+${count}`;
    if (count < 0) return `-${count}`;
    return 0;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const currentData = payload[0].payload;
    const currentIndex = stats.findIndex((item) => item.month === currentData.month);
    const previousData = currentIndex > 0 ? stats[currentIndex - 1] : { Followers: prevMonthFollowers };
    const previousFollowers = previousData?.Followers || 0;
    const followers = payload.find((p) => p.dataKey === "Followers")?.value;

    return (
      <div
        className="custom-py-2 custom-px-2 border-radius-1 flex flex-col custom-gap-1 boxShadow11"
        style={{
          background: "#fff",
          borderRadius: "6px",
        }}
      >
        <p>
          <span className="font-4 color-4 line20 font-normal">
            {label} {selected}
          </span>
        </p>

        <div className="flex items-center justify-between custom-gap-6">
          <div className="flex items-center" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="width94 aspect-square bdr26 border-[#156d12] margin-9 rounded-full bg-[#84c082]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
            <span className="font-4 color-3 line20 font-normal">Followers</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{followers}</span>
          </div>
        </div>
        <div className="flex items-center justify-between custom-gap-6">
          <div className="flex items-center" style={{ marginRight: 0, marginBlock: 0 }}>
            <span className="font-4 color-3 line20 font-normal">From previous month</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{getPreviousFollowers(previousFollowers, followers)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="margin-36" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="flex items-stretch justify-between">
        <div className="margin-22" style={{ marginLeft: 0, marginBlock: 0 }}>
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Followers</h2>
          <div className="width44 margin44">
            <p className="font-10 line-h-8 color-4 font-normal m-0">Readers who follow you on Medium. This excludes deactivated, deleted, or suspended users.</p>
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
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">{totalFollowers}</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">Followers</div>
                </div>
              </div>
              {/* <div>
                {isLoading && (
                  <span className="font-10 font-semibold color-3 line20 m-0 relative">
                    000
                    <div className="absolute inset-0 overflow-hidden">
                      <Skeleton width={3434} height={23434} />
                    </div>
                  </span>
                )}
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">0</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">From previous month</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="w-full height91">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats}>
                <CartesianGrid vertical={true} stroke="#f1f1f2" horizontal={true} strokeDasharray="0" />

                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />

                <Tooltip content={<CustomTooltip />} />

                <Area type="linear" dataKey="Followers" stroke="#156d12" fill="#84c082" fillOpacity={0.4} strokeWidth={2} dot={{ r: 3 }} />
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
          <div className="width94 aspect-square bdr26 border-[#156d12] margin-9 rounded-full bg-[#84c082]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
          <span className="font-4 text-[#6B6B6B] line20 font-normal">Followers</span>
        </div>
      </div>
    </div>
  );
}

export default AudienceGraph;
