import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import SavedListItem from "../../../components/LibraryComp/SavedListItem";
import { defaultLoaderTime } from "../../../constants/constant";

function SavedLists() {
  const { requestHandler } = useRequestHandler();
  const isMounted = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);

  const fetchSavedLists = async () => {
    try {
      const response = await requestHandler(`/list/toggle-save/get-saved-lists`);
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

  const filterUnsavedList = (listId) => {
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
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      <div>{(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}</div>

      <div>{!defaultLoader && !isLoading && lists.map((item) => <SavedListItem key={item._id} item={item} filterUnsavedList={filterUnsavedList} />)}</div>

      {/* no data */}
      {!defaultLoader && !isLoading && (
        <div className="text-center padding-42">
          <div className="padding-42 padding89">
            <h2 className="font-10 font-medium color-3 line20 m-0">No lists from others</h2>
          </div>
          <p className="color-4 custom-fs-1 line20 font-normal m-0">Save someone else's list and it will appear here.</p>
        </div>
      )}
    </>
  );
}

export default SavedLists;
