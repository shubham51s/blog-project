import React from "react";
import { Link } from "react-router-dom";
import { formatNumberCompact } from "../../../../../../utils/common";

function PublicationListItem({ publication, isMember, handlePublicationSelection }) {
  return (
    <button onClick={() => handlePublicationSelection({ ...publication, isMember })} className="flex flex-col m-0 p-0 cursor-pointer border-radius-3 bdr-8">
      <div className="grow-0 shrink-0 basis-auto height-2 w-full flex flex-col overflow-hidden bg-10">{publication.coverImg && <img loading="lazy" src={publication.coverImg} className="w-full h-full object-cover object-center" />}</div>

      <div className="grow shrink-0 basis-auto flex flex-col custom-gap-5 padding-18 padding-19">
        <div className="flex custom-gap-5">
          <div className="relative">
            <img loading="lazy" src={publication.profileImg} className="border-radius-5 height-2 aspect-square" />
          </div>
          <div className="flex items-center justify-center text-left">
            <h2 className="height-15 font-10 color-3 font-medium line20 m-0 line-clamp-2">{publication.name}</h2>
          </div>
        </div>
        <div className="grow shrink-0 basis-auto flex text-left">
          <p className="height-15 color-3 line20 custom-fs-1 font-normal m-0 line-clamp-2">{publication.description}</p>
        </div>
        <div className="flex">
          <p className="font-4 line20 color-4 font-normal m-0">
            <Link to={`/publication/${publication.slug}/followers`} target="_blank" rel="noopener noreferrer">
              {formatNumberCompact(publication.stats.followers)} {publication.stats.followers > 1 ? "followers" : "follower"}
            </Link>
          </p>
        </div>
      </div>
    </button>
  );
}

export default PublicationListItem;
