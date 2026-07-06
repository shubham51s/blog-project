import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { formatNumberCompact } from "../../../../utils/common";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { PublicationContext } from "../../../../context/publication";
import { useTogglePublicationFollow } from "../../../../hooks/togglePublicationFollow";

function PublicationSection({ publication }) {
  const { followingPublication, isPublicationLoader } = useContext(PublicationContext);
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowPublication = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      await followPublication(params);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowPublication = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      await unfollowPublication(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {publication && (
        <div className="custom-margin-b-1">
          <div className="flex items-start">
            <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
              <div className="">
                <Link to={`/publication/${publication.slug}`}>
                  <div className="relative">
                    <img loading="lazy" src={publication.profileImg} className="width-15 aspect-square border-radius-5" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col grow shrink-0 basis-auto">
              <div className="width-37">
                <Link to={`/publication/${publication.slug}`} className="m-0 p-0 cursor-pointer flex items-center no-underline">
                  <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
                    <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                      {`Published in ${publication.name}`}
                    </span>
                  </h2>
                </Link>
                <div className="flex items-baseline margin-16 font-normal" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div className="grow-0 shrink-0 basis-auto">
                    <span className="custom-fs-1 color-4 custom-line-h-1">
                      <Link to={`/publication/${publication.slug}/followers`} className="cursor-pointer m-0 p-0 no-underline hover:underline">{`${formatNumberCompact(publication.stats.followers)} followers`}</Link>
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex">
                    <span className="margin-16" style={{ marginBlock: 0 }}>
                      <span className="custom-fs-1 color-4 custom-line-h-1">·</span>
                    </span>
                    <Link to={`/${publication.lastPublished.slug}`} className="cursor-pointer m-0 p-0 no-underline hover:underline">{`Last published ${formatUTCToLocalDate(publication.lastPublished.createdAt)}`}</Link>
                  </div>
                </div>
                <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
                  <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                    <span className="break-words">{publication.description}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex">
                {!isPublicationLoader && (
                  <>
                    {followingPublication[publication._id] && (
                      <button onClick={handleUnfollowPublication} disabled={isLoading} className="bdr17-hover padding-37 padding-38 border-radius-8 cursor-pointer flex items-center justify-center m-0 transition-all duration-700 ease">
                        <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Following</span>
                      </button>
                    )}
                    {!followingPublication[publication._id] && (
                      <button onClick={handleFollowPublication} disabled={isLoading} className="bdr-7 padding-37 padding-38 border-radius-8 cursor-pointer flex items-center justify-center m-0">
                        <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicationSection;
