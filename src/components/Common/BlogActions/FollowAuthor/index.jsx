import React, { useContext, useState } from "react";
import { FollowingContext } from "../../../../context/followingContext";
import { UserContext } from "../../../../context/userContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function FollowAuthorBtn({ user }) {
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { userInfo } = useContext(UserContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      await followUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      await unfollowUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user && userInfo._id !== user._id && !isFetchUserLoader && user._id && user.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!followingUsers[user._id] && (
            <button onClick={handleFollowUser} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Follow author
            </button>
          )}

          {followingUsers[user._id] && (
            <button onClick={handleUnfollowUser} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Unfollow author
            </button>
          )}
        </li>
      )}
    </>
  );
}

export default FollowAuthorBtn;
