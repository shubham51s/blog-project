import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { PublicationContext } from "../../../../context/publication";
import { useTogglePublicationFollow } from "../../../../hooks/togglePublicationFollow";

function PublicationListItem({ item, onPublicationFollowStatusChange = () => {} }) {
  const { followingPublication, isPublicationLoader } = useContext(PublicationContext);
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: item._id,
        name: item.name,
      };

      const isSuccess = await followPublication(params);
      if (isSuccess) onPublicationFollowStatusChange(true);
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

      const isSuccess = await unfollowPublication(params);
      if (isSuccess) onPublicationFollowStatusChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="margin60 flex">
      <Link to={`/publication/${item.slug}`} className="cursor-pointer list-none">
        <div className="relative">
          <img loading="lazy" src={item.profileImg} className="width-15 aspect-square br13" />
          <div className="absolute top-0 boxShadow7 width-15 aspect-square br13"></div>
        </div>
      </Link>
      <div className="padding82 w-full flex justify-between">
        <div className="w-full flex flex-col">
          <div className="flex items-center">
            <Link to={`/publication/${item.slug}`} className="cursor-pointer m-0 no-underline p-0">
              <h2 className="height-15 font-10 font-semibold color-3 line20 m-0 line-clamp-2">{item.name}</h2>
            </Link>
          </div>
          <Link to={`/publication/${item.slug}`} className="cursor-pointer m-0 no-underline p-0">
            <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
              <p className="custom-fs-1 color-4 line20 font-normal m-0">{item.description}</p>
            </div>
          </Link>
        </div>

        <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
          {!isPublicationLoader && followingPublication[item._id] && (
            <button onClick={handleUnfollow} disabled={isLoading} className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
              <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Following</div>
            </button>
          )}
          {!isPublicationLoader && !followingPublication[item._id] && (
            <button onClick={handleFollow} disabled={isLoading} className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
              <div className="color-3 custom-fs-1 line20 font-normal">Follow</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicationListItem;
