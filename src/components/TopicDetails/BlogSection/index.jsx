import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import { defaultLoaderTime } from "../../../constants/constant";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListItemSkeleton from "./ListItem/skeleton";
import NoData from "../NoData";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

function Blogs({ topic }) {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const hasFetched = useRef(null);
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
  ];
  const selected = useRef(sortOptions[0]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const getBlogsByCategory = async () => {
    if (!scroll.current.hasMore) return;
    scroll.current = { ...scroll.current, loading: true };

    try {
      const url = scroll.current.cursor ? `/blogs/topic/${topic._id}?sort=${selected.current.value}&cursor=${scroll.current.cursor}&limit=${limit}` : `/blogs/topic/${topic._id}?sort=${selected.current.value}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        scroll.current = { ...scroll.current, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false };
      } else {
        scroll.current = { ...scroll.current, hasMore: false };
      }
    } catch (err) {
      console.error(err);
      scroll.current = { ...scroll.current, hasMore: false };
    } finally {
      setIsLoading(false);
      scroll.current = { ...scroll.current, loading: false };
    }
  };

  const handleSortChange = (item) => {
    if (item.value === selected.current.value) return;
    selected.current = item;
    closePopup();

    setIsLoading(true);
    setDefaultLoader(true);
    scroll.current = { ...scroll.current, loading: false, hasMore: true, cursor: null };
    setBlogs([]);
    getBlogsByCategory();

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
    }, defaultLoaderTime);
  };

  const sentinel = useInfiniteScroll({
    loadMore: getBlogsByCategory,
    hasMore: scroll.current.hasMore,
    scrollLoader: scroll.current.loading,
  });

  useEffect(() => {
    if (topic && !hasFetched.current) {
      hasFetched.current = true;
      getBlogsByCategory();
    }

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, [topic]);

  return (
    <>
      {(isLoading || defaultLoader || blogs.length > 0) && (
        <div className="margin51">
          <div className="flex justify-center">
            <div className="w-full min-w-0 custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
              <div className="padding83">
                <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                  <Popover.Trigger disabled={isLoading || defaultLoader} className="custom-fs-1 custom-line-h-1 color-3 cursor-pointer flex items-center custom-gap-1 transition-all duration-75 ease opacity-[0.9] hover:opacity-100">
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

              <div className="w-full margin-11 mx-auto flex flex-col justify-center" style={{ marginTop: 0 }}>
                <div>
                  <div className="grid grid-flow-row grid-cols-6 gap14">
                    {!isLoading && !defaultLoader && blogs.length > 0 && (
                      <>
                        {blogs.map((item) => (
                          <ListItem item={item} key={item._id} />
                        ))}
                        {scroll.current.hasMore && <div ref={sentinel} style={{ height: "2px" }}></div>}
                      </>
                    )}

                    {(isLoading || defaultLoader) && (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <ListItemSkeleton key={i} />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !defaultLoader && blogs.length === 0 && <NoData />}
    </>
  );
}

export default Blogs;
