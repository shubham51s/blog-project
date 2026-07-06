import React, { useContext, useState } from "react";
import { PiHandsClappingThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";
import { FollowingContext } from "../../../../context/followingContext";
import { showToast } from "../../../../utils/toaster";

function ListItem({ item }) {
  const { userInfo } = useContext(UserContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const { isFetchUserLoader, followingUsers } = useContext(FollowingContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: item.user._id,
        name: item.user.name,
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
        _id: item.user._id,
        name: item.user.name,
      };
      await unfollowUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="padding-33 flex items-start justify-between" style={{ paddingInline: 0 }}>
      <div className="width64 flex items-start">
        <div className="padding-7" style={{ paddingLeft: 0 }}>
          <Link to={`/profile/${item.user.username}`} className="relative block height-2 aspect-square">
            <img loading="lazy" src={item.user.profileImg} className="box-border rounded-full align-middle" />
            <div className="absolute inset-0 aspect-square rounded-full border-0 boxShadow7"></div>
            <span className="absolute padding-36 left4 bg-[#1a8917] border-radius11 bottom-0 color-2 text-center">
              <div className="height-4 aspect-square">
                <PiHandsClappingThin className="w-full h-full" />
              </div>
            </span>
          </Link>
        </div>
        <Link to={`/profile/${item.user.username}`} className="flex flex-col items-start">
          <div className="cursor-pointer m-0 p-0 no-underline">
            <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 capitalize">{item.user.name}</h2>
          </div>
          {item.user.bio && <p className="font-4 color-4 custom-line-h-1 font-medium m-0 p-0">{item.user.bio}</p>}
        </Link>
      </div>

      <div className="padding50 width65 text-right" style={{ paddingRight: 0 }}>
        {userInfo._id !== item.user._id && !isFetchUserLoader && (
          <div className="inline-block">
            {!followingUsers[item.user._id] && (
              <button onClick={handleFollowUser} disabled={isLoading} className="bdr-7 padding-20 padding-28 border-radius-7 flex justify-center cursor-pointer items-center m-0">
                <span className="color-3 w-full custom-fs-1 custom-line-h-1 font-medium">
                  <span className="inline-block break-keep">Follow</span>
                </span>
              </button>
            )}
            {followingUsers[item.user._id] && (
              <button onClick={handleUnfollowUser} disabled={isLoading} className="bdr-7 padding-20 padding-28 border-radius-7 flex justify-center cursor-pointer items-center m-0">
                <span className="color-3 w-full custom-fs-1 custom-line-h-1 font-medium">
                  <span className="inline-block break-keep">Following</span>
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
