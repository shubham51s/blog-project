import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import Spinner from "../../Common/Spinner";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function MainSection({ publication }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const isMounted = useRef(null);
  const limit = 20;
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getFollowingUsers = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/publication/follow/users/${publication._id}?cursor=${scroll.cursor}&limit=${limit}` : `/publication/follow/users/${publication._id}?limit=${limit}`;

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
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getFollowingUsers,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    if (publication && !isMounted.current) {
      isMounted.current = true;
      getFollowingUsers();
    }
  }, [publication]);

  return (
    <main className="grow shrink basis-auto width-20">
      {!isLoading && (
        <div className="min-h-full custom-bg-8">
          <div className="flex justify-center">
            <div className="w-full min-w-0 max-width-2 margin-12">
              <div className="margin56">
                <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">
                  {publication.stats.followers} {publication.stats.followers > 1 ? " followers" : " follower"}
                </h2>
              </div>

              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>

              <div>
                <ul className="p-0 list-none m-0">
                  {users.map((item) => (
                    <ListItem item={item} key={item._id} />
                  ))}
                  {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </ul>
              </div>

              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="min-h-full custom-bg-8 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </main>
  );
}

export default MainSection;
