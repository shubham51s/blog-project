import React from "react";
import Skeleton from "react-loading-skeleton";

function ListLoader() {
  return (
    <div className="flex margin78 margin68" style={{ marginLeft: 0, marginTop: 0 }}>
      <div className="margin-9 p-0" style={{ marginLeft: 0, marginBlock: 0 }}>
        <div className="custom-py-2 custom-px-2 whitespace-nowrap bdr-5 color-3 custom-fs-1 line20 font-medium border-radius-6 bg-11 relative overflow-hidden">
          <span className="invisible">Topic name</span>
          <div className="absolute inset-0">
            <Skeleton width={3434} height={3434} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLoader;
