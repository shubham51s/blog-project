import React from "react";
import { useParams } from "react-router-dom";
import PublicationSettings from ".";

function PublicationSettingsWrapper() {
  const { slug } = useParams();

  return <PublicationSettings key={slug} />;
}

export default PublicationSettingsWrapper;
