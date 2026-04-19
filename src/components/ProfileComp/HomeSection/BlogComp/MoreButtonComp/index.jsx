import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { RiMoreLine } from "react-icons/ri";
import Edit from "../../../../Common/BlogActions/Edit";

function MoreButton({ blog }) {
  return (
    <div className="margin-26">
      <div className="inline-block">
        <Popover.Root>
          <Popover.Trigger onClick={(e) => e.stopPropagation()}>
            <div className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="More">
              <div className="width-13 aspect-square">
                <RiMoreLine className="w-full h-full align-middle" />
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content side="bottom" className="z-[999]" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
            <div className="box-shadow-4 border-radius-3 box-border custom-bg-8 overflow-hidden">
              <ul className="width62 padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                <Edit blog={blog} />
                <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                  <button className="cursor-pointer m-0 p-0 flex items-center">
                    <div className="flex items-start text-left">Hide responses</div>
                  </button>
                </li>
                <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                  <button className="cursor-pointer m-0 p-0 flex items-center">
                    <div className="flex items-start text-left">Submit to publication</div>
                  </button>
                </li>
                <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                  <button className="cursor-pointer m-0 p-0 flex items-center color-9">
                    <div className="flex items-start text-left  color-9">Delete story</div>
                  </button>
                </li>
              </ul>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}

export default MoreButton;
