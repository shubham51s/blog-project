import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../hooks/requestHandler";
import NotFoundComp from "../../components/Common/NotFound";
import { useParams } from "react-router-dom";
import HeaderSection from "../../components/TopicDetails/Header";
import HeaderLoader from "../../components/TopicDetails/Header/skeleton";
import Blogs from "../../components/TopicDetails/BlogSection";

function TopicDetails() {
  const { requestHandler } = useRequestHandler();
  const loaderTimeout = useRef(null);
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const { slug } = useParams();

  const fetchTopicDetails = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/topic/${slug}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.topic) {
        setTopic(result.data.topic);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicDetails();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, 100);
    }
  }, []);

  return (
    <>
      {((!isLoading && !defaultLoader && topic) || isLoading || defaultLoader) && (
        <div className="flex flex-col justify-between height-14">
          <div>
            {(isLoading || defaultLoader) && <HeaderLoader />}
            {!isLoading && !defaultLoader && <HeaderSection topic={topic} />}
            <Blogs topic={topic} />
          </div>
        </div>
      )}

      {/* error  */}
      {!isLoading && !defaultLoader && !topic && <NotFoundComp />}
    </>
  );
}

export default TopicDetails;
