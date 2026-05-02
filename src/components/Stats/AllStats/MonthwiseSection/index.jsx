import React, { useState } from "react";
import ViewsGraph from "./ViewsGraph";
import ActionBtn from "./ActionBtn";
import StatsSection from "./Stats";

function MonthwiseSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1 m-0">
        <div className="flex items-start justify-between">
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0">Monthly</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex flex-wrap">
                  April 1, 2026 - Today (UTC)
                  <div className="margin73">
                    <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                  </div>{" "}
                  Updated hourly
                </div>
              </div>
            </div>
          </div>
          <ActionBtn isLoading={isLoading} />
        </div>

        <StatsSection isLoading={isLoading} />

        <ViewsGraph isLoading={isLoading} />
      </div>
    </div>
  );
}

export default MonthwiseSection;
