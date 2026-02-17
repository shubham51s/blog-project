import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";

function DeleteButton() {
  const handleDeleteBlogFromHistoryBtnClick = (e) => {
    e.stopPropagation();
  };

  return (
    <button onClick={(e) => handleDeleteBlogFromHistoryBtnClick(e)} className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
      <Tooltip arrow placement="top" enterDelay={500} title="Remove from reading history">
        <div className="width-13 aspect-square">
          <RiDeleteBin5Line className="w-full h-full" />
        </div>
      </Tooltip>
    </button>
  );
}

export default DeleteButton;
