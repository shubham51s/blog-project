import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/PublicationDetails/Header";
import NoData from "../../../components/PublicationDetails/NoData";
import { useRequestHandler } from "../../../hooks/requestHandler";
import NotFoundComp from "../../../components/Common/NotFound";
import Spinner from "../../../components/Common/Spinner";
import { useParams } from "react-router-dom";

function PublicationDetails() {
  const { requestHandler } = useRequestHandler();
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  return (
    <>
      {/* main section */}
      {!isLoading && publication && (
        <div className="flex flex-col justify-between height-14">
          <div>
            <HeaderSection publication={publication} setPublication={setPublication} />

            <NoData />
          </div>
        </div>
      )}

      {/* loader */}
      {isLoading && (
        <div className="height-14 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* error  */}
      {!isLoading && !publication && <NotFoundComp />}
    </>
  );
}

export default PublicationDetails;
