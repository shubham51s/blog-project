import React, { useContext, useState } from "react";
import { PublicationContext } from "../../../../context/publication";
import { useTogglePublicationFollow } from "../../../../hooks/togglePublicationFollow";

function FollowPublicationBtn({ publication }) {
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
      {publication && !isPublicationLoader && publication._id && publication.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!followingPublication[publication._id] && (
            <button onClick={handleFollowPublication} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Follow publication
            </button>
          )}

          {followingPublication[publication._id] && (
            <button onClick={handleUnfollowPublication} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Unfollow publication
            </button>
          )}
        </li>
      )}
    </>
  );
}

export default FollowPublicationBtn;
