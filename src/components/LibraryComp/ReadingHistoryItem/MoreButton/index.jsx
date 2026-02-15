import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

function MoreButton() {
  return (
    <button className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
      <Tooltip arrow placement="top" enterDelay={500} title="More">
        <div className="width-13 aspect-square">
          <MdOutlineMoreHoriz className="w-full h-full" />
        </div>
      </Tooltip>
    </button>
  );
}

export default MoreButton;
