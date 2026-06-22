import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";
import { UserContext } from "../../../../context/userContext";

function ListItem({ item }) {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState(item);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);
    setUser((prev) => ({ ...prev, isFollowing: true }));
    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      const isSuccess = await followUser(params);
      if (!isSuccess) setUser((prev) => ({ ...prev, isFollowing: false }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setIsLoading(true);
    setUser((prev) => ({ ...prev, isFollowing: false }));
    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      const isSuccess = await unfollowUser(params);
      if (!isSuccess) setUser((prev) => ({ ...prev, isFollowing: true }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full margin77" style={{ marginTop: 0 }}>
      <div>
        <div className="padding87">
          <div className="flex items-center justify-between">
            <Link to={`/profile/${user.username}`} className="flex items-center">
              <div className="relative shrink-0">
                <img loading="lazy" src={user.profileImg} className="width-15 aspect-square rounded-full" />
                <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
              </div>
              <div className="padding95 padding96">
                <div className="flex items-center">
                  <h2 className="font-10 font-semibold color-3 line20 m-0">
                    <span className="truncate">{user.name}</span>
                  </h2>
                </div>
                <div className="margin44">
                  <p className="height-15 color-4 custom-fs-1 line20 font-normal m-0 line-clamp-2">{user.bio}</p>
                </div>
              </div>
            </Link>
            <div className="width108 flex justify-end">
              {user && userInfo._id !== user._id && (
                <>
                  {!user.isFollowing && (
                    <button onClick={handleFollowUser} disabled={isLoading} className="padding-20 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-500 ease bdr-7">
                      <span className="color-3 custom-fs-1 line20 font-medium break-keep">Follow</span>
                    </button>
                  )}
                  {user.isFollowing && (
                    <button onClick={handleUnfollowUser} disabled={isLoading} className="padding-20 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-800 ease bdr17-hover">
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
