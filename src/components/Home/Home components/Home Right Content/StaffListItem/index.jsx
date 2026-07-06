import React from "react";
import { Link } from "react-router-dom";
import { formatMonthAndDayShort } from "../../../../../utils/monthDateFormatter";

function StaffListItem({ item }) {
  return (
    <div className="padding-14 last:!p-0" style={{ paddingTop: 0, paddingInline: 0 }}>
      <div className="h-full w-full">
        <div className="flex items-center margin-7" style={{ marginTop: 0, marginInline: 0 }}>
          <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
            <Link to={`/profile/${item.author.username}`} className="no-underline">
              <div className="relative">
                <img loading="lazy" src={item.author.profileImg} className="height-12 aspect-square rounded-full" />
                <div className="absolute top-0 height-12 aspect-square rounded-full"></div>
              </div>
            </Link>
          </div>
          <div className="padding-23 flex-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
            <Link to={`/profile/${item.author.username}`} className="cursor-pointer no-underline p-0 m-0 flex items-center">
              <p className="break-words height-6 truncate color-3 font-4 custom-line-h-1 font-normal m-0 p-0">{item.author.name}</p>
            </Link>
          </div>
        </div>
        <Link to={`/${item.slug}`} className="cursor-pointer m-0 p-0 no-underline">
          <div className="margin-7" style={{ marginTop: 0, marginInline: 0 }}>
            <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0">{item.previewTitle}</h2>
          </div>
          <div className="flex items-center custom-gap-2">
            <span className="font-4 color-4 custom-line-h-1 font-normal">{formatMonthAndDayShort(item.createdAt)}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default StaffListItem;
