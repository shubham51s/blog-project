import { Dialog } from "@mui/material";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import ListItem from "./ListItem";

function EditorsListModal({ handleCloseModal }) {
  return (
    <div onClick={handleCloseModal} className="fixed bottom-0 top-0 left-0 right-0 z-[800] flex items-center justify-center overflow-x-hidden overflow-y-auto scroll-smooth bg13">
      <div onClick={(e) => e.stopPropagation()} className="padding71 padding91 m-auto">
        <div className="width-3">
          <div className="flex items-center justify-between padding71" style={{ paddingTop: 0 }}>
            <h2 className="font-12 font-medium color-3 m-0 letter-spacing-7 line-h-10">Editors</h2>
            <div className="relative">
              <button onClick={handleCloseModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.75] transition-all duration-75 ease hover:opacity-[0.85]">
                <div className="width58 aspect-square">
                  <IoCloseOutline className="w-full h-full" />
                </div>
              </button>
            </div>
          </div>

          <div>
            {Array.from({ length: 12 }).map((_, item) => (
              <ListItem key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorsListModal;
