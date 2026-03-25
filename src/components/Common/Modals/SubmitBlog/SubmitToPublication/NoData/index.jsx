import React from "react";
import { Link } from "react-router-dom";

function NoPublicationData({ activeTab }) {
  return (
    <div className="bg-10 margin60 padding71 h-full w-full flex justify-center">
      <div className="custom-gap-7 flex flex-col items-center justify-center">
        {activeTab === 0 && <p className="font-10 color-3 line-h-8 font-normal m-0">You are not contrubuting to any publications.</p>}
        {activeTab === 1 && <p className="font-10 color-3 line-h-8 font-normal m-0">You are not following to any publications.</p>}

        {activeTab === 0 && (
          <Link to="/new-publication" target="_blank" rel="noopener noreferrer" className="custom-py-2 custom-px-2 text-center border-radius-9 custom-bg-1 bdr-6 color-2 line20 custom-fs-1 font-normal">
            Create publication
          </Link>
        )}
        {activeTab === 1 && (
          <Link to="/me/following/suggestions" target="_blank" rel="noopener noreferrer" className="custom-py-2 custom-px-2 text-center border-radius-9 custom-bg-1 bdr-6 color-2 line20 custom-fs-1 font-normal">
            Explore our recommendations
          </Link>
        )}
      </div>
    </div>
  );
}

export default NoPublicationData;
