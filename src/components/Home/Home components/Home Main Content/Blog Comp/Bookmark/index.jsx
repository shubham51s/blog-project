import React, { useState } from "react";
import { useRequestHandler } from "../../../../../../hooks/requestHandler";
import { showToast } from "../../../../../../utils/toaster";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import * as Popover from "@radix-ui/react-popover";
import ListItem from "./ListItem";

function Bookmark({ item, lists, showCreateListModal }) {
  const { requestHandler } = useRequestHandler();
  const [blog, setBlog] = useState({ ...item });
  const [isShow, setIsShow] = useState(false);
  const [loaders, setLoaders] = useState({
    isDefaultBookmarkLoader: true,
  });

  const handleCreateNewBlogBtnClick = () => {
    showCreateListModal({ id: blog._id });
  };

  return (
    <div className="inline-block">
      {/* {!blog?.isBookmarked && ( */}

      <Popover.Root open={isShow} onOpenChange={setIsShow}>
        <Popover.Trigger onClick={(e) => e.stopPropagation()} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Save">
          <div className="width-13 aspect-square">
            {!blog.lists.length > 0 && <CiBookmarkPlus className="w-full h-full align-middle" />}
            {blog.lists.length > 0 && <IoBookmark className="w-full h-full align-middle" />}
          </div>
        </Popover.Trigger>
        <Popover.Content side="bottom" className="z-[700] box-shadow-4 border-radius-3 box-border" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
          <div className="border-radius-3 custom-bg-8 overflow-hidden">
            <div className="width82">
              <div className="padding-16 padding80 padding81 padding82 height82 overflow-y-auto">
                <div>
                  {lists.map((item) => (
                    <ListItem list={item} blog={blog} setBlog={setBlog} key={item._id} />
                  ))}
                </div>
              </div>

              {/* bottom create new list */}
              <div className="padding63 padding75 padding83 padding82 bdr-5" style={{ borderBottom: 0, borderInline: 0 }}>
                <p className="text-[#1a8917] line-h-8 font-10 font-normal m-0">
                  <button onClick={handleCreateNewBlogBtnClick} className="cursor-pointer m-0 p-0">
                    Create new list
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default Bookmark;
