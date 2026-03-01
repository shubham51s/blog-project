import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiFileList2Line } from "react-icons/ri";
import { useRequestHandler } from "../../../../../hooks/requestHandler";
import { showToast } from "../../../../../utils/toaster";
import { formatNumberCompact } from "../../../../../utils/common";

function ListItemNew({ item, onToggleInterest = () => {} }) {
  const { requestHandler } = useRequestHandler();
  const [topic, setTopic] = useState({ ...item });
  const [isLoading, setIsLoading] = useState(false);

  const followTopic = async () => {
    setIsLoading(true);
    try {
      const params = {
        topicId: topic._id,
      };
      const response = await requestHandler("/users/update/add-interest", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setTopic((prev) => ({ ...prev, isFollowing: true }));
        onToggleInterest(true);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowTopic = async () => {
    setIsLoading(true);
    try {
      const params = {
        topicId: topic._id,
      };
      const response = await requestHandler("/users/update/remove-interest", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setTopic((prev) => ({ ...prev, isFollowing: false }));
        onToggleInterest(false);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="margin60 flex">
      <div className="margin60 flex">
        <Link className="cursor-pointer list-none">
          <div className="width-15 aspect-square rounded-full flex items-center justify-center">
            <div className="width-19 aspect-square">
              <RiFileList2Line className="w-full h-full" />
            </div>
          </div>
        </Link>
        <div className="padding82 w-full flex justify-between">
          <div className="w-full flex flex-col">
            <div className="flex items-center">
              <Link className="cursor-pointer m-0 no-underline p-0">
                <h2 className="height-15 font-10 font-semibold color-3 line20 m-0 line-clamp-2 capitalize">{topic.name}</h2>
              </Link>
            </div>
            <Link className="cursor-pointer m-0 no-underline p-0">
              <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
                <p className="custom-fs-1 color-4 line20 font-normal m-0">
                  {formatNumberCompact(topic.stats.stories)} stories · {formatNumberCompact(topic.stats.follower)} followers
                </p>
              </div>
            </Link>
          </div>

          <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
            {topic.isFollowing && (
              <button onClick={unfollowTopic} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${isLoading ? "opacity-75" : "opacity-100"}`}>
                <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Following</div>
              </button>
            )}
            {!topic.isFollowing && (
              <button onClick={followTopic} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease  ${isLoading ? "opacity-75" : "opacity-100"}`}>
                <div className="color-3 custom-fs-1 line20 font-normal">Follow</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItemNew;
