import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchHomeComp() {
  return (
    <div className="margin-12 mr-0">
      <div className="bg-10 width-9 border-radius-2 border-0 flex items-center">
        <div className="margin-13 flex">
          <CiSearch className="width-10 height-5" />
        </div>
        <input className="color-3 bg-transparent padding-12 custom-fs-1 border-0 outline-none custom-line-h-1 w-full m-0 font-medium" type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default SearchHomeComp;
