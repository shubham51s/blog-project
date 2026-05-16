import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

function RecentSearchSection() {
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
    <div className="grow shrink-0 basis-auto">
      <div className="flex justify-center custom-bg-8">
        <div className="w-full min-w-0 max-width-2 margin-12">
          <div className="margin56 margin54">
            <div className="margin57">
              <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-all line-clamp-1 font-semibold color-3 m-0">Recent searches</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full min-w-0 max-width-2 margin-12">
          <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
            {searchList.map((item, index) => (
              <ListItem item={item} clearSearchHistoryItem={clearSearchHistoryItem} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentSearchSection;
