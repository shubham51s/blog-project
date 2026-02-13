import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";

function SavedLists() {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState({ ...userInfo, lists: [], publicLists: [] });
  const { requestHandler } = useRequestHandler();
  const isMounted = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef();

  const fetchSavedLists = async (skip) => {
    try {
      const response = await requestHandler(`/list/toggle-save/get-saved-lists?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists) {
        if (lists.length === 0) {
          // setLists(result.data.lists);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  const filterOutDeletedList = (listId) => {
    // const updatedList = lists.filter((item) => item._id !== listId);
    // setLists(updatedList);
  };

  const filterOutUnsavedLists = (listId) => {
    const updatedList = lists.filter((item) => item._id !== listId);
    setLists(updatedList);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchSavedLists(0);
    }

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        defaultLoaderTimeout.current = true;
      }, 300);
    }
  }, []);

  return (
    <>
      <div>{(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}</div>
      <div>{!defaultLoader && !isLoading && lists.map((item) => <ListComp key={item._id} user={user} setUser={setUser} item={item} filterOutDeletedList={filterOutDeletedList} />)}</div>
    </>
  );
}

export default SavedLists;
