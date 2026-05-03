import React from "react";
import Skeleton from "react-loading-skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

function AudienceGraph({ isLoading }) {
  const stats = [
    { date: 1, Views: 5, Reads: 3 },
    { date: 2, Views: 8, Reads: 5 },
    { date: 3, Views: 6, Reads: 4 },
    { date: 4, Views: 10, Reads: 7 },
    { date: 5, Views: 12, Reads: 9 },
    { date: 6, Views: 7, Reads: 5 },
    { date: 7, Views: 15, Reads: 11 },
    { date: 8, Views: 9, Reads: 6 },
    { date: 9, Views: 11, Reads: 8 },
    { date: 10, Views: 14, Reads: 10 },
    { date: 11, Views: 13, Reads: 9 },
    { date: 12, Views: 16, Reads: 12 },
    { date: 13, Views: 18, Reads: 14 },
    { date: 14, Views: 2, Reads: 1 },
    { date: 15, Views: 17, Reads: 13 },
    { date: 16, Views: 19, Reads: 14 },
    { date: 17, Views: 3, Reads: 0 },
    { date: 18, Views: 25, Reads: 19 },
    { date: 19, Views: 21, Reads: 16 },
    { date: 20, Views: 1, Reads: 1 },
    { date: 21, Views: 26, Reads: 20 },
    { date: 22, Views: 23, Reads: 17 },
    { date: 23, Views: 0, Reads: 0 },
    { date: 24, Views: 29, Reads: 23 },
    { date: 25, Views: 28, Reads: 22 },
    { date: 26, Views: 30, Reads: 24 },
    { date: 27, Views: 32, Reads: 26 },
    { date: 28, Views: 31, Reads: 25 },
    { date: 29, Views: 34, Reads: 28 },
    { date: 30, Views: 0, Reads: 0 },
  ];

  const statsNew = [
    {
      month: "Jan",
      Followers: 2,
    },
    {
      month: "Feb",
      Followers: 4,
    },
    {
      month: "Mar",
      Followers: 3,
    },
    {
      month: "Apr",
      Followers: 6,
    },
    {
      month: "May",
      Followers: 8,
    },
    {
      month: "Jun",
      Followers: 12,
    },
    {
      month: "Jul",
      Followers: 15,
    },
    {
      month: "Aug",
      Followers: 16,
    },
    {
      month: "Sep",
      Followers: 24,
    },
    {
      month: "Oct",
      Followers: 24,
    },
    {
      month: "Nov",
      Followers: 24,
    },
    {
      month: "Dec",
      Followers: 29,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

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
          <span className="font-4 color-4 line20 font-normal">{label} 2025</span>
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
            <span className="font-4 color-3 line20 font-normal">{followers}</span>
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
                {!isLoading && <h2 className="font-10 font-semibold color-3 line20 m-0">0</h2>}
                <div className="margin44 flex items-baseline">
                  <div className="flex-nowrap line-h-8 font-10 color-4 font-normal">Followers</div>
                </div>
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="w-full height91">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsNew}>
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
