import React from "react";
import { Link } from "react-router-dom";

function TopicListItem({ item }) {
  return (
    <div className="margin-10 flex" style={{ marginTop: 0 }}>
      <Link to={`/tag/${item.slug}`} className="margin-9 cursor-pointer p-0 m-0 no-underline" style={{ marginLeft: 0, marginBlock: 0 }}>
        <div className="custom-fs-1 color-3 bg-11 border-radius-6 whitespace-nowrap padding-5 font-medium">{item.name}</div>
      </Link>
    </div>
  );
}

export default TopicListItem;
