import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FollowingContext } from "../../../../context/followingContext";
import { UserContext } from "../../../../context/userContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function ListItem({ item }) {
  const [user, setUser] = useState(item?.user || null);
  const { isFetchUserLoader, followingUsers } = useContext(FollowingContext);
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
        <div className="h-full w-full">
          <div className="w-full flex justify-between items-start padding-42">
            <div className="flex">
              <Link to={`/profile/${user.username}`} className="cursor-pointer">
                <div className="relative">
                  <img loading="lazy" src={user.profileImg} className="width-11 aspect-square rounded-full" />
                  <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
                </div>
              </Link>
              <div className="margin-9" style={{ marginBlock: 0 }}>
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 p-0">
                  <h2 className="font-semibold break-words line-clamp-2 height-15 font-10 color-3 line20 m-0">{user.name}</h2>
                </Link>
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 p-0">
                  <div className="margin44 break-words">{user.bio && <p className="height-15 font-4 color-4 line20 font-normal m-0 line-clamp-2">{user.bio}</p>}</div>
                </Link>
              </div>
            </div>
            <div className="width-23">
              {!isFetchUserLoader && userInfo._id !== user._id && (
                <div className="inline-block">
                  {!followingUsers[user._id] && (
                    <button onClick={handleFollowUser} disabled={isLoading} className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
                    </button>
                  )}
                  {followingUsers[user._id] && (
                    <button onClick={handleUnfollowUser} disabled={isLoading} className="bdr17-hover padding-28 padding-27 border-radius-7 cursor-pointer m-0 transition-all duration-300 ease">
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
