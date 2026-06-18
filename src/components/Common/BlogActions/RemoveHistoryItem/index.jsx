import React, { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";

function RemoveHistoryItem({ blog, type = "listItem", removeListItem = () => {} }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveHistoryItem = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/blog/read/user/remove/${blog._id}`, "DELETE");
      const result = await response.json();
      response?.status === 200 ? removeListItem() : showToast(result?.message || "Some error occured.");
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {type === "listItem" && (
        <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
          <button onClick={handleRemoveHistoryItem} disabled={isLoading} className="cursor-pointer m-0 p-0 text-[#c94a4a] transition-all duration-75 ease hover:text-[#b63636]">
            Remove from reading history
          </button>
        </li>
      )}

      {type === "button" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveHistoryItem();
          }}
          disabled={isLoading}
          className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100"
        >
          <Tooltip arrow placement="top" enterDelay={500} title="Remove from reading history">
            <div className="width-13 aspect-square">
              <RiDeleteBin5Line className="w-full h-full" />
            </div>
          </Tooltip>
        </button>
      )}
    </>
  );
}

export default RemoveHistoryItem;
