import React from "react";
import { useParams } from "react-router-dom";
import PublicationDetails from ".";

function PublicationDetailsWrapper() {
  const { slug } = useParams();

  return <PublicationDetails key={slug} />;
}

export default PublicationDetailsWrapper;
