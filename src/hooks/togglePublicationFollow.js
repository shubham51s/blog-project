import { useContext, useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { showToast } from "../utils/toaster";
import { PublicationContext } from "../context/publication";

export function useTogglePublicationFollow() {
  const { requestHandler } = useRequestHandler();
  const { addFollowingPublication, removeFollowingPublication } = useContext(PublicationContext);

  const followPublication = async (publication) => {
    addFollowingPublication(publication._id);
    try {
      const params = {
        publication: publication._id,
      };

      const response = await requestHandler("/publication/follow", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`Success! You're now following ${publication.name}.`);
      } else {
        removeFollowingPublication(publication._id);
        showToast(result?.message || "Some error occured");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      removeFollowingPublication(publication._id);
      showToast("Some error occured");
      return false;
    }
  };

  const unfollowPublication = async (publication) => {
    removeFollowingPublication(publication._id);
    try {
      const params = {
        publication: publication._id,
      };

      const response = await requestHandler("/publication/follow/unfollow", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`You unfollowed ${publication.name}..`);
      } else {
        addFollowingPublication(publication._id);
        showToast(result?.message || "Some error occured");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      addFollowingPublication(publication._id);
      showToast("Some error occured");
      return false;
    }
  };

  return { followPublication, unfollowPublication };
}
