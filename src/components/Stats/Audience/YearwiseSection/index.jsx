import React, { useContext, useEffect, useRef, useState } from "react";
import ActionBtn from "./ActionBtn";
import AudienceGraph from "./Graph";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { defaultLoaderTime } from "../../../../constants/constant";

function YearwiseSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(null);
  const [stats, setStats] = useState([]);

  const getEndDate = (year) => {
    if (year === new Date().getFullYear()) {
      setEndDate(null);
    } else {
      setEndDate(new Date(year + 1, 0, 0));
    }
  };

  const handleYearChange = (year) => {
    // setIsLoading(true);
    setDefaultLoader(true);

    setStartDate(new Date(year, 0, 1));
    getEndDate(year);
    // generateEmptyStatsDates(month, year);

    console.log("year: ", year);

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
      loaderTimeout.current = null;
    }, 200);
  };

  useEffect(() => {
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
            <ActionBtn isLoading={isLoading || defaultLoader} handleYearChange={handleYearChange} />
          </div>

          <AudienceGraph isLoading={isLoading || defaultLoader} />
        </div>
      </div>
    </div>
  );
}

export default YearwiseSection;
