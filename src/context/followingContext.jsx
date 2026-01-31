import { createContext, useState } from "react";
import { useRequestHandler } from "../hooks/requestHandler";
import { urlBasePath } from "../constants/constant";

const FollowingContext = createContext();

const FollowingProvider = ({ children }) => {
  const { requestHandler } = useRequestHandler();
  const [followingAuthors, setFollowingAuthors] = useState({});
  const [followingCommunities, setFollowingCommunities] = useState({});
  const [followingLoaders, setFollowingLoaders] = useState({
    author: true,
    publication: false,
  });

  const fetchFollowingAuthorIds = async () => {
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

        setFollowingAuthors(followingObj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFollowingLoaders((prev) => ({ ...prev, author: false }));
    }
  };

  return <FollowingContext.Provider value={{ followingAuthors, followingCommunities, followingLoaders, fetchFollowingAuthorIds }}>{children}</FollowingContext.Provider>;
};

export { FollowingContext };

export default FollowingProvider;
