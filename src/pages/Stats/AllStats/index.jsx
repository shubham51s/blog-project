import React, { useEffect, useState } from "react";
import HeaderMenuSection from "../../../components/Stats/Common/HeaderMenu";
import MonthwiseSection from "../../../components/Stats/AllStats/MonthwiseSection";
import AllTimeSection from "../../../components/Stats/AllStats/AlltimeSection";

function AllStatsPage() {
  return (
    <div className="padding64" style={{ paddingInline: 0, paddingTop: 0 }}>
      <div className="flex justify-center">
        <div className="w-full min-w-0 custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
          <div className="flex flex-col gap15 margin-27" style={{ marginBottom: 0, marginInline: 0 }}>
            <h2 className="letter-spacing-7 line-h-10 font-12 font-semibold color-3 m-0">Stats</h2>
            <HeaderMenuSection />
            <div>
              <MonthwiseSection />
              <div className="w-full h-0 bdr-5 margin-27" style={{ marginInline: 0, borderTop: 0, borderInline: 0 }}></div>
              <AllTimeSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStatsPage;
