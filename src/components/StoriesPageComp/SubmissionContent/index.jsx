import React, { useEffect, useRef, useState } from "react";
import BlogComp from "./BlogComp";
import { useRequestHandler } from "../../../hooks/requestHandler";
import SkeletonComp from "../skeleton";
import { IoIosArrowUp } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import Checkbox from "@mui/material/Checkbox";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function SubmissionContainer({ isInitialLoading, submissionsCount, setSubmissionsCount }) {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLoader, setDefaultLoader] = useState(true); // min loading time
  const loaderTimeout = useRef(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [activeStatusCount, setActiveStatusCount] = useState(0);
  const hasFetched = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });
  const [statusList, setStatusList] = useState([
    {
      id: 0,
      name: "Pending review",
      isChecked: false,
      color: "text-[#6B6B6B]",
      bg: "bg-[#F2F2F2]",
    },
    {
      id: 1,
      name: "In review",
      isChecked: false,
      color: "text-[#437aff]",
      bg: "bg-[#e5f2ff]",
    },
    {
      id: 2,
      name: "Edits requested",
      isChecked: false,
      color: "text-[#be5b04]",
      bg: "bg-[#fffae1]",
    },
    {
      id: 3,
      name: "Approved",
      isChecked: false,
      color: "text-[#1a8917]",
      bg: "bg-[#e8f3e8]",
    },
    {
      id: 4,
      name: "Withdrawn",
      isChecked: false,
      color: "text-[#242424]",
      bg: "bg-[#F9F9F9]",
    },
    {
      id: 5,
      name: "Declined",
      isChecked: false,
      color: "text-[#242424]",
      bg: "bg-[#F9F9F9]",
    },
  ]);

  const handleCheckboxValChange = (id) => {
    let checkedCount = 0;

    setStatusList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (!item.isChecked) checkedCount++;
        } else if (item.isChecked) checkedCount++;
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
      }),
    );

    setActiveStatusCount(checkedCount);
  };

  const getSubmitBlogsList = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/blogs/submissions?cursor=${scroll.cursor}&limit=${limit}` : `/blogs/submissions?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getSubmitBlogsList,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (!isInitialLoading && !hasFetched.current) {
      hasFetched.current = true;
      setIsLoading(true);
      getSubmitBlogsList();
    }

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, [isInitialLoading]);

  return (
    <>
      <div>
        <table className="border-0 border-collapse table-fixed w-full h-fit">
          <thead className="table-header-group text-left relative">
            <tr className="table-row">
              <th className="custom-py-2 w-[60%] custom-fs-1 color-6 opacity-[0.75] custom-line-h-1 font-normal" style={{ paddingLeft: 0 }}>
                Latest
              </th>
              <th className="w-[18%] custom-fs-1 color-6 opacity-[0.75] custom-line-h-1 font-medium">Publication</th>
              <th className="w-[18%]">
                <div className="w-full width64">
                  {false && (
                    <Popover.Root open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                      <Popover.Trigger className={`cursor-pointer m-0 p-0 custom-fs-1 custom-line-h-1 font-medium color-6 transition-all duration-200 linear ${isStatusOpen ? "opacity-100" : "opacity-[0.75] hover:opacity-100"}`} disabled={defaultLoader || isLoading || isInitialLoading}>
                        <div className="flex items-center custom-gap-1">
                          <p className=""> Status {activeStatusCount > 0 && <span>{`(${activeStatusCount})`}</span>}</p>
                          <div className="width-19 aspect-square">
                            <IoIosArrowUp className={`w-full h-full transition-all duration-150 ease-in ${isStatusOpen ? "rotate-180" : "rotate-0"}`} />
                          </div>
                        </div>
                      </Popover.Trigger>
                      <Popover.Content side="bottom" className="boxShadow11 border-radius-3 box-border" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
                        <div className="border-radius-4 custom-bg-8 width71 overflow-hidden">
                          <div className="flex flex-col padding-14 custom-gap-2">
                            <p className="uppercase letter-spacing9 line-h-7 font16 color-4 font-normal m-0 p-0">Filter</p>
                            {statusList.map((item) => (
                              <div className="w-full flex items-center" key={item.id}>
                                <div className="width72 aspect-square relative flex items-stretch grow-0 shrink-0 basis-auto margin-13" style={{ marginLeft: 0 }}>
                                  <Checkbox className="w-full h-full" {...label} checked={item.isChecked} onChange={() => handleCheckboxValChange(item.id)} />
                                </div>
                                <div>
                                  <p onClick={() => handleCheckboxValChange(item.id)} className={`custom-fs-1 w-fit custom-line-h-1 font-normal m-0 padding-28 padding73 padding74 border-radius10 cursor-default select-none ${item.color} ${item.bg}`}>
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>

                          <div className="flex justify-between padding59 padding72">
                            <button className="underline color-3 cursor-pointer m-0 p-0">
                              <p className="font-4 color-3 custom-line-h-1 font-normal m-0">Clear all</p>
                            </button>
                            <button className="bdr-6 custom-bg-1 padding50 color-2 font-4 cursor-pointer text-center border-radius-9 custom-line-h-1 font-normal m-0 opacity-[0.95] transition-all duration-200 linear hover:opacity-100">Apply</button>
                          </div>
                        </div>
                      </Popover.Content>
                    </Popover.Root>
                  )}
                  <button className={`cursor-pointer m-0 p-0 custom-fs-1 custom-line-h-1 font-medium color-6 transition-all duration-200 linear ${isStatusOpen ? "opacity-100" : "opacity-[0.75] hover:opacity-100"}`} disabled={defaultLoader || isLoading || isInitialLoading}>
                    <div className="flex items-center custom-gap-1">
                      <p className=""> Status {activeStatusCount > 0 && <span>{`(${activeStatusCount})`}</span>}</p>
                    </div>
                  </button>
                </div>
              </th>
              <th className="w-[3%] padding-23 custom-fs-1 color-6 opacity-[0.75] custom-line-h-1 font-medium" style={{ paddingBlock: 0 }}></th>
            </tr>
          </thead>

          {(defaultLoader || isLoading || isInitialLoading || blogs.length > 0) && (
            <tbody className="m-0 no-first-row-border">
              {/* blogs list */}
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
              {!defaultLoader && !isLoading && !isInitialLoading && blogs.length > 0 && scroll.hasMore && <tr ref={sentinel} style={{ height: "1px" }}></tr>}
              {/* loader */}
              {(defaultLoader || isLoading || isInitialLoading) && Array.from({ length: 3 }).map((_, i) => <SkeletonComp key={i} />)}
            </tbody>
          )}
        </table>
      </div>

      {!defaultLoader && !isLoading && !isInitialLoading && blogs.length === 0 && (
        <div className="flex flex-col justify-center items-center custom-gap-3 padding-19 padding71">
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">No submissions yet.</p>
          <p className="line-h-8 font-10 color-3 font-medium m-0 p-0">We can't wait to see what you write!</p>
        </div>
      )}
    </>
  );
}

export default SubmissionContainer;
