import React, { useEffect, useRef, useState } from "react";
import HeaderSection from "../../../components/PublicationDetails/Header";
import NoData from "../../../components/PublicationDetails/NoData";
import { useRequestHandler } from "../../../hooks/requestHandler";
import NotFoundComp from "../../../components/Common/NotFound";
import Spinner from "../../../components/Common/Spinner";
import { useParams } from "react-router-dom";
import HeaderLoader from "../../../components/PublicationDetails/Header/skeleton";
import Blogs from "../../../components/PublicationDetails/BlogSection";

function PublicationDetails() {
  const { requestHandler } = useRequestHandler();
  const loaderTimeout = useRef(null);
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const { slug } = useParams();

  const fetchPublicationDetails = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/publication/${slug}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publication) {
        setPublication(result.data.publication);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicationDetails();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, 100);
    }
  }, []);

  return (
    <>
      {((!isLoading && !defaultLoader && publication) || isLoading || defaultLoader) && (
        <div className="flex flex-col justify-between height-14">
          <div>
            {(isLoading || defaultLoader) && <HeaderLoader />}
            {!isLoading && !defaultLoader && <HeaderSection publication={publication} setPublication={setPublication} />}
            <Blogs publication={publication} />
          </div>
        </div>
      )}

      {/* error  */}
      {!isLoading && !defaultLoader && !publication && <NotFoundComp />}
    </>
  );
}

export default PublicationDetails;
