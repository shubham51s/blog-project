import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import * as Popover from "@radix-ui/react-popover";

function MoreButton() {
  return (
    <Popover.Root modal>
      <Popover.Trigger className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
        <Tooltip arrow placement="top" enterDelay={500} title="More">
          <div className="width-13 aspect-square">
            <MdOutlineMoreHoriz className="w-full h-full" />
          </div>
        </Tooltip>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" align="middle" sideOffset={1} className="box-shadow-4 border-radius-3 box-border custom-bg-8">
          <Popover.Arrow className="fill-white" />
          <ul className="flex flex-col items-stretch p-0 m-0 list-none custom-px-2 width59 overflow-hidden">
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 text-[#c94a4a] transition-all duration-75 ease hover:text-[#b63636]">Remove from reading history</button>
            </li>
            <li className="custom-px-2">
              <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
            </li>
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Follow author</button>
            </li>
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Follow publication</button>
            </li>
            <li className="custom-px-2">
              <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
            </li>
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Mute author</button>
            </li>
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Mute publication</button>
            </li>
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 text-[#c94a4a] transition-all duration-75 ease hover:text-[#b63636]">Report story</button>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default MoreButton;
