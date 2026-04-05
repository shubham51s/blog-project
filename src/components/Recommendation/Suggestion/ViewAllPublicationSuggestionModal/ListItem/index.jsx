import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToggleUserFollow } from "../../../../../hooks/toggleUserFollow";
import { UserContext } from "../../../../../context/userContext";
import { PublicationContext } from "../../../../../context/publication";
import { useTogglePublicationFollow } from "../../../../../hooks/togglePublicationFollow";

function ListItem({ item }) {
  const { isPublicationLoader, followingPublication } = useContext(PublicationContext);
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: item._id,
        name: item.name,
      };
      await followPublication(params);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: item._id,
        name: item.name,
      };
      await unfollowPublication(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {item && (
        <div className="margin60 flex">
          <Link to={`/publication/${item.slug}`} className="cursor-pointer list-none">
            <div className="relative">
              <img src={item.profileImg} className="width-15 aspect-square rounded-full" />
              <div className="absolute top-0 boxShadow7 width-15 aspect-square rounded-full"></div>
            </div>
          </Link>
          <div className="padding82 w-full flex justify-between">
            <div className="w-full flex flex-col justify-center">
              <div className="flex items-center">
                <Link to={`/publication/${item.slug}`} className="cursor-pointer m-0 no-underline p-0">
                  <h2 className="height-15 font-10 font-medium color-3 line20 m-0 line-clamp-2">{item.name}</h2>
                </Link>
              </div>
              {item.description && (
                <Link to={`/publication/${item.slug}`} className="cursor-pointer m-0 no-underline p-0">
                  <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0">{item.description}</p>
                  </div>
                </Link>
              )}
            </div>

            {!isPublicationLoader && (
              <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
                {followingPublication[item._id] && (
                  <button onClick={handleUnfollow} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${isLoading ? "opacity-75" : "opacity-100"}`}>
                    <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Following</div>
                  </button>
                )}
                {!followingPublication[item._id] && (
                  <button onClick={handleFollow} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease  ${isLoading ? "opacity-75" : "opacity-100"}`}>
                    <div className="color-3 custom-fs-1 line20 font-normal">Follow</div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListItem;
