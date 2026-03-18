import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/PublicationFollowers/Header";
import MainSection from "../../../components/PublicationFollowers/MainSection";
import RightSection from "../../../components/PublicationFollowers/RightSection";
import { useRequestHandler } from "../../../hooks/requestHandler";

function PublicationFollowers() {
  const { requestHandler } = useRequestHandler();
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const slug = "first-publication";

  const fetchPublicationBasicDetails = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/publication/${slug}`);
      const result = await response.json();

      console.log("result: ", result);
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
    fetchPublicationBasicDetails();
  }, []);

  return (
    <div className="height-14 flex flex-col justify-between">
      <div>
        <Header publication={publication} />

        <div className="width-18 flex m-auto justify-evenly">
          <MainSection publication={publication} />
          <RightSection publication={publication} />
        </div>
      </div>
      {/* footer was here */}
    </div>
  );
}

export default PublicationFollowers;
