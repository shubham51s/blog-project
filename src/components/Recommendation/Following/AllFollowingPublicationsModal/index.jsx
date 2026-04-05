import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../../constants/constant";
import Loader from "./ListItem/skeleton";
import ListItem from "./ListItem";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function ViewAllFollowingPublications({ handleClosePublicationModal, count, onPublicationFollowStatusChange }) {
  const { requestHandler } = useRequestHandler();
  const limit = 20;
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [scrollLoader, setScrollLoader] = useState(true);
  const [cursor, setCursor] = useState(null);

  const getMyFollowings = async () => {
    if (!hasMore) return;

    setScrollLoader(true);
    try {
      const url = cursor ? `/publication/follow/my-followings?cursor=${cursor}&limit=${limit}` : `/publication/follow/my-followings?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      console.log("result: ", result);

      if (response?.status === 200 && result?.data?.following) {
        setPublications((prev) => [...prev, ...result.data.following]);
        setCursor(result.data.cursor || null);
        setHasMore(result.data.cursor ? true : false);
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

  const sentinal = useInfiniteScroll({
    loadMore: getMyFollowings,
    hasMore,
    scrollLoader,
  });

  useEffect(() => {
    getMyFollowings(0);

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div onClick={handleClosePublicationModal} className="fixed inset-0 z-[800] overflow-y-auto overflow-x-hidden scroll-smooth bg13 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="padding-3 my-auto">
        <div className="flex justify-center">
          <div className="margin-27 w-full min-w-0 max-width-2 padding90" style={{ marginBlock: 0 }}>
            <div className="padding-42 text-center">
              <h1 className="font-3 line-h-8 font-medium color-3 m-0">Following {count} publications</h1>
            </div>
            <div>
              {!isLoading && !defaultLoader && publications.map((item) => <ListItem key={item._id} item={item.followee} onPublicationFollowStatusChange={onPublicationFollowStatusChange} />)}
              {!isLoading && !defaultLoader && hasMore && <div ref={sentinal} style={{ height: "1px" }}></div>}
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

export default ViewAllFollowingPublications;
