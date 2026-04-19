import React from "react";
import { Link } from "react-router-dom";

function InboxBtn({ publication }) {
  return (
    <div className="margin-21 bdr-8 padding-7 grow-0 shrink-0 basis-auto" style={{ marginTop: 0, marginInline: 0, borderRight: 0, borderBlock: 0, paddingRight: 0 }}>
      <div className="flex">
        <Link to={`/publication/${publication.slug}/manage/inbox`} className="cursor-pointer m-0 p-0 opacity-[0.9] transition-all duration-75 ease hover:opacity-100">
          <div className="flex custom-gap-1 items-center">
            <p className="custom-fs-1 color-3 line20 font-normal m-0">Inbox</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default InboxBtn;
