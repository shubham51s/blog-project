import React from "react";
import { Link } from "react-router-dom";

function ListItem({ item }) {
  return (
    <>
      {item?.followee && (
        <Link to={`/profile/${item.followee.username}`} className="margin-7 flex items-center custom-gap-2 padding-3 cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }} title={item.followee.name}>
          <div className="padding-23 flex-none color-6" style={{ paddingBlock: 0 }}>
            <img className="width-19 aspect-square rounded-full" src={item.followee.profileImg} />
          </div>
          <div className="flex flex-col custom-gap-3 items-start text-start max-w-full flex-nowrap truncate">
            <p className="font13 color-6 custom-line-h-1 font-normal m-0 p-0">{item.followee.name}</p>
          </div>
        </Link>
      )}
    </>
  );
}

export default ListItem;
