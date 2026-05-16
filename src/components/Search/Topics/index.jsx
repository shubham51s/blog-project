import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import ListLoader from "./ListItem/skeleton";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { defaultLoaderTime } from "../../../constants/constant";
import { useOutletContext } from "react-router-dom";
import NoContent from "../NoContent";

function TopicSection() {
  const { requestHandler } = useRequestHandler();
  const search = useOutletContext();
  const loaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      const response = await requestHandler(`/topic/search?search=${search}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.topics?.length) {
        setTopics(result.data.topics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopics();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div className="w-full flex flex-wrap">
      {(isLoading || defaultLoader) && Array.from({ length: 7 }).map((_, i) => <ListLoader key={i} />)}

      {!isLoading && !defaultLoader && topics.length > 0 && topics.map((item) => <ListItem item={item} key={item._id} />)}
      {!isLoading && !defaultLoader && topics.length === 0 && <NoContent />}
    </div>
  );
}

export default TopicSection;
