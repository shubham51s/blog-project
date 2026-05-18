import React, { useContext, useState } from "react";
import { FollowingContext } from "../../../context/followingContext";
import { useToggleUserFollow } from "../../../hooks/toggleUserFollow";

function FollowBtn({ blog }) {
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isLoading, setIsLoading] = useState(false);

  const followAuthor = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: blog.author._id,
        name: blog.author.name,
      };
      await followUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowAuthor = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: blog.author._id,
        name: blog.author.name,
      };
      await unfollowUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isFetchUserLoader && (
        <>
          <div className="inline-block width-33"></div>
          <div className="inline-block">
            {followingUsers[blog.author._id] && (
              <button onClick={unfollowAuthor} disabled={isLoading} className="bdr17-hover padding-28 padding-20 border-radius-7 cursor-pointer flex justify-between items-center m-0 transition-all duration-700 ease">
                <span className="custom-fs-1 custom-line-h-1 font-medium w-full whitespace-nowrap">Following</span>
              </button>
            )}
            {!followingUsers[blog.author._id] && (
              <button onClick={followAuthor} disabled={isLoading} className="bdr-7 padding-28 padding-20 border-radius-7 cursor-pointer flex justify-between items-center m-0">
                <span className="custom-fs-1 custom-line-h-1 font-medium w-full whitespace-nowrap">Follow</span>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default FollowBtn;
