import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FollowingContext } from "../../../../../context/followingContext";
import { UserContext } from "../../../../../context/userContext";
import { useToggleUserFollow } from "../../../../../hooks/toggleUserFollow";

function ListItem({ item }) {
  const [user, setUser] = useState(item);
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const { userInfo } = useContext(UserContext);
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
        <div className="w-full h-full">
          <div className="padding-42 flex items-start justify-between w-full">
            <div className="flex">
              <Link to={`/profile/${user.username}`} className="cursor-pointer no-underline">
                <div className="relative">
                  <img loading="lazy" src={user.profileImg} className="width-11 aspect-square rounded-full" />
                  <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
                </div>
              </Link>
              <div className="margin-16" style={{ marginBlock: 0 }}>
                <Link to={`/profile/${user.username}`} className="cursor-pointer no-underline">
                  <h2 className="height-15 break-words line-clamp-2 font-bold font-10 color-3 line20 m-0">{user.name}</h2>
                </Link>
                <Link to={`/profile/${user.username}`} className="cursor-pointer no-underline">
                  <div className="margin44 break-words">{user.bio && <p className="height-15 line-clamp-2 font-4 color-4 line20 font-normal m-0">{user.bio}</p>}</div>
                </Link>
              </div>
            </div>

            <div>
              {userInfo._id !== user._id && !isFetchUserLoader && (
                <div className="inline-block">
                  {!followingUsers[user._id] && (
                    <button onClick={handleFollowUser} disabled={isLoading} className="bdr-7 padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
                    </button>
                  )}
                  {followingUsers[user._id] && (
                    <button onClick={handleUnfollowUser} disabled={isLoading} className="bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">Following</span>
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
