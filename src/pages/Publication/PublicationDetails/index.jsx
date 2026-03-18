import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/PublicationDetails/Header";
import NoData from "../../../components/PublicationDetails/NoData";
import { useRequestHandler } from "../../../hooks/requestHandler";

function PublicationDetails() {
  const { requestHandler } = useRequestHandler();
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const slug = "first-publication";

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
    <div className="flex flex-col justify-between height-14">
      {publication && (
        <div>
          <HeaderSection publication={publication} setPublication={setPublication} />

          <NoData />
        </div>
      )}

      <div></div>
    </div>
  );
}

export default PublicationDetails;
