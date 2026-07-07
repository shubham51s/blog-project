import { createContext, useEffect, useState } from "react";
import { urlBasePath } from "../constants/constant";
import { appChannel } from "../utils/authChannel";

const PublicationContext = createContext();

const PublicationProvider = ({ children }) => {
  const [followingPublication, setFollowingPublication] = useState({});
  const [isPublicationLoader, setIsPublicationLoader] = useState(true);

  const fetchFollowingPublicationIds = async () => {
    setIsPublicationLoader(true);
    try {
      const response = await fetch(`${urlBasePath}/publication/follow/my-following-ids`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();

      if (response?.status === 200 && result?.data?.followingIds) {
        const followingObj = {};

        result.data.followingIds.map((item) => {
          if (!followingObj[item.followee]) {
            followingObj[item.followee] = true;
          }
        });

        setFollowingPublication(followingObj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublicationLoader(false);
    }
  };

  const addFollowingPublication = (publicationId) => {
    if (publicationId) setFollowingPublication((prev) => ({ ...prev, [publicationId]: true }));
  };

  const removeFollowingPublication = (publicationId) => {
    if (publicationId) {
      setFollowingPublication((prev) => {
        const copy = { ...prev };
        delete copy[publicationId];
        return copy;
      });
    }
  };

  useEffect(() => {
    const handleAppMessage = (event) => {
      const { type, payload } = event.data;

      if (type === "followPublication") {
        addFollowingPublication(payload.id);
      } else if (type === "unfollowPublication") {
        removeFollowingPublication(payload.id);
      }
    };

    appChannel.addEventListener("message", handleAppMessage);

    return () => {
      appChannel.removeEventListener("message", handleAppMessage);
    };
  }, []);

  return <PublicationContext.Provider value={{ isPublicationLoader, followingPublication, fetchFollowingPublicationIds, addFollowingPublication, removeFollowingPublication }}>{children}</PublicationContext.Provider>;
};

export { PublicationContext };

export default PublicationProvider;
