import React from "react";
import { Link } from "react-router-dom";

function ListItem({ item }) {
  return (
    <div className="flex margin78 margin68" style={{ marginLeft: 0, marginTop: 0 }}>
      <Link to={`/tag/${item.slug}`} className="margin-9 p-0" style={{ marginLeft: 0, marginBlock: 0 }}>
        <div className="custom-py-2 custom-px-2 whitespace-nowrap bdr-5 color-3 custom-fs-1 line20 font-medium border-radius-6 bg-11">{item.name}</div>
      </Link>
    </div>
  );
}

export default ListItem;
