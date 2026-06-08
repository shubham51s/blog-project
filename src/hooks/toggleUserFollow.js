import { useContext, useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { FollowingContext } from "../context/followingContext";
import { showToast } from "../utils/toaster";

export function useToggleUserFollow() {
  const { requestHandler } = useRequestHandler();
  const { addUserFollowing, removeFollowingUser } = useContext(FollowingContext);

  const followUser = async (user) => {
    addUserFollowing(user._id);
    try {
      const params = {
        userToFollow: user._id,
      };

      const response = await requestHandler("/follow/follow-user", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`Success! You're now following ${user.name}.`);
      } else {
        removeFollowingUser(user._id);
        showToast(result?.message || "Some error occured");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      removeFollowingUser(user._id);
      showToast("Some error occured");
      return false;
    }
  };

  const unfollowUser = async (user) => {
    removeFollowingUser(user._id);
    try {
      const params = {
        userToUnfollow: user._id,
      };

      const response = await requestHandler("/follow/unfollow-user", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`You unfollowed ${user.name}..`);
      } else {
        addUserFollowing(user._id);
        showToast(result?.message || "Some error occured");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      addUserFollowing(user._id);
      showToast("Some error occured");
      return false;
    }
  };

  return { followUser, unfollowUser };
}
