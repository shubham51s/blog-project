import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTogglePublicationFollow } from "../../../../hooks/togglePublicationFollow";

function ListItem({ item }) {
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [publication, setPublication] = useState(item);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowPublication = async () => {
    setIsLoading(true);
    setPublication((prev) => ({ ...prev, isFollowing: true }));
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      const isSuccess = await followPublication(params);
      if (!isSuccess) setPublication((prev) => ({ ...prev, isFollowing: false }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowPublication = async () => {
    setIsLoading(true);
    setPublication((prev) => ({ ...prev, isFollowing: false }));
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      const isSuccess = await unfollowPublication(params);
      if (!isSuccess) setPublication((prev) => ({ ...prev, isFollowing: true }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full margin77" style={{ marginTop: 0 }}>
      <div>
        <div className="padding87">
          <div className="flex items-center justify-between">
            <Link to={`/publication/${publication.slug}`} className="flex items-center">
              <div className="relative shrink-0">
                <img loading="lazy" src={publication.profileImg} className="width-15 aspect-square border-radius-5" />
                <div className="absolute top-0 width-15 aspect-square border-radius-5 boxShadow7"></div>
              </div>
              <div className="padding95 padding96">
                <div className="flex items-center">
                  <h2 className="font-10 font-semibold color-3 line20 m-0">
                    <span className="truncate">{publication.name}</span>
                  </h2>
                </div>
                <div className="margin44">
                  <p className="height-15 color-4 custom-fs-1 line20 font-normal m-0 line-clamp-2">{publication.description}</p>
                </div>
              </div>
            </Link>
            <div className="width108 flex justify-end">
              {publication && (
                <>
                  {!publication.isFollowing && (
                    <button onClick={handleFollowPublication} disabled={isLoading} className="padding-20 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-800 ease bdr-7">
                      <span className="color-3 custom-fs-1 line20 font-medium break-keep">Follow</span>
                    </button>
                  )}
                  {publication.isFollowing && (
                    <button onClick={handleUnfollowPublication} disabled={isLoading} className="padding-20 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-800 ease bdr17-hover">
                      <span className="color-3 custom-fs-1 line20 font-medium break-keep">Following</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
