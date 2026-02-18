import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";

function DeleteButton({ blog, setBlog, removeBlogFromHistory }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveBlogBtnClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const params = {
        blogId: blog._id,
      };
      const isDeleted = await removeBlogFromHistory(params);

      if (isDeleted) setBlog(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={(e) => handleRemoveBlogBtnClick(e)} disabled={isLoading} className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
      <Tooltip arrow placement="top" enterDelay={500} title="Remove from reading history">
        <div className="width-13 aspect-square">
          <RiDeleteBin5Line className="w-full h-full" />
        </div>
      </Tooltip>
    </button>
  );
}

export default DeleteButton;
