import { useContext, useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { showToast } from "../utils/toaster";
import { MuteContext } from "../context/mute";

export function useToggleMute() {
  const { requestHandler } = useRequestHandler();
  const { addMutedUser, removeMutedUser, addMutedPublication, removeMutedPublication } = useContext(MuteContext);

  const muteUser = async (user) => {
    addMutedUser(user._id);
    try {
      const params = {
        target: user._id,
      };

      const response = await requestHandler("/mute/user/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been muted. You will no longer see their stories on your homepage.`);
      } else {
        showToast(result?.message || "Some error occured.");
        removeMutedUser(user._id);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      removeMutedUser(user._id);
      return false;
    }
  };

  const unmuteUser = async (user) => {
    removeMutedUser(user._id);
    try {
      const params = {
        target: user._id,
      };

      const response = await requestHandler("/mute/user/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been unmuted.`);
      } else {
        showToast(result?.message || "Some error occured");
        addMutedUser(user._id);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      addMutedUser(user._id);
      return false;
    }
  };

  const mutePublication = async (publication) => {
    try {
      const params = {
        target: publication._id,
      };

      const response = await requestHandler("/mute/publication/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${publication.name} has been muted. You will no longer see their stories on your homepage.`);
        addMutedPublication(publication._id);
      } else {
        showToast(result?.message || "Some error occured.");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      return false;
    }
  };

  const unmutePublication = async (publication) => {
    try {
      const params = {
        target: publication._id,
      };

      const response = await requestHandler("/mute/publication/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${publication.name} has been unmuted.`);
        removeMutedPublication(publication._id);
      } else {
        showToast(result?.message || "Some error occured");
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      return false;
    }
  };

  return { muteUser, unmuteUser, mutePublication, unmutePublication };
}
