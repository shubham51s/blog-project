import { createContext, useEffect, useState } from "react";
import { useRequestHandler } from "../hooks/requestHandler";
import { appChannel } from "../utils/authChannel";

const MuteContext = createContext();

const MuteProvider = ({ children }) => {
  const { requestHandler } = useRequestHandler();
  const [mutedUsers, setMutedUsers] = useState({});
  const [mutedPublications, setMutedPublications] = useState({});
  const [muteLoader, setMuteLoader] = useState({
    user: true,
    publication: true,
  });

  const fetchMutedUserIds = async () => {
    setMuteLoader((prev) => ({ ...prev, user: true }));
    try {
      const response = await requestHandler("/mute/user/ids");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users?.length) {
        const followingObj = {};

        result.data.users.map((item) => {
          if (!followingObj[item.target]) {
            followingObj[item.target] = true;
          }
        });

        setMutedUsers(followingObj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMuteLoader((prev) => ({ ...prev, user: false }));
    }
  };

  const fetchMutedPublicationIds = async () => {
    setMuteLoader((prev) => ({ ...prev, publication: true }));
    try {
      const response = await requestHandler("/mute/publication/ids");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications?.length) {
        const followingObj = {};

        result.data.publications.map((item) => {
          if (!followingObj[item.target]) {
            followingObj[item.target] = true;
          }
        });

        setMutedPublications(followingObj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMuteLoader((prev) => ({ ...prev, publication: false }));
    }
  };

  const addMutedUser = (userId) => {
    if (userId) setMutedUsers((prev) => ({ ...prev, [userId]: true }));
  };

  const removeMutedUser = (userId) => {
    if (userId) {
      setMutedUsers((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
    }
  };

  const addMutedPublication = (publicationId) => {
    if (publicationId) setMutedPublications((prev) => ({ ...prev, [publicationId]: true }));
  };

  const removeMutedPublication = (publicationId) => {
    if (publicationId) {
      setMutedPublications((prev) => {
        const copy = { ...prev };
        delete copy[publicationId];
        return copy;
      });
    }
  };

  const fetchMutedUsersAndPublications = () => {
    fetchMutedUserIds();
    fetchMutedPublicationIds();
  };

  useEffect(() => {
    const handleAppMessage = (event) => {
      const { type, payload } = event.data;

      if (type === "muteUser") {
        addMutedUser(payload.id);
      } else if (type === "unmuteUser") {
        removeMutedUser(payload.id);
      } else if (type === "mutePublication") {
        addMutedPublication(payload.id);
      } else if (type === "unmutePublication") {
        removeMutedPublication(payload.id);
      }
    };

    appChannel.addEventListener("message", handleAppMessage);

    return () => {
      appChannel.removeEventListener("message", handleAppMessage);
    };
  }, []);

  return <MuteContext.Provider value={{ muteLoader, mutedUsers, mutedPublications, fetchMutedUsersAndPublications, addMutedUser, removeMutedUser, addMutedPublication, removeMutedPublication }}>{children}</MuteContext.Provider>;
};

export { MuteContext };

export default MuteProvider;
