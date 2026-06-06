import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FollowingContext } from "../../../../context/followingContext";
import { UserContext } from "../../../../context/userContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function ListItem({ item }) {
  const { isFetchUserLoader, followingUsers } = useContext(FollowingContext);
  const { userInfo } = useContext(UserContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [user, setUser] = useState(item?.follower || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    await followUser(params);

    setIsLoading(false);
  };

  const handleUnfollowUser = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    await unfollowUser(params);

    setIsLoading(false);
  };

  return (
    <>
      {user && (
        <div className="margin60 flex">
          <Link to={`/profile/${user.username}`} className="cursor-pointer p-0 m-0">
            <div className="relative">
              <img loading="lazy" src={user.profileImg} className="width-15 aspect-square rounded-full" />
              <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
            </div>
          </Link>

          <div className="w-full padding82 flex items-center justify-between">
            <div className="w-full flex flex-col">
              <div className="flex items-center">
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 p-0">
                  <h2 className="line-clamp-2 height-15 font-10 font-medium color-3 line20 m-0">{user.name}</h2>
                </Link>
              </div>
              <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 p-0">
                {user.bio && (
                  <div className="w-full max-w-full margin44 break-words whitespace-pre-wrap">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0">{user.bio}</p>
                  </div>
                )}
              </Link>
            </div>

            <div className="width-23 flex items-start justify-end margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
              {!isFetchUserLoader && userInfo._id !== user._id && (
                <div className="inline-block">
                  {!followingUsers[user._id] && (
                    <button onClick={handleFollowUser} disabled={isLoading} className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">
                        <span className="">Follow</span>
                      </span>
                    </button>
                  )}
                  {followingUsers[user._id] && (
                    <button onClick={handleUnfollowUser} disabled={isLoading} className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">
                        <span className="">Following</span>
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListItem;
