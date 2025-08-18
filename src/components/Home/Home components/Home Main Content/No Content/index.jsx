import React from "react";
import { Link } from "react-router-dom";

function NoContentComp({ item }) {
  return (
    <div className="width-27 text-center mx-auto my-0 padding-3 padding-32">
      <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
        <h2 className="font-10 color-3 font-medium custom-line-h-1 m-0 p-0">{item.title}</h2>
      </div>
      <div className="margin-14" style={{ marginTop: 0, marginInline: 0 }}>
        <h3 className="font-10 color-3 font-normal custom-line-h-1 m-0 p-0">{item.description}</h3>
      </div>
      <p className="color-3 custom-fs-1 custom-line-h-1 font-normal m-0 p-0">
        <Link className="underline cursor-pointer m-0 p-0" to={item.path}>
          {item.action}
        </Link>
      </p>
    </div>
  );
}

export default NoContentComp;
