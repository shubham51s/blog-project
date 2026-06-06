import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FollowingContext } from "../../../../context/followingContext";
import { UserContext } from "../../../../context/userContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function UserListItem({ user, onFollowStatusChange = () => {} }) {
  const { isFetchUserLoader, followingUsers } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await followUser(params);
    if (isSuccess) onFollowStatusChange(true);

    setIsLoading(false);
  };

  const handleUnfollowBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await unfollowUser(params);
    if (isSuccess) onFollowStatusChange(false);

    setIsLoading(false);
  };

  return (
    <>
      {user && (
        <div className="margin60 flex">
          <Link to={`/profile/${user.username}`} className="cursor-pointer list-none">
            <div className="relative">
              <img src={user.profileImg} className="width-15 aspect-square rounded-full" />
              <div className="absolute top-0 boxShadow7 width-15 aspect-square rounded-full"></div>
            </div>
          </Link>
          <div className="padding82 w-full flex justify-between">
            <div className="w-full flex flex-col justify-center">
              <div className="flex items-center">
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 no-underline p-0">
                  <h2 className="height-15 font-10 font-medium color-3 line20 m-0 line-clamp-2">{user.name}</h2>
                </Link>
              </div>
              {user.bio && (
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 no-underline p-0">
                  <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0">{user.bio}</p>
                  </div>
                </Link>
              )}
            </div>

            {!isFetchUserLoader && userInfo._id !== user._id && (
              <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
                {followingUsers[user._id] && (
                  <button onClick={handleUnfollowBtnClick} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${isLoading ? "opacity-75" : "opacity-100"}`}>
                    <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Following</div>
                  </button>
                )}
                {!followingUsers[user._id] && (
                  <button onClick={handleFollowBtnClick} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease  ${isLoading ? "opacity-75" : "opacity-100"}`}>
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

export default UserListItem;
