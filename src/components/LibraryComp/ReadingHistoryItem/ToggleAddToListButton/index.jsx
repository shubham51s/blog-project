import React, { useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { IoBookmark } from "react-icons/io5";

function ToggleAddToListButton() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToList = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <button onClick={handleAddToList} disabled={isLoading} className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
      <Tooltip arrow placement="top" enterDelay={500} title="Save">
        <div className="width-13 aspect-square">
          {!isSaved && <MdOutlineBookmarkAdd className="w-full h-full" />}
          {isSaved && <IoBookmark className="w-full h-full" />}
        </div>
      </Tooltip>
    </button>
  );
}

export default ToggleAddToListButton;
