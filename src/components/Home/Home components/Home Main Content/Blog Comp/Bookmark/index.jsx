import React, { useState } from "react";
import { useRequestHandler } from "../../../../../../hooks/requestHandler";
import { showToast } from "../../../../../../utils/toaster";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import * as Popover from "@radix-ui/react-popover";

function Bookmark({ item, list, setList }) {
  const { requestHandler } = useRequestHandler();
  const [blog, setBlog] = useState({ ...item });
  const [loaders, setLoaders] = useState({
    isBookmarkLoader: false,
  });

  const deleteBookmark = async () => {
    setLoaders((prev) => ({ ...prev, isBookmarkLoader: true }));

    try {
      const params = {
        blog: blog._id,
      };

      const response = await requestHandler("/bookmarks/delete", "POST", params);

      const result = await response.json();

      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));

      if (response.status === 200) {
        setBlog({ ...blog, isBookmarked: false });
        showToast("Blog unsaved");
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));
    }
  };

  const addBookmark = async () => {
    setLoaders((prev) => ({ ...prev, isBookmarkLoader: true }));

    try {
      const params = {
        blog: blog._id,
      };

      const response = await requestHandler("/bookmarks", "POST", params);

      const result = await response.json();
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));

      if (response.status === 200) {
        setBlog({ ...blog, isBookmarked: true });
        showToast("Blog saved");
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      showToast("Some error occured", "error");
      console.error(err);
      setLoaders((prev) => ({ ...prev, isBookmarkLoader: false }));
    }
  };

  const handleBookmarkBlogBtnClick = (e) => {
    if (loaders.isBookmarkLoader) return;

    e.stopPropagation();
    if (blog.isBookmarked) {
      deleteBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <div className="inline-block">
      {/* <button onClick={(e) => handleBookmarkBlogBtnClick(e)} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Save">
        <div className="width-13 aspect-square">
          {!blog?.isBookmarked && <CiBookmarkPlus className="w-full h-full align-middle" />}
          {blog?.isBookmarked && <IoBookmark className="w-full h-full align-middle" />}
        </div>
      </button> */}

      {/* {!blog?.isBookmarked && ( */}

      <Popover.Root>
        <Popover.Trigger className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Save">
          <div className="width-13 aspect-square">
            <CiBookmarkPlus className="w-full h-full align-middle" />
            {/* {blog?.isBookmarked && <IoBookmark className="w-full h-full align-middle" />} */}
          </div>
        </Popover.Trigger>
        <Popover.Content side="bottom" className="z-[700] box-shadow-4 border-radius-3 box-border" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
          <div className="border-radius-3 custom-bg-8 overflow-hidden">
            <div className="width82">
              {/* working */}
              <div className=""></div>
              {/* bottom create new list */}
              <div className=""></div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default Bookmark;
