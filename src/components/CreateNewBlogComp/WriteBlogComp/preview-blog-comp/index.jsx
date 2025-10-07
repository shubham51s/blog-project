import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function PreviewBlogComp() {
  return (
    <div className="custom-bg-8 fixed overflow-auto text-center top-0 left-0 bottom-0 right-0 flex z-[900] w-full p-0 m-0 border-0">
      <div className="m-auto overflow-hidden padding54 padding53 width57 relative">
        <div className="color13 margin42" style={{ marginInline: 0, marginTop: 0 }}>
          <div className="flex">
            <button className="absolute top-0 right-0 padding44 text-left align-baseline inline-block color-6 custom-bg-8 font-10 cursor-pointer select-none box-border font-normal transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
              <div className="width58 aspect-square">
                <IoCloseOutline className="w-full h-full" />
              </div>
            </button>
            {/* working */}
            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto"></div>

            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBlogComp;
