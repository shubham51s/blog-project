import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { UserContext } from "../../../context/userContext";

function FollowingList({ item, user, setUser }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [author, setAuthor] = useState(item);
  const [isLoading, setIsLoading] = useState(false);

  const followUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        userToFollow: author.followee._id,
      };
      const response = await requestHandler("/follow/follow-user", "POST", params);

      if (response?.status === 200) {
        setAuthor((prev) => ({ ...prev, follower: { ...prev.follower, isFollowing: true } }));
        showToast(`Success! You're now following ${author.followee.name}.`);
        if (userInfo._id === user._id) {
          setUser((prev) => ({ ...prev, followingCount: prev.followingCount + 1 }));
        }
      } else {
        showToast("Some error occcured.");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      showToast("Some error occured.");
    }
  };

  const unfollowUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        userToUnfollow: author.followee._id,
      };
      const response = await requestHandler("/follow/unfollow-user", "POST", params);

      if (response?.status === 200) {
        setAuthor((prev) => ({ ...prev, follower: { ...prev.follower, isFollowing: false } }));
        showToast(`You unfollowed ${author.followee.name}.`);
        if (userInfo._id === user._id) {
          setUser((prev) => ({ ...prev, followingCount: prev.followingCount > 0 ? prev.followingCount - 1 : 0 }));
        }
      } else {
        showToast("Some error occcured.");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      showToast("Some error occcured.");
    }
  };

  return (
    <div className="margin60 flex">
      <Link to={`/profile/${item.followee.username}`} className="no-underline">
        <div className="relative">
          <img src={author.followee.profileImg} alt={author.followee.name} className="width-15 aspect-square box-border rounded-full" />
          <div className="absolute top-0 boxShadow7 width-15 aspect-square box-border rounded-full"></div>
        </div>
      </Link>

      <div className="padding82 w-full flex justify-between">
        <div className="w-full flex flex-col justify-center">
          <div className="flex items-center">
            <Link to={`/profile/${item.followee.username}`} className="no-underline m-0 p-0">
              <h2 className="height-15 line-clamp-2 font-10 font-normal color-3 line20 m-0" title={author.followee.name}>
                {author.followee.name}
              </h2>
            </Link>
          </div>
          {author.followee.bio && (
            <Link to={`/profile/${item.followee.username}`} className="cursor-pointer m-0 p-0 no-underline">
              <div className="whitespace-pre-wrap w-full max-w-full margin44 break-all">
                <p className="color-4 custom-fs-1 line20 font-normal m-0">{author.followee.bio}</p>
              </div>
            </Link>
          )}
        </div>

        {author.followee._id !== userInfo._id && (
          <div className="margin-14 flex justify-end items-start" style={{ marginRight: 0, marginBlock: 0 }}>
            {author.followee.isFollowing && (
              <button onClick={unfollowUser} disabled={isLoading} className={`bdr17-hover padding-28 padding-20 border-radius-7 flex items-center m-0 transition-all duration-500 ease ${isLoading ? "opacity-[0.7] cursor-default" : "opacity-100 cursor-pointer"}`}>
                <div className="break-keep text-center inline-block">Following</div>
                <div className="text-right padding-23" style={{ paddingRight: 0, paddingBlock: 0 }}>
                  <div className="width-19 aspect-square">
                    <IoIosArrowDown className="w-full h-full" />
                  </div>
                </div>
              </button>
            )}
            {!author.followee.isFollowing && (
              <button onClick={followUser} disabled={isLoading} className={`bdr17-hover padding-28 padding-20 border-radius-7 flex items-center m-0 transition-all duration-500 ease ${isLoading ? "opacity-[0.7] cursor-default" : "opacity-100 cursor-pointer"}`}>
                <div className="break-keep text-center inline-block">Follow</div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowingList;
