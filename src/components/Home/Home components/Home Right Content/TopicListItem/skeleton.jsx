import React from "react";
import Skeleton from "react-loading-skeleton";

function TopicListLoader() {
  return (
    <div className="margin-10 flex" style={{ marginTop: 0 }}>
      <div className="margin-9 cursor-pointer p-0 m-0 no-underline" style={{ marginLeft: 0, marginBlock: 0 }}>
        <div className="custom-fs-1 color-3 bg-11 border-radius-6 whitespace-nowrap padding-5 font-medium relative overflow-hidden">
          <span className="invisible">Topic</span>
          <div className="absolute top-0">
            <Skeleton width={3434} height={3434} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicListLoader;
