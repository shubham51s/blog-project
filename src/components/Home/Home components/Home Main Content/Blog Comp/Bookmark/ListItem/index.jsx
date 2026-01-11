import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { IoLockClosedSharp } from "react-icons/io5";
import { useRequestHandler } from "../../../../../../../hooks/requestHandler";
import { showToast } from "../../../../../../../utils/toaster";

function ListItem({ list, blog, setBlog, setIsShow }) {
  const { requestHandler } = useRequestHandler();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveBlogFromList = async () => {
    setIsLoading(true);
    try {
      const params = {
        blog: blog._id,
      };

      const response = await requestHandler("/bookmarks/delete", "POST", params);

      const result = await response.json();

      if (response.status === 200) {
        showToast("Blog unsaved");
        setIsShow(false);
      } else {
        showToast("Some error occured", "error");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
      setIsLoading(false);
    }
  };

  const handleAddBlogToList = async () => {
    setIsLoading(true);
    try {
      const params = {
        blog: blog._id,
        list: list._id,
      };

      const response = await requestHandler("/list/items/create", "POST", params);

      const result = await response.json();

      if (response.status === 201) {
        showToast("Blog saved");
        setIsShow(false);
      } else {
        showToast("Some error occured", "error");
      }

      setIsLoading(false);
    } catch (err) {
      showToast("Some error occured", "error");
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleToggleBookmark = (val) => {
    setIsChecked(val);

    if (val) handleAddBlogToList();
  };

  return (
    <div className="padding54 padding-42 flex items-center justify-between cursor-default" style={{ paddingLeft: 0 }}>
      <div className="flex items-center">
        <div className="grow-0 shrink-0 basis-auto relative flex items-stretch width72 aspect-square margin-34" style={{ marginLeft: 0, marginBlock: 0 }}>
          <Checkbox checked={isChecked} disabled={isLoading} onChange={(e) => handleToggleBookmark(e.target.checked)} className="w-full h-full" />
        </div>
        <button disabled={isLoading} onClick={() => handleToggleBookmark(!isChecked)}>
          <p className="height-60 line-h-8 break-all line-clamp-1 font-10 color-3 font-normal m-0">{list.name}</p>
        </button>
      </div>
      {list.isPrivate && (
        <div className="padding50" style={{ paddingRight: 0 }}>
          <div className="width83 aspect-square color-3">
            <IoLockClosedSharp className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
