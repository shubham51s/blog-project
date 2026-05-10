import React, { useContext, useEffect, useRef, useState } from "react";
import ViewsGraph from "./ViewsGraph";
import ActionBtn from "./ActionBtn";
import StatsSection from "./Stats";
import { formatUTCToLocalDate, getMonthsTillToday } from "../../../../utils/dates";
import { UserContext } from "../../../../context/userContext";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function MonthwiseSection() {
  const { requestHandler } = useRequestHandler();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(null);
  const [months, setMonths] = useState(getMonthsTillToday(userInfo.createdAt));
  const [selected, setSelected] = useState({
    month: months[0].month,
    year: months[0].year,
  });
  const [stats, setStats] = useState({
    stats: [],
    viewCount: 0,
    readCount: 0,
    followerCount: 0,
  });

  const getEndDate = (month, year) => {
    if (month === new Date().getMonth() && year === new Date().getFullYear()) {
      setEndDate(null);
    } else {
      setEndDate(new Date(year, month + 1, 0));
    }
  };

  const getMonthlyStats = async (month, year, datesArr) => {
    setStats((prev) => ({ ...prev, stats: JSON.parse(JSON.stringify(datesArr)), viewCount: 0, readCount: 0, followerCount: 0 }));
    try {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      const response = await requestHandler(`/users/stats/all/monthly/${startDate.toISOString()}/${endDate.toISOString()}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        let stats = JSON.parse(JSON.stringify(datesArr));
        let followerCount = 0;
        let viewCount = 0;
        let readCount = 0;

        if (result.data.stats?.length) {
          stats = datesArr.map((item) => {
            const matchedView = result.data.stats.find((view) => view.day === item.date);
            if (matchedView) {
              viewCount += matchedView.views;
              readCount += matchedView.reads;
            }

            if (matchedView) {
              return {
                ...item,
                Views: matchedView.views,
                Reads: matchedView.reads,
              };
            }
            return {
              ...item,
            };
          });
        }
        if (result.data.followerCount) {
          followerCount = result.data.followerCount;
        }
        setStats((prev) => ({ ...prev, stats, viewCount, readCount, followerCount }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateEmptyStatsDates = (month, year) => {
    const today = new Date();
    const isCurrentMonthSelected = month === today.getMonth() && year === today.getFullYear();
    const endDay = isCurrentMonthSelected ? today.getDate() : new Date(year, month + 1, 0).getDate();
    const datesArr = [];

    for (let i = 1; i <= endDay; i++) {
      datesArr.push({ date: i, Views: 0, Reads: 0 });
    }

    setStats((prev) => ({ ...prev, stats: datesArr }));
    getMonthlyStats(month, year, datesArr);
  };

  const handleMonthChange = (month, year) => {
    setIsLoading(true);
    setDefaultLoader(true);

    setSelected((prev) => ({ ...prev, month, year }));
    setStartDate(new Date(year, month, 1));
    getEndDate(month, year);
    generateEmptyStatsDates(month, year);

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
      loaderTimeout.current = null;
    }, 200);
  };

  useEffect(() => {
    generateEmptyStatsDates(selected.month, selected.year);

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        loaderTimeout.current = null;
      }, 200);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1 m-0">
        <div className="flex items-start justify-between">
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Monthly</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex flex-wrap">
                  {formatUTCToLocalDate(startDate)} - {endDate ? formatUTCToLocalDate(endDate) : "Today (UTC)"}
                  {/* {!endDate && (
                    <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>
                  )}
                  {endDate ? "" : " Updated hourly"} */}
                </div>
              </div>
            </div>
          </div>
          <ActionBtn isLoading={isLoading || defaultLoader} months={months} selected={selected} handleMonthChange={handleMonthChange} />
        </div>
        <StatsSection isLoading={isLoading || defaultLoader} stats={stats} />
        <ViewsGraph isLoading={isLoading || defaultLoader} stats={stats.stats} selected={selected} />
      </div>
    </div>
  );
}

export default MonthwiseSection;
