import React, { useContext, useEffect, useRef, useState } from "react";
import NoContentComp from "./No Content";
import BlogComp from "./Blog Comp";
import BlogLoader from "./Blog Comp/skeleton";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

function HomeMainContentComp() {
  const { requestHandler } = useRequestHandler();
  const noData = {
    title: "No recommended stories",
    description: "Recommended stories for you will appear here.",
    action: "View recommended publications",
    path: "/",
  };
  const [initialLoader, setInitialLoader] = useState(true);
  const limit = 8;
  const loaderTimeout = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const scroll = useRef({
    loading: false,
    hasMore: true,
    cursor: null,
  });
  const sortOptions = [
    {
      id: 0,
      name: "Latest",
      value: "latest",
    },
    {
      id: 1,
      name: "Oldest",
      value: "oldest",
    },
    {
      id: 2,
      name: "Most clapped",
      value: "most-clapped",
    },
    {
      id: 3,
      name: "Most viewed",
      value: "most-viewed",
    },
  ];
  const selected = useRef(sortOptions[0]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const getBlogs = async () => {
    if (!scroll.current.hasMore) return;
    scroll.current = { ...scroll.current, loading: true };

    try {
      const url = scroll.current.cursor ? `/blogs?sort=${selected.current.value}&cursor=${scroll.current.cursor}&limit=${limit}` : `/blogs?sort=${selected.current.value}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();
      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        scroll.current = { ...scroll.current, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false };
      } else {
        scroll.current = { ...scroll.current, hasMore: false };
      }
    } catch (err) {
      scroll.current = { ...scroll.current, hasMore: false };
      console.error(err);
    } finally {
      setIsLoading(false);
      scroll.current = { ...scroll.current, loading: false };
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getBlogs,
    hasMore: scroll.current.hasMore,
    scrollLoader: scroll.current.loading,
  });

  const handleSortChange = (item) => {
    if (item.value === selected.current.value) return;
    selected.current = item;
    closePopup();

    setIsLoading(true);
    setInitialLoader(true);
    scroll.current = { ...scroll.current, loading: false, hasMore: true, cursor: null };
    setBlogs([]);
    getBlogs();

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setInitialLoader(false);
    }, defaultLoaderTime);
  };

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
      <main className="width-20 grow shrink basis-auto block">
        <div className="block">
          {/* section-1 */}
          <div className="height-10"></div>

          {/* section-2 */}
          {/* <div className="sticky top2 z-[499] custom-bg-8"> */}
          <div className="custom-bg-8">
            <div className="flex justify-center">
              <div className="w-full min-w-0 max-width-2 margin-12">
                <div className="padding-18 pb-0">
                  <div className="overflow-hidden relative">
                    <div className="flex padding-18 w-full">
                      <div className="flex items-center overflow-y-hidden overflow-x-auto bdr-5 w-full" style={{ borderTop: 0, borderInline: 0 }}>
                        {/* active topic border & all pending */}
                        <div className={`min-w-max padding-18 pt-0`} style={{ marginBlock: 0, paddingTop: 0, borderTop: 0, borderInline: 0 }}>
                          <div className="inline-block outline-none">
                            <div className="p-0 m-0 cursor-pointer no-underline">
                              <div>
                                <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                                  <Popover.Trigger disabled={isLoading || initialLoader} className="custom-fs-1 custom-line-h-1 color-3 cursor-pointer flex items-center custom-gap-1 transition-all duration-75 ease opacity-[0.9] hover:opacity-100">
                                    {selected.current.name}
                                    <div className={`width86 aspect-square ${isOpen ? "-rotate-180" : "rotate-0"}`}>
                                      <MdKeyboardArrowDown className="w-full h-full color-3" />
                                    </div>
                                  </Popover.Trigger>
                                  <Popover.Portal>
                                    <Popover.Content className="z-[9999] custom-bg-8 select-none" onClick={(e) => e.stopPropagation()} side="bottom" align="middle" sideOffset={8}>
                                      <ul className="list-none border-radius-3 boxShadow6 custom-px-2">
                                        <li className="flex items-center justify-between flex-wrap color-3 cursor-default padding-20 padding-7 opacity-100">
                                          <div className="padding50" style={{ paddingLeft: 0 }}>
                                            <span className="color-3 font-semibold custom-fs-1 line20">Sort by</span>
                                          </div>
                                        </li>
                                        {sortOptions.map((item) => (
                                          <li onClick={() => handleSortChange(item)} key={item.id} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-20 padding-7 transition-all duration-75 ease hover:opacity-100 ${item.value === selected.current.value ? "bg-gray-100 opacity-[0.95]" : "opacity-[0.85]"}`}>
                                            <div className="padding50" style={{ paddingLeft: 0 }}>
                                              <span className="color-3 custom-fs-1 line20">{item.name}</span>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </Popover.Content>
                                  </Popover.Portal>
                                </Popover.Root>
                              </div>
                            </div>
                          </div>
                        </div>
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
              {!initialLoader && !isLoading && blogs.length === 0 && <NoContentComp item={noData} />}
              {!initialLoader && !isLoading && blogs.length > 0 && (
                <>
                  {blogs.map((item) => (
                    <BlogComp item={item} key={item._id} />
                  ))}
                  {scroll.current.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
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
