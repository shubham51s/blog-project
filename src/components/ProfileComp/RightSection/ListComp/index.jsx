import React from "react";
import { Link } from "react-router-dom";

function ListComp({ list }) {
  return (
    <Link to={`list/${list.name.toLowerCase().split(" ").join("-")}/${list._id}`} className="flex items-start cursor-pointer no-underline p-0 margin-21" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="width77 grow-0 shrink-0 basis-auto flex overflow-hidden relative">
        <div className="relative z-[3]">
          <div className="height-50 overflow-hidden">
            <img src="https://miro.medium.com/v2/resize:fill:60:60/1*T92daLRP2FWL2ZKR5TYoJA.jpeg" className="h-full aspect-square" />
          </div>
        </div>
        <div className="relative z-[2] margin61">
          <div className="height-50 overflow-hidden">
            <img src="https://miro.medium.com/v2/resize:fill:60:60/1*qHYfL3G4f_oQDwn32s4ZEA.jpeg" className="h-full aspect-square" />
          </div>
        </div>
        <div className="relative z-[1] margin62">
          <div className="height-50 overflow-hidden">
            <img src="https://miro.medium.com/v2/resize:fill:60:60/1*TJaYPEVb4RTJjyVxHDbggQ.png" className="h-full aspect-square" />
          </div>
        </div>
      </div>
      <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
        <h2 className="line-clamp-2 height-15 font-10 font-normal overflow-hidden line20 m-0 text-ellipsis color-3" title={list.name}>
          {list.name}
        </h2>
        <div className="font-4 color-4 line20 flex font-normal" title={list.savedCount}>
          {list.savedCount}
        </div>
      </div>
    </Link>
  );
}

export default ListComp;
