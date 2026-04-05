import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../../constants/constant";
import Loader from "./ListItem/skeleton";
import ListItem from "./ListItem";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function ViewAllMutedUsers({ handleCloseUserModal, usersCount, onMuteStatusChange }) {
  const { requestHandler } = useRequestHandler();
  const limit = 20;
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [scrollLoader, setScrollLoader] = useState(true);
  const [cursor, setCursor] = useState(null);

  const fetchMutedUsers = async () => {
    if (!hasMore) return;

    setScrollLoader(true);

    try {
      const url = cursor ? `/mute/users?cursor=${cursor}&limit=${limit}` : `/mute/users?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users) {
        setUsers((prev) => [...prev, ...result.data.users]);
        setHasMore(result.data.cursor ? true : false);
        setCursor(result.data.cursor || null);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setScrollLoader(false);
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchMutedUsers,
    hasMore,
    scrollLoader,
  });

  useEffect(() => {
    fetchMutedUsers();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div onClick={handleCloseUserModal} className="fixed inset-0 z-[800] overflow-y-auto overflow-x-hidden scroll-smooth bg13 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="padding-3 my-auto">
        <div className="flex justify-center">
          <div className="margin-27 w-full min-w-0 max-width-2 padding90" style={{ marginBlock: 0 }}>
            <div className="padding-42 text-center">
              <h1 className="font-3 line-h-8 font-medium color-3 m-0">Muted {usersCount} writers</h1>
            </div>
            <div>
              {!isLoading && !defaultLoader && users.map((item) => <ListItem key={item._id} item={item.target} onMuteStatusChange={onMuteStatusChange} />)}
              {!isLoading && !defaultLoader && hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
            </div>
            {(isLoading || defaultLoader) && Array.from({ length: 5 }).map((_, i) => <Loader key={i} />)}
          </div>
        </div>
      </div>

      <div className="absolute right6 top7 z-22">
        <button className="cursor-pointer m-0 p-0 opacity-[0.75] transition-all duration-75 ease hover:opacity-100">
          <div className="width-25 aspect-square">
            <MdClose className="w-full h-full" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default ViewAllMutedUsers;
