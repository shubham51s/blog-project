import React, { useEffect, useRef, useState } from "react";
import ActionBtn from "./ActionBtn";
import ViewsGraph from "./Graphs/Views";
import ReadsGraph from "./Graphs/Reads";
import EngagementGraph from "./Graphs/Engagement";
import { formatUTCToLocalDate, getMonthsTillToday } from "../../../../utils/dates";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../../constants/constant";

function MonthwiseSection({ blog }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(false);
  const loaderTimeout = useRef(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(null);
  const [months, setMonths] = useState(getMonthsTillToday(blog.createdAt));
  const [selected, setSelected] = useState({
    month: months[0].month,
    year: months[0].year,
  });
  const engagement = [
    { name: "Clappers", value: 0 },
    { name: "Responders", value: 0 },
  ];
  const [stats, setStats] = useState({
    views: [],
    reads: [],
    engagement: JSON.parse(JSON.stringify(engagement)),
    totalViews: 0,
    totalReads: 0,
    totalClappers: 0,
    totalResponders: 0,
  });

  const getEndDate = (month, year) => {
    if (month === new Date().getMonth() && year === new Date().getFullYear()) {
      setEndDate(null);
    } else {
      setEndDate(new Date(year, month + 1, 0));
    }
  };

  const getMonthlyStatsForBlog = async (month, year, datesArr) => {
    setStats((prev) => ({ ...prev, views: JSON.parse(JSON.stringify(datesArr)), reads: JSON.parse(JSON.stringify(datesArr)), totalReads: 0, totalViews: 0, totalClappers: 0, totalResponders: 0, engagement: JSON.parse(JSON.stringify(engagement)) }));
    try {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      const response = await requestHandler(`/blogs/monthly-stats/${blog._id}/${startDate.toISOString()}/${endDate.toISOString()}`);
      const result = await response.json();

      if (response?.status === 200) {
        let views = JSON.parse(JSON.stringify(datesArr));
        let reads = JSON.parse(JSON.stringify(datesArr));
        let totalViews = 0;
        let totalReads = 0;
        let totalClappers = 0;
        let totalResponders = 0;
        if (result?.data?.views?.length) {
          views = datesArr.map((item) => {
            const matchedView = result.data.views.find((view) => view.day === item.name);
            if (matchedView) totalViews += matchedView.count;
            return {
              ...item,
              value: matchedView ? matchedView.count : item.value,
            };
          });
        }
        if (result?.data?.reads?.length) {
          reads = datesArr.map((item) => {
            const matchedView = result.data.reads.find((view) => view.day === item.name);
            if (matchedView) totalReads += matchedView.count;
            return {
              ...item,
              value: matchedView ? matchedView.count : item.value,
            };
          });
        }
        if (result?.data?.totalClappers) {
          totalClappers = result.data.totalClappers;
        }
        if (result?.data?.totalResponders) {
          totalResponders = result.data.totalResponders;
        }
        setStats((prev) => ({
          ...prev,
          views,
          reads,
          totalViews,
          totalReads,
          totalClappers,
          totalResponders,
          engagement: [
            { name: "Clappers", value: totalClappers },
            { name: "Responders", value: totalResponders },
          ],
        }));
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
      datesArr.push({ name: i, value: 0 });
    }

    getMonthlyStatsForBlog(month, year, datesArr);
  };

  const handleMonthChange = (month, year) => {
    setIsLoading(true);
    setDefaultLoader(true);

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
  }, []);

  return (
    <>
      <div className="flex items-start justify-between margin56">
        <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
          <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Monthly</h2>
          <div className="margin68" style={{ marginBottom: 0 }}>
            <div className="font-4 color-4 line20 font-normal">
              <div className="flex flex-wrap">
                {formatUTCToLocalDate(startDate)} - {`${endDate ? formatUTCToLocalDate(endDate) : "Today (UTC)"}`}
                {/* <div className="margin73">
                  <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                </div>{" "}
                Updated hourly */}
              </div>
            </div>
          </div>
        </div>
        <ActionBtn isLoading={isLoading || defaultLoader} blog={blog} selected={selected} setSelected={setSelected} months={months} handleMonthChange={handleMonthChange} />
      </div>

      <div className="margin56">
        <ViewsGraph isLoading={isLoading || defaultLoader} stats={stats.views} totalViews={stats.totalViews} />
        <ReadsGraph isLoading={isLoading || defaultLoader} stats={stats.reads} totalReads={stats.totalReads} totalViews={stats.totalViews} />
        <EngagementGraph isLoading={isLoading || defaultLoader} stats={stats.engagement} totalClappers={stats.totalClappers} totalResponders={stats.totalResponders} />
      </div>
    </>
  );
}

export default MonthwiseSection;
