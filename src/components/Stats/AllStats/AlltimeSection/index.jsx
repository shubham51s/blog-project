import React, { useContext, useEffect, useRef, useState } from "react";
import ActionBtn from "./ActionBtn";
import ListItem from "./ListItem";
import ListItemLoader from "./ListItem/skeleton";
import Skeleton from "react-loading-skeleton";
import { UserContext } from "../../../../context/userContext";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function AllTimeSection() {
  const { requestHandler } = useRequestHandler();
  const limit = 1;
  const { userInfo } = useContext(UserContext);
  const loaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [scroll, setScroll] = useState({
    loading: false,
    cursor: null,
  });
  const hasMore = useRef(true);
  const [optionsArr, setOptionsArr] = useState([
    {
      name: "Latest",
      value: "latest",
    },
    {
      name: "Oldest",
      value: "oldest",
    },
    {
      name: "Most viewed",
      value: "most-viewed",
    },
    {
      name: "Least viewed",
      value: "least-viewed",
    },
    {
      name: "Most read",
      value: "most-read",
    },
    {
      name: "Least read",
      value: "least-read",
    },
  ]);
  const [selected, setSelected] = useState(optionsArr[0]);

  const getBlogsList = async (type = selected.value) => {
    if (!hasMore.current) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/blogs/stats/all-time?type=${type}&cursor=${scroll.cursor}&limit=${limit}` : `/blogs/stats/all-time?type=${type}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs?.length) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null }));
        hasMore.current = result.data.cursor ? true : false;
      } else {
        hasMore.current = false;
      }
    } catch (err) {
      console.error(err);
      hasMore.current = false;
    } finally {
      setIsLoading(false);
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSelectionChange = (item) => {
    setIsLoading(true);
    setDefaultLoader(true);
    setSelected(item);

    setScroll((prev) => ({ ...prev, loading: true, cursor: null }));
    hasMore.current = true;
    setBlogs([]);
    getBlogsList(item.value);

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);
    loaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
      loaderTimeout.current = null;
    }, 200);
  };

  const sentinel = useInfiniteScroll({
    loadMore: getBlogsList,
    hasMore: hasMore.current,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    setBlogs([]);
    getBlogsList(selected.value);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1">
        <div className="margin-27 flex items-start justify-between" style={{ marginTop: 0, marginInline: 0 }}>
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex flex-wrap">{formatUTCToLocalDate(userInfo.createdAt)} - Today (UTC)</div>
              </div>
            </div>
          </div>
          <ActionBtn isLoading={isLoading || defaultLoader} optionsArr={optionsArr} selected={selected} handleSelectionChange={handleSelectionChange} />
        </div>

        <div>
          <table className="w-full table-fixed h-fit border-collapse" style={{ border: "0" }}>
            <thead className="sticky custom-bg-8 height-3 top-2 text-left display-[table-header-group] bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
              <tr>
                <th className="w-full min-w-full padding-42 color-4 custom-fs-1 line20 font-normal">
                  <span>Story</span>
                </th>
                {/* <th className="width100 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal"></th> */}
                <th className="width101 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal">
                  <span>Views</span>
                </th>
                <th className="width101 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal">
                  <span>Reads</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading && !defaultLoader && blogs.length > 0 && (
                <>
                  {blogs.map((item) => (
                    <ListItem key={item._id} blog={item} />
                  ))}
                  {hasMore.current && <tr style={{ height: "1px" }} ref={sentinel}></tr>}
                </>
              )}
              {(isLoading || defaultLoader) && Array.from({ length: 3 }).map((_, i) => <ListItemLoader key={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTimeSection;
