import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../utils/common";

function ListComp({ list, user }) {
  const preview = {
    first: list?.previewImages[0] ? getImageUrl(list.previewImages[0]) : null,
    second: list?.previewImages[1] ? getImageUrl(list.previewImages[1]) : null,
    third: list?.previewImages[2] ? getImageUrl(list.previewImages[2]) : null,
  };

  return (
    <Link to={`/profile/${user.username}/list/${list.slug}`} className="flex items-start cursor-pointer no-underline p-0 margin-21" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="width77 grow-0 shrink-0 basis-auto flex overflow-hidden relative">
        <div className="relative z-[3]">
          <div className="height-50 overflow-hidden">
            {preview.first && <img loading="lazy" src={preview.first} className="h-full aspect-square" />}
            {!preview.first && <div className="h-full aspect-square bg-11"></div>}
          </div>
        </div>
        <div className="relative z-[2] margin61">
          <div className="height-50 overflow-hidden">
            {preview.second && <img loading="lazy" src={preview.second} className="h-full aspect-square" />}
            {!preview.second && <div className="h-full aspect-square bg-11"></div>}
          </div>
        </div>
        <div className="relative z-[1] margin62">
          <div className="height-50 overflow-hidden">
            {preview.third && <img loading="lazy" src={preview.third} className="h-full aspect-square" />}
            {!preview.third && <div className="h-full aspect-square bg-11"></div>}
          </div>
        </div>
      </div>
      <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
        <h2 className="line-clamp-2 height-15 custom-fs-1 font-medium overflow-hidden line20 m-0 text-ellipsis color-3" title={list.name}>
          {list.name}
        </h2>
        <div className="font-4 color-4 line20 flex font-normal" title={list.savedCount}>
          {`${list.savedCount} ${list.savedCount > 1 ? "stories" : "story"}`}
        </div>
      </div>
    </Link>
  );
}

export default ListComp;
