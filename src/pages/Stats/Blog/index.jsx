import React from "react";
import BlogDetails from "../../../components/Stats/BlogStats/Blog";
import StatsSection from "../../../components/Stats/BlogStats/StatsSection";
import MonthwiseSection from "../../../components/Stats/BlogStats/MonthwiseSection";

function BlogStatsPage() {
  return (
    <div className="margin54">
      <div className="flex justify-center">
        <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
          <div className="flex flex-col">
            <BlogDetails />
            <div className="margin-27" style={{ marginBottom: 0, marginInline: 0 }}>
              <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
              <div className="padding85" style={{ paddingBottom: 0 }}>
                <div className="font-4 color-4 line20 font-normal">
                  <div className="flex flex-wrap">
                    July 3, 2025 - Today (UTC)
                    <div className="margin73">
                      <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                    </div>{" "}
                    Updated hourly
                  </div>
                </div>
              </div>
            </div>
            <StatsSection />
            <MonthwiseSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogStatsPage;
