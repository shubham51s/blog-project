import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SectionHeader({ handleCreateNewBlogBtnClick }) {
  const pathName = useLocation().pathname;

  const [libraryList, setLibraryList] = useState([
    {
      id: 0,
      name: "Your lists",
      path: "",
    },
    {
      id: 1,
      name: "Saved lists",
      path: "saved",
    },
    {
      id: 2,
      name: "Reading history",
      path: "reading-history",
    },
  ]);

  const isTabActive = (id) => {
    if (id === 0) {
      return !pathName.includes("saved") && !pathName.includes("reading-history");
    } else if (id === 1) {
      return pathName.includes("saved");
    } else if (id === 2) {
      return pathName.includes("reading-history");
    }
    return false;
  };

  return (
    <div className="margin56 margin66">
      <div className="margin57">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-words line-clamp-1 text-ellipsis font-medium overflow-hidden color-3 m-0">Your library</h1>
          </div>
          {isTabActive(0) && (
            <button onClick={handleCreateNewBlogBtnClick} className="cursor-pointer text-center border-radius-9 bdr-3 border-[#1A8917] bg-[#1A8917] custom-px-2 padding59 text-white line-h-8 font-10 font-medium m-0 transition-all duration-75 ease hover:bg-[#156d12]">
              New list
            </button>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="overflow-hidden flex items-center">
          <div className="w-full flex justify-start">
            {libraryList.map((item) => (
              <div key={item.id} className={`min-w-max margin52 padding-42 ${isTabActive(item.id) ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0, marginLeft: item.id === 0 ? 0 : undefined }}>
                <Link to={item.path} className="p-0 cursor-pointer no-underline">
                  <p className={`color-3 custom-fs-1 line20 m-0 font-normal transition-all duration-75 ease ${isTabActive(item.id) ? "opacity-100" : "opacity-[0.8] hover:opacity-100"}`}>
                    <span>{item.name}</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
