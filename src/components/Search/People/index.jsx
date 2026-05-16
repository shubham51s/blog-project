import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import ListLoader from "./ListItem/skeleton";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useOutletContext } from "react-router-dom";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { defaultLoaderTime } from "../../../constants/constant";
import NoContent from "../NoContent";

function PeopleSection() {
  const { requestHandler } = useRequestHandler();
  const search = useOutletContext();
  const limit = 8;
  const loaderTimeout = useRef(null);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getUsers = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/users/search-users?search=${search}&cursor=${scroll.cursor}&limit=${limit}` : `/users/search-users?search=${search}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users?.length) {
        setUsers((prev) => [...prev, ...result.data.users]);
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
    loadMore: getUsers,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getUsers();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {(isLoading || defaultLoader) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}

      {!isLoading && !defaultLoader && users.length > 0 && (
        <>
          {users.map((item) => (
            <ListItem item={item} key={item._id} />
          ))}
          {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
        </>
      )}

      {!isLoading && !defaultLoader && users.length === 0 && <NoContent />}
    </>
  );
}

export default PeopleSection;
