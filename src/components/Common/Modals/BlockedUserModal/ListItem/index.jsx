import React, { useState } from "react";

function ListItem({ item }) {
  return (
    <div className="flex items-start margin60 first:!mt-0">
      <div className="relative shrink-0">
        <img src={item.blockedUser.profileImg} className="width-15 aspect-square rounded-full" />
        <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
      </div>
      <div className="grow shrink basis-auto margin-12">
        <div className="flex items-center">
          <h2 className="font-10 font-medium color-3 line20 m-0">{item.blockedUser.name}</h2>
        </div>
        {item.blockedUser?.bio && (
          <div className="break-words whitespace-pre-wrap margin-19" style={{ marginBottom: 0, marginInline: 0 }}>
            <p className="color-4 line20 font-normal m-0 custom-fs-1">{item.blockedUser.bio}</p>
          </div>
        )}
      </div>
      <button className="shrink-0 cursor-pointer border-radius-9 bdr-3 border-[#1a8917] text-[#1a8917] text-center font-4 line20 font-normal padding85 padding-19">Blocked</button>
    </div>
  );
}

export default ListItem;
