import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FollowingContext } from "../../../../context/followingContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";
import { UserContext } from "../../../../context/userContext";

function ListItem({ item }) {
  const [user, setUser] = useState(item?.user || null);
  const { isFetchUserLoader, followingUsers } = useContext(FollowingContext);
  const { userInfo } = useContext(UserContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
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
        <>
          <div className="relative">
            <div className="flex justify-between">
              <div className="w-full flex">
                <div className="margin-3">
                  <Link to={`/profile/${user.username}`} className="relative block">
                    <img loading="lazy" src={user.profileImg} className="width-15 aspect-square rounded-full" />
                    <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
                  </Link>
                </div>
                <Link to={`/profile/${user.username}`} className="w-full width89 flex flex-col cursor-pointer m-0 p-0">
                  <div className="flex justify-between">
                    <div>
                      <div>
                        {/* <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 p-0"> */}
                        <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                          <h2 className="line-clamp-2 height-15 font-10 font-medium color-3 line20 m-0">{user.name}</h2>
                        </div>
                        {/* </Link> */}
                      </div>
                      <p className="font-4 color-4 line20 font-normal m-0">
                        {user.followersCount} {user.followersCount > 1 ? "followers" : "follower"}
                      </p>
                    </div>
                  </div>
                  <div className="margin68" style={{ marginBottom: 0 }}>
                    {user.bio && <p className="custom-fs-1 color-4 line20 font-normal m-0">{user.bio}</p>}
                  </div>
                </Link>
              </div>

              {!isFetchUserLoader && userInfo._id !== user._id && (
                <div className="margin-13 padding-33" style={{ marginRight: 0, paddingBottom: 0, paddingInline: 0 }}>
                  {!followingUsers[user._id] && (
                    <button onClick={handleFollowUser} disabled={isLoading} className="padding-20 padding-28 border-radius-7 cursor-pointer m-0 bdr17-hover transition-all duration-300 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
                    </button>
                  )}
                  {followingUsers[user._id] && (
                    <button onClick={handleUnfollowUser} disabled={isLoading} className="padding-20 padding-28 border-radius-7 cursor-pointer m-0 bdr17-hover transition-all duration-300 ease">
                      <span className="color-3 custom-fs-1 line20 font-normal">Following</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="margin71 h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
        </>
      )}
    </>
  );
}

export default ListItem;
