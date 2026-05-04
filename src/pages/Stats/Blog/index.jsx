import React, { useEffect, useState } from "react";
import BlogDetails from "../../../components/Stats/BlogStats/Blog";
import StatsSection from "../../../components/Stats/BlogStats/StatsSection";
import MonthwiseSection from "../../../components/Stats/BlogStats/MonthwiseSection";
import Spinner from "../../../components/Common/Spinner";
import { useParams } from "react-router-dom";
import { useRequestHandler } from "../../../hooks/requestHandler";
import NotFoundComp from "../../../components/Common/NotFound";
import { formatUTCToLocalDate } from "../../../utils/dates";

function BlogStatsPage() {
  const { requestHandler } = useRequestHandler();
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  const getBlogStats = async () => {
    try {
      const response = await requestHandler(`/blogs/stats/${postId}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blog) {
        setBlog(result.data.blog);
        console.log("blog: ", result.data.blog);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogStats();
  }, []);

  return (
    <>
      {!isLoading && blog && (
        <div className="margin54">
          <div className="flex justify-center">
            <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
              <div className="flex flex-col">
                <BlogDetails blog={blog} />
                <div className="margin-27" style={{ marginBottom: 0, marginInline: 0 }}>
                  <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
                  <div className="padding85" style={{ paddingBottom: 0 }}>
                    <div className="font-4 color-4 line20 font-normal">
                      <div className="flex flex-wrap">
                        {formatUTCToLocalDate(blog.createdAt)} - Today (UTC)
                        <div className="margin73">
                          <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                        </div>{" "}
                        Updated hourly
                      </div>
                    </div>
                  </div>
                </div>
                <StatsSection blog={blog} />
                <MonthwiseSection />
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !blog && <NotFoundComp />}

      {isLoading && (
        <div className="w-full max-w-full height-11 flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default BlogStatsPage;
