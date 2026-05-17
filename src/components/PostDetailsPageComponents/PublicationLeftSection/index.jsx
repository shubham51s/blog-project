import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PublicationContext } from "../../../context/publication";
import { useTogglePublicationFollow } from "../../../hooks/togglePublicationFollow";

function PublicationLeftSection({ publication }) {
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
    <div className="bdr-5 w-full relative">
      <div className="height-55 w-full"></div>
      <div className="flex justify-center">
        <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
          <div className="height-3 flex items-center">
            <div className="width-32">
              <Link to={`/publication/${publication.slug}`} className="cursor-pointer m-0 p-0 no-underline">
                <h2 className="line-h-8 font-3 font-medium color-3 p-0 m-0">
                  <div className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden">{publication.name}</div>
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {publication && (
          <div className="absolute top-1 width-17 transition-all duration-300 linear opacity-100 pointer-none">
            <div className="flex justify-center">
              <div className="margin-27 min-w-0 w-full custom-max-w-1" style={{ marginBlock: 0 }}>
                <div className="width-30 flex items-start flex-col">
                  <Link to={`/publication/${publication.slug}`} className="no-underline p-0 m-0">
                    <div className="relative">
                      <img src={publication.profileImg} className="width-31 aspect-square border-radius-5 block align-middle" />
                    </div>
                  </Link>
                  <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                  <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0">
                    <span>{publication.description}</span>
                  </p>
                  <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                  <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                    {!followingPublication[publication._id] && !isPublicationLoader && (
                      <button onClick={handleFollowPublication} disabled={isLoading} className="underline cursor-pointer m-0 p-0">
                        Follow publication
                      </button>
                    )}
                    {followingPublication[publication._id] && !isPublicationLoader && (
                      <button onClick={handleUnfollowPublication} disabled={isLoading} className="cursor-pointer m-0 p-0">
                        Following
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicationLeftSection;
