import React, { useState } from "react";
import { Link } from "react-router-dom";
import ActionBtn from "./ActionBtn";

function Header({ publication, handleSavePublicationBtnClick }) {
  const [name, setName] = useState(publication.name);

  return (
    <header className="block font-3 bg15">
      <div className="mx-auto padding59 width87">
        <div className="text-left padding-2 mx-auto">
          <div className="flex items-center">
            <h1 className="font-semibold font17 leading-tight color11 grow shrink basis-auto m-0">{name} settings</h1>
            <div className="text-right margin-18 grow-0 shrink-0 basis-auto" style={{ marginRight: 0 }}>
              <button onClick={handleSavePublicationBtnClick} className="inline-block align-middle height68 line-h11 padding-7 border-radius-9 bdr22 border-[#0F730C] transition-all duration-300 ease text-[#0F730C] custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal margin-9 opacity-[0.85] hover:opacity-100" style={{ marginLeft: 0, marginBlock: 0 }}>
                Save
              </button>
              <Link to={`/publication/${publication?.slug}`} className="inline-block align-middle height68 line-h11 padding-7 bdr23 border-radius-9 bdr17-hover transition-all duration-300 ease color-3 custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal opacity-[0.75] hover:opacity-100">
                Cancel
              </Link>
            </div>
          </div>
          <ActionBtn publication={publication} />
        </div>
      </div>
    </header>
  );
}

export default Header;
