import React, { useState } from "react";
import { formatNumberCompact } from "../../../utils/common";
import { useRequestHandler } from "../../../hooks/requestHandler";

function HeaderSection({ topic }) {
  const { requestHandler } = useRequestHandler();
  const [isFollowing, setIsFollowing] = useState(topic.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const followTopic = async () => {
    setIsLoading(true);
    setIsFollowing(true);
    try {
      const params = {
        topicId: topic._id,
      };
      const response = await requestHandler("/users/update/add-interest", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
      } else {
        setIsFollowing(false);
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      setIsFollowing(false);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowTopic = async () => {
    setIsLoading(true);
    setIsFollowing(false);
    try {
      const params = {
        topicId: topic._id,
      };
      const response = await requestHandler("/users/update/remove-interest", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
      } else {
        setIsFollowing(true);
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      setIsFollowing(true);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="margin-12 margin70 w-full min-w-0 custom-max-w-1">
        <div className="flex flex-col items-center">
          <h2 className="letter-spacing-7 line-h-10 font-12 font-semibold color-3 m-0">{topic.name}</h2>
          <div className="line-h-8 font-10 margin-37 color-4 margin75 font-medium flex justify-center">
            Topic
            <div className="margin73">•</div>
            {formatNumberCompact(topic.stats.follower)} {`${topic.stats.follower > 1 ? " followers" : " follower"}`}
            <div className="margin73">•</div>
            {formatNumberCompact(topic.stats.stories)} stories
          </div>
          {isFollowing && (
            <button onClick={unfollowTopic} disabled={isLoading} className="flex items-center justify-center m-0 bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer transition-all duration-500 ease opacity-[0.95] hover:opacity-100">
              <span className="color-3 custom-fs-1 line20 font-medium">Following</span>
            </button>
          )}
          {!isFollowing && (
            <button onClick={followTopic} disabled={isLoading} className="flex items-center justify-center m-0 bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer transition-all duration-500 ease opacity-[0.95] hover:opacity-100">
              <span className="color-3 custom-fs-1 line20 font-medium">Follow</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
