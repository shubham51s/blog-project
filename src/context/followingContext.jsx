import { createContext, useState } from "react";
import { urlBasePath } from "../constants/constant";

const FollowingContext = createContext();

const FollowingProvider = ({ children }) => {
  const [followingUsers, setFollowingUsers] = useState({});
  const [isFetchUserLoader, setIsFetchUserLoader] = useState(true);

  const fetchFollowingAuthorIds = async () => {
    setIsFetchUserLoader(true);
    try {
      const response = await fetch(`${urlBasePath}/follow/get-following-ids`, {
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

        setFollowingUsers(followingObj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchUserLoader(false);
    }
  };

  const addUserFollowing = (userId) => {
    if (!followingUsers[userId]) setFollowingUsers((prev) => ({ ...prev, [userId]: true }));
  };

  const removeFollowingUser = (userId) => {
    if (followingUsers[userId])
      setFollowingUsers((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
  };

  return <FollowingContext.Provider value={{ isFetchUserLoader, followingUsers, fetchFollowingAuthorIds, addUserFollowing, removeFollowingUser }}>{children}</FollowingContext.Provider>;
};

export { FollowingContext };

export default FollowingProvider;
