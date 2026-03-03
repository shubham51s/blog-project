import { useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { showToast } from "../utils/toaster";

export function useToggleMute() {
  const { requestHandler } = useRequestHandler();

  const muteUser = async (user) => {
    try {
      const params = {
        target: user.target,
      };

      const response = await requestHandler("/mute/user/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been muted. You will no longer see their stories on your homepage.`);
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

  const unmuteUser = async (user) => {
    try {
      const params = {
        target: user.target,
      };

      const response = await requestHandler("/mute/user/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been unmuted.`);
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

  return { muteUser, unmuteUser };
}
