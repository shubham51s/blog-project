import React, { useState } from "react";
import StatsSection from "./StatsSection";
import Skeleton from "react-loading-skeleton";

function AllTimeSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1 m-0">
        <div className="flex items-start justify-between">
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                {isLoading && (
                  <div className="flex flex-wrap relative">
                    July 3, 2025 - Today (UTC)
                    <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>{" "}
                    Updated daily
                    <div className="absolute inset-0 overflow-hidden">
                      <Skeleton width={3434} height={23434} />
                    </div>
                  </div>
                )}
                {!isLoading && (
                  <div className="flex flex-wrap">
                    July 3, 2025 - Today (UTC)
                    <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>{" "}
                    Updated daily
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <StatsSection isLoading={isLoading} />
      </div>
    </div>
  );
}

export default AllTimeSection;
