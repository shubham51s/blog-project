import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import ListItem from "./ListItem";

function ExploreSection({ closePopup }) {
  const [searchList, setSearchList] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("search-history"));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const clearSearchHistoryItem = (searchItem) => {
    const updated = searchList.filter((item) => item !== searchItem);
    setSearchList(updated);
    localStorage.setItem("search-history", JSON.stringify(updated));
  };

  return (
    <ul className="flex flex-col items-stretch p-0 m-0 list-image-none list-none">
      {searchList.length > 0 && (
        <div className="margin82" style={{ marginBottom: 0 }}>
          <div className="padding59 w-full">
            <div className="margin68 flex justify-between" style={{ marginTop: 0 }}>
              <p className="uppercase letter-spacing-5 line23 font-4 color-4 font-normal m-0">Recent Searches</p>
            </div>
            <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}>
              {searchList.map((item, index) => (
                <ListItem item={item} clearSearchHistoryItem={clearSearchHistoryItem} closePopup={closePopup} key={index} />
              ))}
            </div>
          </div>
          <div className="margin66 margin52"></div>
          <div className="w-full h-0 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
        </div>
      )}
      <div className="margin81 margin-18">
        <div className="flex items-center">
          <div className="flex-auto">
            <Link to="/me/following/suggestions" onClick={closePopup} className="cursor-pointer m-0 p-0 no-underline">
              <div className="flex items-center">
                <div className="margin-3 width-8 aspect-square">
                  <MdOutlineExplore className="w-full h-full color-3 opacity-[0.65]" />
                </div>
                <p className="break-words text-ellipsis height-6 overflow-hidden color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">Explore topics</p>
              </div>
            </Link>
          </div>
          <div className="flex-none">
            <Link to="/me/following/suggestions" onClick={closePopup} className="cursor-pointer color-3 transition-all duration-75 ease opacity-[0.65] hover:opacity-[0.85]">
              <div className="width-8 aspect-square margin-5">
                <GoArrowUpRight className="w-full h-full" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ul>
  );
}

export default ExploreSection;
