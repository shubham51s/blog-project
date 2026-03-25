import React from "react";
import SubmitToPublication from "./SubmitToPublication";

function SubmitBlogModal({ publication }) {
  const handlePublicationSelection = (publication) => {
    console.log("publication: ", publication);
  };

  return (
    <div className="custom-bg-8 fixed overflow-x-hidden overflow-y-auto text-center top-0 left-0 right-0 min-h-screen flex z-[900]">
      <SubmitToPublication handlePublicationSelection={handlePublicationSelection} />
    </div>
  );
}

export default SubmitBlogModal;
