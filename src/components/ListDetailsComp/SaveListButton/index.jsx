import React, { useContext, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { UserContext } from "../../../context/userContext";
import { showToast } from "../../../utils/toaster";

function SaveList({ list }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(list.isSavedByMe || false);
  const [isLoading, setIsLoading] = useState(false);

  const saveList = async () => {
    setIsLoading(true);
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/toggle-save/save", "POST", params);

      if (response?.status === 200) {
        setIsSaved(true);
        showToast("List saved to Your Library");
      } else {
        showToast("Some error occured");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
    }
  };

  const unsaveList = async () => {
    setIsLoading(true);
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/toggle-save/unsave", "POST", params);
      const result = await response.json();

      console.log("result: ", result);

      if (response?.status === 200) {
        setIsSaved(false);
        showToast("List removed from Your Library");
      } else {
        showToast("Some error occured");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
    }
  };

  return (
    <div className="margin-12 shrink-0" style={{ marginLeft: 0 }}>
      {!isSaved && (
        <button onClick={saveList} disabled={isLoading} className={`custom-px-2 padding-36 color-3 m-0 transition-all duration-75 ease ${isLoading ? "cursor-default opacity-50" : "cursor-pointer opacity-[0.8] hover:opacity-100"}`} title="Save list">
          <div className="width-13 aspect-square">
            <MdOutlineBookmarkAdd className="w-full h-full" />
          </div>
        </button>
      )}
      {isSaved && (
        <button onClick={unsaveList} disabled={isLoading} className={`custom-px-2 padding-36 color-3 m-0 transition-all duration-75 ease ${isLoading ? "cursor-default opacity-50" : "cursor-pointer opacity-[0.8] hover:opacity-100"}`} title="Remove from Your library">
          <div className="width-13 aspect-square">
            <MdOutlineBookmark className="w-full h-full" />
          </div>
        </button>
      )}
    </div>
  );
}

export default SaveList;
