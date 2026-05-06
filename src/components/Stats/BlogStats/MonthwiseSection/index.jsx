import React, { useState } from "react";
import ActionBtn from "./ActionBtn";
import ViewsGraph from "./Graphs/Views";
import ReadsGraph from "./Graphs/Reads";
import EngagementGraph from "./Graphs/Engagement";
import { formatUTCToLocalDate } from "../../../../utils/dates";

function MonthwiseSection({ blog }) {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  return (
    <>
      <div className="flex items-start justify-between margin56">
        <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
          <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Monthly</h2>
          <div className="margin68" style={{ marginBottom: 0 }}>
            <div className="font-4 color-4 line20 font-normal">
              <div className="flex flex-wrap">
                {formatUTCToLocalDate(startDate)} - Today (UTC)
                <div className="margin73">
                  <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                </div>{" "}
                Updated hourly
              </div>
            </div>
          </div>
        </div>
        <ActionBtn isLoading={isLoading} blog={blog} />
      </div>

      <div className="margin56">
        <ViewsGraph isLoading={isLoading} />
        <ReadsGraph isLoading={isLoading} />
        <EngagementGraph isLoading={isLoading} />
      </div>
    </>
  );
}

export default MonthwiseSection;
