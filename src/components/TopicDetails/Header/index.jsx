import React from "react";
import { formatNumberCompact } from "../../../utils/common";

function HeaderSection({ topic }) {
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
          {topic.isFollowing && (
            <button className="flex items-center justify-center m-0 bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer transition-all duration-500 ease opacity-[0.95] hover:opacity-100">
              <span className="color-3 custom-fs-1 line20 font-medium">Following</span>
            </button>
          )}
          {!topic.isFollowing && (
            <button className="flex items-center justify-center m-0 bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer transition-all duration-500 ease opacity-[0.95] hover:opacity-100">
              <span className="color-3 custom-fs-1 line20 font-medium">Follow</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
