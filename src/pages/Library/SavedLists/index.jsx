import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import SavedListItem from "../../../components/LibraryComp/SavedListItem";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function SavedLists() {
  const { requestHandler } = useRequestHandler();
  const limit = 8;
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getSavedLists = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/list/toggle-save/get-saved-lists?cursor=${scroll.cursor}&limit=${limit}` : `/list/toggle-save/get-saved-lists?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists?.length) {
        setLists((prev) => [...prev, ...result.data.lists]);
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
    loadMore: getSavedLists,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getSavedLists();

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      <div>
        {(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}
        {!defaultLoader && !isLoading && lists.length > 0 && (
          <>
            {lists.map((item) => (
              <SavedListItem key={item._id} item={item.list} />
            ))}
            {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
          </>
        )}
      </div>

      {/* no data */}
      {!defaultLoader && !isLoading && lists.length === 0 && (
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
