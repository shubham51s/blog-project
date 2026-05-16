import React from "react";
import { Link } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";

function ListItem({ item, clearSearchHistoryItem, closePopup }) {
  return (
    <div className="margin-7 flex items-center" style={{ marginBottom: 0, marginInline: 0 }}>
      <div className="grow shrink basis-auto">
        <Link to={`/search/posts?q=${item}`} onClick={closePopup}>
          <div className="flex items-center">
            <div className="grow-0 shrink-0 basis-auto margin46" style={{ marginLeft: 0, marginBlock: 0 }}>
              <div className="width-8 aspect-square">
                <CiSearch className="w-full h-full color-3 opacity-[0.65]" />
              </div>
            </div>
            <p className="height-6 break-all line-clamp-1 color-3 custom-fs-1 line20 font-medium m-0">{item}</p>
          </div>
        </Link>
      </div>
      <div className="grow-0 shrink-0 basis-auto">
        <div className="margin-5">
          <button onClick={() => clearSearchHistoryItem(item)} className="cursor-pointer opacity-[0.65] transition-all duration-75 ease hover:opacity-[0.85]">
            <div className="width-8 aspect-square">
              <VscClose className="w-full h-full color-3" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
