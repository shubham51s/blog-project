import React from "react";
import { Link } from "react-router-dom";
import ManagePublicationBtn from "../../PublicationDetails/MangePublicationBtn";
import InboxBtn from "../../PublicationDetails/InboxBtn";

function Header({ publication }) {
  return (
    <div className="w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
      <div className="custom-bg-8 w-full height-55"></div>
      <div className="flex justify-center">
        <div className="w-full custom-max-w-1 min-w-0 margin-27" style={{ marginBlock: 0 }}>
          <div className="flex items-center height-3 gap12">
            <div className="width-32">
              <Link to={publication?.slug ? `/publication/${publication.slug}` : ""} className="cursor-pointer m-0 p-0">
                <h2 className="line-h-8 font-3 font-semibold color-3 m-0" title={publication?.name || ""}>
                  <div className="max-w-full truncate">{publication?.name}</div>
                </h2>
              </Link>
            </div>
            <div className="grow shrink basis-auto min-w-0 h-full relative flex items-end">
              <div className="grow shrink basis-auto flex justify-between min-w-0 custom-gap-2">
                <div className="min-w-0 grow shrink basis-auto"></div>
                {publication.isMember && <InboxBtn publication={publication} />}
                {publication.isMember && <ManagePublicationBtn publication={publication} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
