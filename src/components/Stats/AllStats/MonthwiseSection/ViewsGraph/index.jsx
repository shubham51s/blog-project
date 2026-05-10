import React from "react";
import Skeleton from "react-loading-skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { formatUTCToLocalDate } from "../../../../../utils/dates";

function ViewsGraph({ isLoading, stats, selected }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const views = payload.find((p) => p.dataKey === "Views")?.value;
    const reads = payload.find((p) => p.dataKey === "Reads")?.value;

    return (
      <div
        className="custom-py-2 custom-px-2 border-radius-1 flex flex-col custom-gap-1 boxShadow11"
        style={{
          background: "#fff",
          borderRadius: "6px",
        }}
      >
        <p>
          <span className="font-4 color-3 line20 font-normal">{formatUTCToLocalDate(new Date(selected.year, selected.month, label))}</span>
        </p>

        <div className="flex items-center justify-between custom-gap-6">
          <div className="flex items-center">
            <div className="width94 aspect-square bdr26 border-[#bbdbba] margin-9 rounded-full bg-[#d6e7d6]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
            <span className="font-4 color-3 line20 font-normal">Views</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{views}</span>
          </div>
        </div>

        <div className="flex items-center justify-between custom-gap-6">
          <div className="flex items-center" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="width94 aspect-square bdr26 border-[#156d12] margin-9 rounded-full bg-[#84c082]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
            <span className="font-4 color-3 line20 font-normal">Reads</span>
          </div>
          <div className="flex items-center">
            <span className="font-4 color-3 line20 font-normal">{reads}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="margin68" style={{ marginBottom: 0 }}>
      {!isLoading && (
        <div className="w-full height89">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats}>
              <CartesianGrid vertical={true} stroke="#f1f1f2" horizontal={true} strokeDasharray="0" />

              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />

              <Tooltip content={<CustomTooltip />} />

              <Area type="linear" dataKey="Views" stroke="#bbdbba" fill="#d6e7d6" fillOpacity={0.3} strokeWidth={2} dot={{ r: 3 }} />

              <Area type="linear" dataKey="Reads" stroke="#156d12" fill="#84c082" fillOpacity={0.4} strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {isLoading && (
        <div className="w-full height89 overflow-hidden">
          <Skeleton width={3434} height={3434} />
        </div>
      )}

      <div className="flex items-baseline justify-end margin-12" style={{ marginLeft: 0 }}>
        <div className="flex items-center">
          <div className="width94 aspect-square bdr26 border-[#bbdbba] margin-9 rounded-full bg-[#d6e7d6]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
          <span className="font-4 text-[#6B6B6B] line20 font-normal">Views</span>
        </div>

        <div className="flex items-center margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
          <div className="width94 aspect-square bdr26 border-[#156d12] margin-9 rounded-full bg-[#84c082]" style={{ marginLeft: 0, marginBlock: 0 }}></div>
          <span className="font-4 text-[#6B6B6B] line20 font-normal">Reads</span>
        </div>
      </div>
    </div>
  );
}

export default ViewsGraph;
