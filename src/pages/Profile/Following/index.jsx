import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { Link, useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { formatNumberCompact } from "../../../utils/common";
import FollowingList from "../../../components/ProfileComp/FollowingSection";
import Spinner from "../../../components/Common/Spinner";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { defaultLoaderTime } from "../../../constants/constant";

function Following() {
  const { user, setUser } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [peopleFollowing, setPeopleFollowing] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 20;
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const fetchPeopleFollowingList = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/follow/following/${user._id}?cursor=${scroll.cursor}&limit=${limit}` : `/follow/following/${user._id}?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.following) {
        setPeopleFollowing((prev) => [...prev, ...result.data.following]);
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

  const handleActiveTabChange = (val) => {
    setActiveTabIndex(val);
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchPeopleFollowingList,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (user && isLoading) fetchPeopleFollowingList();
  }, [user]);

  useEffect(() => {
    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {user && !isLoading && !defaultLoader && (
        <div className="flex justify-center">
          <div className="margin-12 min-w-0 w-full max-width-2">
            <div className="margin56">
              <div className="flex items-center">
                <div className="inline-block max-w-[50%] padding50 truncate" style={{ paddingLeft: 0 }}>
                  <span className="font-4 color-3 line20 font-normal opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                    <Link to={`/profile/${user.username}`} className="no-underline cursor-pointer m-0 p-0">
                      {user.name}
                    </Link>
                  </span>
                </div>
                <div className="max-w-[50%] padding50 truncate flex items-center" style={{ paddingLeft: 0 }}>
                  <div className="inline-block width84 aspect-square color-3">
                    <MdOutlineKeyboardArrowRight className="w-full h-full" />
                  </div>
                  <span className="font-4 color-3 line20 font-normal">Following</span>
                </div>
              </div>

              <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}></div>
              <h2 className="letter-spacing-7 line-h-10 font-12 font-semibold color-3 m-0">{formatNumberCompact(user.followingCount)} following</h2>
            </div>

            <nav className="padding70 bdr-5" style={{ paddingBottom: 0, paddingInline: 0, borderTop: 0, borderInline: 0 }}>
              <div className={`inline-block custom-px-2 margin-18 ${activeTabIndex === 0 ? "bdr-7" : ""}`} style={{ borderTop: 0, borderInline: 0, marginLeft: 0 }}>
                <button onClick={() => handleActiveTabChange(0)} className="cursor-pointer p-0 m-0">
                  <h4 className={`font-4 line20 font-normal m-0 ${activeTabIndex === 0 ? "color-3" : "color-4"}`}>People</h4>
                </button>
              </div>
              {false && (
                <div className={`inline-block custom-px-2 ${activeTabIndex === 1 ? "bdr-7" : ""}`} style={{ borderTop: 0, borderInline: 0 }}>
                  <button onClick={() => handleActiveTabChange(1)} className="cursor-pointer p-0 m-0">
                    <h4 className={`font-4 line20 font-normal m-0 ${activeTabIndex === 1 ? "color-3" : "color-4"}`}>Publications</h4>
                  </button>
                </div>
              )}
            </nav>

            <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>

            <div>
              <div className="p-0 m-0">
                {peopleFollowing.map((item) => (
                  <FollowingList item={item} user={user} setUser={setUser} key={item._id} />
                ))}
                {peopleFollowing.length > 0 && scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {(!user || defaultLoader || isLoading) && (
        <div className="w-full grow flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Following;
