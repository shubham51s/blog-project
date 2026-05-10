import React, { useContext, useEffect, useRef, useState } from "react";
import StatsSection from "./StatsSection";
import Skeleton from "react-loading-skeleton";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { defaultLoaderTime } from "../../../../constants/constant";
import { UserContext } from "../../../../context/userContext";

function AllTimeSection() {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const loaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [stats, setStats] = useState(null);

  const getAllTimeStats = async () => {
    try {
      const response = await requestHandler("/users/stats/followers/all");
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        setStats(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTimeStats();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        loaderTimeout.current = null;
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1 m-0">
        <div className="flex items-start justify-between">
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                {(isLoading || defaultLoader) && (
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
                {!isLoading && !defaultLoader && (
                  <div className="flex flex-wrap">
                    {formatUTCToLocalDate(userInfo.createdAt)} - Today (UTC)
                    {/* <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>{" "}
                    Updated daily */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <StatsSection isLoading={isLoading || defaultLoader} stats={stats} />
      </div>
    </div>
  );
}

export default AllTimeSection;
