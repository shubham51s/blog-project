import { useContext, useState } from "react";
import { useRequestHandler } from "./requestHandler";
import { showToast } from "../utils/toaster";
import { MuteContext } from "../context/mute";
import { broadcastAction } from "../utils/authChannel";

export function useToggleMute() {
  const { requestHandler } = useRequestHandler();
  const { addMutedUser, removeMutedUser, addMutedPublication, removeMutedPublication, mutedPublications } = useContext(MuteContext);
  const [publicationMuteLoader, setPublicationMuteLoader] = useState(false);
  const [userMuteLoader, setUserMuteLoader] = useState(false);

  const muteUser = async (user) => {
    setUserMuteLoader(true);
    addMutedUser(user._id);
    try {
      const params = {
        target: user._id,
      };

      const response = await requestHandler("/mute/user/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been muted. You will no longer see their stories on your homepage.`);
        broadcastAction("muteUser", { id: user._id });
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
    } finally {
      setUserMuteLoader(false);
    }
  };

  const unmuteUser = async (user) => {
    removeMutedUser(user._id);
    setUserMuteLoader(true);
    try {
      const params = {
        target: user._id,
      };

      const response = await requestHandler("/mute/user/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${user.name} has been unmuted.`);
        broadcastAction("unmuteUser", { id: user._id });
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
    } finally {
      setUserMuteLoader(false);
    }
  };

  const mutePublication = async (publication) => {
    setPublicationMuteLoader(true);
    addMutedPublication(publication._id);

    try {
      const params = {
        target: publication._id,
      };

      const response = await requestHandler("/mute/publication/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${publication.name} has been muted. You will no longer see their stories on your homepage.`);
        broadcastAction("mutePublication", { id: publication._id });
      } else {
        showToast(result?.message || "Some error occured.");
        removeMutedPublication(publication._id);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      removeMutedPublication(publication._id);
      return false;
    } finally {
      setPublicationMuteLoader(false);
    }
  };

  const unmutePublication = async (publication) => {
    setPublicationMuteLoader(true);
    removeMutedPublication(publication._id);
    try {
      const params = {
        target: publication._id,
      };

      const response = await requestHandler("/mute/publication/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(`${publication.name} has been unmuted.`);
        broadcastAction("unmutePublication", { id: publication._id });
      } else {
        showToast(result?.message || "Some error occured");
        addMutedPublication(publication._id);
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      addMutedPublication(publication._id);
      return false;
    } finally {
      setPublicationMuteLoader(false);
    }
  };

  return { muteUser, unmuteUser, userMuteLoader, mutePublication, unmutePublication, publicationMuteLoader };
}
