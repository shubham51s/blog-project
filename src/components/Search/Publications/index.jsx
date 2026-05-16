import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import ListLoader from "./ListItem/skeleton";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useOutletContext } from "react-router-dom";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { defaultLoaderTime } from "../../../constants/constant";
import NoContent from "../NoContent";

function PublicationSection() {
  const { requestHandler } = useRequestHandler();
  const search = useOutletContext();
  const limit = 1;
  const loaderTimeout = useRef(null);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [publications, setPublications] = useState([]);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getPublications = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/publication/search?search=${search}&cursor=${scroll.cursor}&limit=${limit}` : `/publication/search?search=${search}&limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications?.length) {
        setPublications((prev) => [...prev, ...result.data.publications]);
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
    loadMore: getPublications,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getPublications();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      {(isLoading || defaultLoader) && Array.from({ length: 4 }).map((_, i) => <ListLoader key={i} />)}

      {!isLoading && !defaultLoader && publications.length > 0 && (
        <>
          {publications.map((item) => (
            <ListItem item={item} key={item._id} />
          ))}
          {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
        </>
      )}

      {!isLoading && !defaultLoader && publications.length === 0 && <NoContent />}
    </>
  );
}

export default PublicationSection;
