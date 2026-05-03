import React, { useState } from "react";
import ActionBtn from "./ActionBtn";
import AudienceGraph from "./Graph";

function YearwiseSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1 margin-37 custom-margin-b-1">
        <div className="flex flex-col gap15">
          <div className="flex items-start justify-between">
            <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
              <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Audience Growth</h2>
              <div className="margin68" style={{ marginBottom: 0 }}>
                <div className="font-4 color-4 line20 font-normal">
                  <div className="flex flex-wrap">
                    January 1, 2026 - Today (UTC)
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

          <AudienceGraph isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default YearwiseSection;
