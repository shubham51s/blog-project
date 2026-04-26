import React from "react";
import { Link } from "react-router-dom";
import Clapped from "./Reasons/Clap";
import Followed from "./Reasons/Follow";
import Responded from "./Reasons/Responded";

function ListItem({ item }) {
  return (
    <div className="custom-fs-1 color-4 line20 font-medium">
      <div className="padding-14 flex custom-gap-2">
        <Link to={`/profile/${item.sender.username}`} className="cursor-pointer">
          <div className="relative">
            <img src={item.sender.profileImg} className="width-11 aspect-square rounded-full" />
            <div className="absolute top-0 width-11 aspect-square rounded-full boxShadow7"></div>
          </div>
        </Link>
        {item.type === "follow" && <Followed item={item} />}
        {item.type === "clap" && <Clapped item={item} />}
        {item.type === "comment" && <Responded item={item} />}
      </div>
    </div>
  );
}

export default ListItem;
