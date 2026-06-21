import React, { useContext, useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import CreateListBanner from "../../../components/LibraryComp/MyLists/CreateListBanner";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import { UserContext } from "../../../context/userContext";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function MyLists() {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState({ ...userInfo, lists: [], publicLists: [] });
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef();
  const [isShowListBanner, setIsShowListBanner] = useState(sessionStorage.getItem("isHideListBanner") ? false : true);
  const limit = 10;
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const fetchMyLists = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const response = await requestHandler("/list/my-lists");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists) {
        setLists((prev) => [...prev, ...result.data.lists]);
        // pagination removed for now
        // setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
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

  const filterOutDeletedList = (listId) => {
    const updatedList = lists.filter((item) => item._id !== listId);
    setLists(updatedList);
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchMyLists,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    fetchMyLists();

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {isShowListBanner && <CreateListBanner setIsShowListBanner={setIsShowListBanner} />}
      <div>{(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}</div>
      <div>{!defaultLoader && !isLoading && lists.map((item) => <ListComp key={item._id} user={user} setUser={setUser} item={item} filterOutDeletedList={filterOutDeletedList} />)}</div>
      <div>{!defaultLoader && !isLoading && lists.length > 0 && scroll.hasMore && false && <div ref={sentinel} style={{ height: "1px" }}></div>}</div>
    </>
  );
}

export default MyLists;
