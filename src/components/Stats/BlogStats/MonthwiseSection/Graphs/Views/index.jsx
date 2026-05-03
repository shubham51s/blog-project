import React from "react";
import Skeleton from "react-loading-skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

function ViewsGraph({ isLoading }) {
  const stats = [
    {
      name: 1,
      value: 2,
    },
    {
      name: 2,
      value: 4,
    },
    {
      name: 3,
      value: 3,
    },
    {
      name: 4,
      value: 6,
    },
    {
      name: 5,
      value: 8,
    },
    {
      name: 6,
      value: 12,
    },
    {
      name: 7,
      value: 15,
    },
    {
      name: 8,
      value: 16,
    },
    {
      name: 9,
      value: 24,
    },
    {
      name: 10,
      value: 24,
    },
    {
      name: 11,
      value: 24,
    },
    {
      name: 12,
      value: 29,
    },
    {
      name: 13,
      value: 29,
    },
    {
      name: 14,
      value: 29,
    },
    {
      name: 15,
      value: 29,
    },
    {
      name: 16,
      value: 32,
    },
    {
      name: 17,
      value: 34,
    },
    {
      name: 18,
      value: 36,
    },
    {
      name: 19,
      value: 36,
    },
    {
      name: 20,
      value: 36,
    },
    {
      name: 21,
      value: 36,
    },
    {
      name: 22,
      value: 36,
    },
    {
      name: 23,
      value: 38,
    },
    {
      name: 24,
      value: 38,
    },
    {
      name: 25,
      value: 39,
    },
    {
      name: 26,
      value: 39,
    },
    {
      name: 27,
      value: 41,
    },
    {
      name: 28,
      value: 43,
    },
    {
      name: 29,
      value: 43,
    },
    {
      name: 30,
      value: 43,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const views = payload.find((p) => p.dataKey === "value")?.value;

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
            <div className="width94 aspect-square bdr26 border-[#b3b3b3] margin-9 rounded-full bg-[#e4e0e0]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
            <span className="font-4 color-3 line20 font-normal">Total views</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{views}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="margin-36" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="flex items-stretch justify-between">
        <div className="margin-22" style={{ marginLeft: 0, marginBlock: 0 }}>
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Views</h2>
          <div className="width44 margin44">
            <p className="font-10 line-h-8 color-4 font-normal m-0">People who visited your story's page.</p>
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
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">23</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">Total views</div>
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
          <span className="font-4 text-[#6B6B6B] line20 font-normal">Views</span>
        </div>
      </div>
    </div>
  );
}

export default ViewsGraph;
