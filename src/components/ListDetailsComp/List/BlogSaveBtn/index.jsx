import React, { useState } from "react";
import { IoMdBookmark } from "react-icons/io";
import { MdOutlineBookmarkAdd } from "react-icons/md";

function SaveBlog() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveBlogToList = async () => {
    setIsLoading(true);
    try {
      setIsSaved(true);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const unsaveBlogToList = async () => {
    setIsLoading(true);
    try {
      setIsSaved(false);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="color-3">
      {isSaved && (
        <button onClick={unsaveBlogToList} disabled={isLoading} className="relative padding-33 cursor-pointer m-0" title="Unsave">
          <div className="width-13 color-3 aspect-square opacity-[0.75] transition-all duration-75 ease hover:opacity-100">
            <IoMdBookmark className="w-full h-full" />
          </div>
        </button>
      )}

      {!isSaved && (
        <button onClick={saveBlogToList} disabled={isLoading} className="relative padding-33 cursor-pointer m-0">
          <div className="width-13 color-3 aspect-square opacity-[0.75] transition-all duration-75 ease hover:opacity-100" title="Save">
            <MdOutlineBookmarkAdd className="w-full h-full" />
          </div>
        </button>
      )}
    </div>
  );
}

export default SaveBlog;
