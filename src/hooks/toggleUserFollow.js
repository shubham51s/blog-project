import { useContext, useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { FollowingContext } from "../context/followingContext";
import { showToast } from "../utils/toaster";

export function useToggleUserFollow() {
  const { requestHandler } = useRequestHandler();
  const { addUserFollowing, removeFollowingUser } = useContext(FollowingContext);

  const followUser = async (userId) => {
    try {
      const params = {
        userToFollow: userId,
      };

      const response = await requestHandler("/follow/follow-user", "POST", params);

      if (response?.status === 200) {
        addUserFollowing(userId);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const params = {
        userToUnfollow: userId,
      };

      const response = await requestHandler("/follow/unfollow-user", "POST", params);

      if (response?.status === 200) {
        removeFollowingUser(userId);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { followUser, unfollowUser };
}
