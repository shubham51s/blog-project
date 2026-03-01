import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import ListItemNew from "./ListItem";
import LoaderNew from "./ListItem/skeleton";

function ViewAllFollowingTopics({ handleCloseTopicModal, topicsCount, onToggleInterest }) {
  const { requestHandler } = useRequestHandler();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);

  const fetchMyFollowingTopics = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/topic/my-followings");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.topics) {
        setTopics(result.data.topics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFollowingTopics();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
        loaderTimeout.current = null;
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div onClick={handleCloseTopicModal} className="fixed inset-0 z-[800] overflow-y-auto overflow-x-hidden scroll-smooth bg13 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="padding-3 my-auto">
        <div className="flex justify-center">
          <div className="margin-27 w-full min-w-0 max-width-2 padding90" style={{ marginBlock: 0 }}>
            <div className="padding-42 text-center">
              <h1 className="font-3 line-h-8 font-semibold color-3 m-0">Following {topicsCount} Topics</h1>
            </div>
            <div>
              {!isLoading && !defaultLoader && topics.map((item) => <ListItemNew key={item._id} item={item} onToggleInterest={onToggleInterest} />)}
              {(isLoading || defaultLoader) && Array.from({ length: 5 }).map((_, i) => <LoaderNew key={i} />)}
            </div>
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

export default ViewAllFollowingTopics;
