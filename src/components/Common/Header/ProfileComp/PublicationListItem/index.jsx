import React from "react";
import { Link } from "react-router-dom";

function PublicationListItem({ publication, closePopup }) {
  return (
    <>
      {publication && (
        <Link to={`/publication/${publication.slug}`} onClick={closePopup} className="color-3 cursor-pointer text-left m-0 p-0 group">
          <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
            <div className="flex items-center custom-gap-2">
              <div className="relative shrink-0">
                <img src={publication.profileImg} className="height-12 aspect-square br13 align-middle" />
                <div className="absolute top-0 height-12 aspect-square br13 boxShadow7"></div>
              </div>
              <div className="flex overflow-hidden transition-all ease duration-75 opacity-[0.85] group-hover:opacity-100">
                <p title={publication.name} className="height-6 truncate custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                  {publication.name}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default PublicationListItem;
