import React, { useContext, useEffect, useRef, useState } from "react";
import NoContentComp from "./No Content";
import BlogComp from "./Blog Comp";
import BlogLoader from "./Blog Comp/skeleton";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function HomeMainContentComp() {
  const { requestHandler } = useRequestHandler();
  const [initialLoader, setInitialLoader] = useState(true);
  const limit = 8;
  const loaderTimeout = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const [recommendedTopics, setRecommendedTopics] = useState([
    {
      id: 0,
      name: "For you",
      title: "Recommended stories based on your reading history",
      noData: {
        title: "No recommended stories",
        description: "Recommended stories for you will appear here.",
        action: "View recommended publications",
        path: "/",
      },
    },
    {
      id: 1,
      name: "Featured",
      title: "Featured stories from publications you follow",
      noData: {
        title: "No featured stories",
        description: "Featured stories from the publications you follow will appear here.",
        action: "View recommended publications",
        path: "/",
      },
    },
  ]);

  const handleActiveTabChange = (index) => {
    if (index === activeTopicIndex) return;
    setActiveTopicIndex(index);
  };

  const getBlogs = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));
    try {
      const url = scroll.cursor ? `/blogs?cursor=${scroll.cursor}&limit=${limit}` : `/blogs?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();
      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      setScroll((prev) => ({ ...prev, hasMore: false }));
      console.error(err);
    } finally {
      setIsLoading(false);
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getBlogs,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getBlogs();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setInitialLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    // <main className="width-20 h-full overflow-y-auto grow flex-shrink basis-auto block">
    <>
      <main className="width-20 h-full overflow-y-auto invisible-scrollbar grow flex-shrink basis-auto block">
        <div className="block">
          {/* section-1 */}
          <div className="height-10"></div>

          {/* section-2 */}
          {/* <div className="sticky top-2 z-[499] custom-bg-8"> */}
          <div className="custom-bg-8">
            <div className="flex justify-center">
              <div className="w-full min-w-0 max-width-2 margin-12">
                <div className="padding-18 pb-0">
                  <div className="box-shadow-2 overflow-hidden relative">
                    <div className="flex padding-18 w-full">
                      <div className="flex items-center scrollbar-none overflow-y-hidden overflow-x-auto bdr-5 w-full" style={{ borderTop: 0, borderInline: 0 }}>
                        {/* active topic border & all pending */}
                        {recommendedTopics.map((item) => (
                          <div className={`margin-8 min-w-max padding-18 pt-0 bdr-6 first:!ml-0`} key={item.id} title={item.title} style={{ marginBlock: 0, paddingTop: 0, borderTop: 0, borderInline: 0, borderColor: activeTopicIndex == item.id ? "" : "transparent" }}>
                            <div className="inline-block outline-none">
                              <div className="p-0 m-0 cursor-pointer no-underline">
                                <div className={`custom-fs-1 cursor-pointer custom-line-h-1 color-6 font-medium transition-all duration-300 ease-in-out hover:opacity-100 ${activeTopicIndex == item.id ? "opacity-100" : "opacity-75"}`}>
                                  <button onClick={() => handleActiveTabChange(item.id)} disabled={isLoading || initialLoader} className="whitespace-nowrap border-0 p-0 m-0 bg-transparent cursor-pointer">
                                    {item.name}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* section-3 */}
          {/* <div className="height-16"></div> */}

          {/* section-4 */}
          <div className="flex justify-center">
            <div className="w-full max-width-2 margin-2 min-w-0">
              {(initialLoader || isLoading) && Array.from({ length: 3 }).map((_, i) => <BlogLoader key={i} />)}
              {!initialLoader && !isLoading && blogs.length === 0 && <NoContentComp item={recommendedTopics[activeTopicIndex].noData} />}
              {!initialLoader && !isLoading && blogs.length > 0 && (
                <>
                  {blogs.map((item) => (
                    <BlogComp item={item} key={item._id} />
                  ))}
                  {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomeMainContentComp;
