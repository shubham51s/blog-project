import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import SavedListItem from "../../../components/LibraryComp/SavedListItem";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useOutletContext } from "react-router-dom";
import NoContent from "../NoContent";

function ListSection() {
  const search = useOutletContext();
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

  const fetchSavedLists = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/list/search?search=${search}&cursor=${scroll.cursor}&limit=${limit}` : `/list/search?search=${search}&limit=${limit}`;
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
    loadMore: fetchSavedLists,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    fetchSavedLists();

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {(defaultLoader || isLoading) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}

      {!defaultLoader && !isLoading && lists.length > 0 && (
        <>
          {lists.map((item) => (
            <SavedListItem key={item._id} item={item} isRemove={false} />
          ))}

          {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
        </>
      )}

      {/* no data */}
      {!defaultLoader && !isLoading && lists.length === 0 && <NoContent />}
    </>
  );
}

export default ListSection;
