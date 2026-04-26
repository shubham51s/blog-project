import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../constants/constant";
import Spinner from "../../Common/Spinner";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function NotificationSection() {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getNotifications = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/notification/all?cursor=${scroll.cursor}&limit=${limit}` : `/notification/all?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.notifications) {
        setNotifications((prev) => [...prev, ...result.data.notifications]);
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
    loadMore: getNotifications,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getNotifications();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <main className="width-20 grow shrink basis-auto">
      <div className="flex justify-center">
        <div className="margin-12 w-full min-w-0 max-width-2">
          <div>
            {/* heading */}
            <div className="margin56 margin76">
              <div className="margin57">
                <div>
                  <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-all font-medium line-clamp-1 m-0 color-3">Notifications</h1>
                </div>
              </div>
              <div className="relative boxShadow10 overflow-hidden">
                <div className="flex items-center overflow-y-hidden overflow-x-auto">
                  <div className="w-full flex justify-start">
                    {/* map */}
                    <div className="flex gap13 margin-21" style={{ marginBlock: 0, marginLeft: 0 }}>
                      <div className="min-w-max bdr-7 padding-42" style={{ borderTop: 0, borderInline: 0 }}>
                        <button className="p-0 m-0 cursor-pointer">
                          <p className="color-3 custom-fs-1 line20 font-normal m-0">
                            <span>All</span>
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content */}
            <div>
              {!isLoading && !defaultLoader && notifications.length > 0 && (
                <>
                  {notifications.map((item) => (
                    <ListItem key={item._id} item={item} />
                  ))}

                  {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </>
              )}

              {!isLoading && !defaultLoader && notifications.length === 0 && (
                <div className="w-full flex items-center justify-start margin-10 padding72 padding59">
                  <p className="custom-fs-1 color-4 line20 font-normal m-0">You're all caught up.</p>
                </div>
              )}

              {(isLoading || defaultLoader) && (
                <div className="margin72 flex items-center justify-center padding-32" style={{ marginBottom: 0, paddingBottom: 0 }}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotificationSection;
