import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function ListItem({ item, clearSearchHistoryItem }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(`/search/posts?q=${item}`)} className="cursor-pointer">
          <span className="height-60 line-h-8 font-10 break-all color-3 line-clamp-1">{item}</span>
        </button>
        <button onClick={() => clearSearchHistoryItem(item)} className="cursor-pointer">
          <div className="width-13 aspect-square color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-[0.9]">
            <VscClose className="w-full h-full" />
          </div>
        </button>
      </div>
      <div className="margin79 margin80">
        <div className="h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
      </div>
    </>
  );
}

export default ListItem;
