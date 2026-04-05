import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ClappedUser from "../../ListDetailsComp/ClappedUsersList/ClappedUser";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { defaultLoaderTime } from "../../../constants/constant";

function ShowClapsComp({ clapDetails, setClapDetails, blog }) {
  const { requestHandler } = useRequestHandler();
  const limit = 20;
  const [isClose, setIsClose] = useState(false);
  const closeTimeout = useRef(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const initialTimeout = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const handleClose = () => {
    setIsClose(true);

    if (closeTimeout.current) clearTimeout(closeTimeout.current);

    closeTimeout.current = setTimeout(() => {
      setClapDetails((prev) => ({ ...prev, isShowClapsComp: false }));
    }, 300);
  };

  const getClappedUsersList = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/claps/users/${blog._id}?cursor=${scroll.cursor}&limit=${limit}` : `/claps/users/${blog._id}?limit=${limit}`;

      const response = await requestHandler(url);
      const result = await response.json();

      if (response.status === 200 && result?.data?.usersList) {
        setClapDetails((prev) => ({ ...prev, clappedUsers: [...prev.clappedUsers, ...result.data.usersList], clappedUsersCount: result.data.totalCount || 0 }));
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getClappedUsersList,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (clapDetails.clappedUsers.length === 0) {
      setIsInitialLoading(true);
      getClappedUsersList();

      // minimum loading time
      if (!initialTimeout.current) {
        initialTimeout.current = setTimeout(() => {
          setIsInitialLoading(false);
        }, defaultLoaderTime);
      }
    }
  }, []);

  return (
    <div onClick={() => handleClose()} className={`fixed inset-0 overflow-x-hidden overflow-y-auto flex justify-center items-center bg13 scroll-smooth z-[800] transition-all duration-300 linear ${isClose ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
      {!isInitialLoading && clapDetails.clappedUsers.length > 0 && (
        <div className="mb-auto padding64">
          <div onClick={(e) => e.stopPropagation()} className="width63 padding-44">
            <div className="margin-17 text-center flex flex-col" style={{ marginTop: 0 }}>
              <h2 className="font-3 line-h-8 font-semibold tracking-normal color-3 m-0">{`${clapDetails.totalClaps} ${clapDetails.totalClaps > 1 ? "claps" : "clap"} from ${clapDetails.clappedUsersCount} people for " ${blog.previewTitle}"`}</h2>
            </div>
            <div className="">
              {clapDetails.clappedUsers.map((item) => (
                <ClappedUser item={item} key={item.user._id} />
              ))}
              {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
            </div>
          </div>
        </div>
      )}

      {/* loader */}
      {(isInitialLoading || clapDetails.clappedUsers.length === 0) && (
        <div className="mb-auto padding64">
          <div onClick={(e) => e.stopPropagation()} className="width63 overflow-hidden padding-44">
            <Skeleton height={40} width={23434} className="mb-10" />
            <div className="">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="padding-33 flex items-start justify-between" key={i} style={{ paddingInline: 0 }}>
                  <div className="width64 flex items-start overflow-hidden">
                    <div className="padding-7" style={{ paddingLeft: 0 }}>
                      <Skeleton circle className="relative height-2 aspect-square" />
                    </div>
                    <div className="flex flex-col items-start gap-4 grow">
                      <Skeleton height={20} width={343434} className="w-full" />

                      <Skeleton height={20} width={343434} className="w-full" />
                    </div>
                  </div>

                  <div className="padding50 width65 text-right" style={{ paddingRight: 0 }}>
                    <Skeleton className="padding-20 padding-28 width-24 border-radius-7" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* <div className="flex self-start grow-0 shrink-0 basis-auto relative bg-red-500"> */}
      <div className="absolute top7 right6">
        <div className="absolute topRight1">
          <button className="cursor-pointer m-0 p-0 width58 aspect-square color-6 transition-all duration-200 linear opacity-[0.45] hover:opacity-[0.55]">
            <IoMdClose className="w-full h-full" />
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ShowClapsComp;
