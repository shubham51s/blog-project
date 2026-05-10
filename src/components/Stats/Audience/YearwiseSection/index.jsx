import React, { useContext, useEffect, useRef, useState } from "react";
import ActionBtn from "./ActionBtn";
import AudienceGraph from "./Graph";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function YearwiseSection() {
  const { requestHandler } = useRequestHandler();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [selected, setSelected] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(null);
  const [stats, setStats] = useState({
    followers: [],
    totalFollowers: 0,
    prevMonth: 0,
  });

  const getYearlyFollowersStats = async (year, statsArr) => {
    setStats((prev) => ({ ...prev, followers: JSON.parse(JSON.stringify(statsArr)), totalFollowers: 0, prevMonth: 0 }));

    try {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 0);
      const response = await requestHandler(`/users/stats/followers/monthly/${startDate.toISOString()}/${endDate.toISOString()}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        let followers = JSON.parse(JSON.stringify(statsArr));
        let totalFollowers = 0;

        if (result.data.followers.length) {
          followers = statsArr.map((item, index) => {
            const matchedView = result.data.followers.find((follower) => follower.month === index);
            if (matchedView) totalFollowers += matchedView.count;
            return {
              ...item,
              Followers: totalFollowers,
            };
          });
        }

        setStats((prev) => ({ ...prev, followers, totalFollowers, prevMonth: result.data.prevMonthFollowers || 0 }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateEmptyStats = (year) => {
    let endMonth = months.length;
    const statsArr = [];

    if (year === new Date().getFullYear()) {
      endMonth = new Date().getMonth() + 1;
    }

    for (let i = 0; i < endMonth; i++) {
      statsArr.push({ month: months[i], Followers: 0 });
    }

    getYearlyFollowersStats(year, statsArr);
  };

  const getEndDate = (year) => {
    if (year === new Date().getFullYear()) {
      setEndDate(null);
    } else {
      setEndDate(new Date(year + 1, 0, 0));
    }
  };

  const handleYearChange = (year) => {
    setIsLoading(true);
    setDefaultLoader(true);

    setSelected(year);
    setStartDate(new Date(year, 0, 1));
    getEndDate(year);
    generateEmptyStats(year);

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
      loaderTimeout.current = null;
    }, 200);
  };

  useEffect(() => {
    generateEmptyStats(new Date().getFullYear());

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        loaderTimeout.current = null;
      }, defaultLoaderTime);
    }
  }, []);

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
                    {formatUTCToLocalDate(startDate)} - {endDate ? formatUTCToLocalDate(endDate) : "Today (UTC)"}
                    <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>{" "}
                    Updated hourly
                  </div>
                </div>
              </div>
            </div>
            <ActionBtn isLoading={isLoading || defaultLoader} handleYearChange={handleYearChange} selected={selected} />
          </div>
          <AudienceGraph isLoading={isLoading || defaultLoader} stats={stats.followers} totalFollowers={stats.totalFollowers} prevMonthFollowers={stats.prevMonth} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default YearwiseSection;
