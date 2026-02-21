import React, { useContext, useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import CreateListBanner from "../../../components/LibraryComp/MyLists/CreateListBanner";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import { UserContext } from "../../../context/userContext";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import { defaultLoaderTime } from "../../../constants/constant";

function MyLists() {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState({ ...userInfo, lists: [], publicLists: [] });
  const { requestHandler } = useRequestHandler();
  const isMounted = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef();
  const [isShowListBanner, setIsShowListBanner] = useState(sessionStorage.getItem("isHideListBanner") ? false : true);

  const fetchMyLists = async (skip) => {
    try {
      const response = await requestHandler(`/list/my-lists?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists) {
        if (lists.length === 0) {
          setLists(result.data.lists);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  const filterOutDeletedList = (listId) => {
    const updatedList = lists.filter((item) => item._id !== listId);
    setLists(updatedList);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchMyLists(0);
    }

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        defaultLoaderTimeout.current = true;
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {isShowListBanner && <CreateListBanner setIsShowListBanner={setIsShowListBanner} />}

      <div>{(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}</div>

      <div>{!defaultLoader && !isLoading && lists.map((item) => <ListComp key={item._id} user={user} setUser={setUser} item={item} filterOutDeletedList={filterOutDeletedList} />)}</div>
    </>
  );
}

export default MyLists;
