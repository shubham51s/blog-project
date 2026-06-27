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
  const [scroll, setScroll] = useState({
    hasMore: true,
    loader: true,
    cursor: null,
  });

  const getMutedUsers = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loader: true }));

    try {
      const url = scroll.cursor ? `/mute/users?cursor=${scroll.cursor}&limit=${limit}` : `/mute/users?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users) {
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
      setScroll((prev) => ({ ...prev, loader: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getMutedUsers,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loader,
  });

  useEffect(() => {
    getMutedUsers();

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
              <h1 className="font-3 line-h-8 font-semibold color-3 m-0">Muted {usersCount} writers</h1>
            </div>
            <div>
              {!isLoading && !defaultLoader && users.length > 0 && (
                <>
                  {users.map((item) => (
                    <ListItem key={item._id} item={item.target} onMuteStatusChange={onMuteStatusChange} />
                  ))}
                  {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </>
              )}
            </div>
            {(isLoading || defaultLoader) && Array.from({ length: 3 }).map((_, i) => <Loader key={i} />)}
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
