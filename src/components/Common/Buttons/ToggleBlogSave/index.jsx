import React, { useContext, useEffect, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import * as Popover from "@radix-ui/react-popover";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import CreateNewListModal from "../../Modals/CreateNewList";
import { ListContext } from "../../../../context/listContext";
import { showToast } from "../../../../utils/toaster";

function SaveBlog({ item, handleToggleBlogSaveInParent = () => {} }) {
  const [blog, setBlog] = useState({ ...item });
  const { requestHandler } = useRequestHandler();
  const { myLists, isListLoader } = useContext(ListContext);
  const [isBookmarkLoader, setIsBookmarkLoader] = useState(false);
  const [isCreateListModal, setIsCreateListModal] = useState(false);

  const saveBlogToDefaultList = async () => {
    setIsBookmarkLoader(true);
    try {
      const params = {
        blog: blog._id,
      };
      const response = await requestHandler("/list/items/save-to-default-list", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?._id) {
        setBlog((prev) => ({ ...prev, lists: [...prev.lists, result.data._id] }));
        handleToggleBlogSaveInParent("add", result.data._id);
      }

      setIsBookmarkLoader(false);
    } catch (err) {
      console.error(err);
      setIsBookmarkLoader(false);
    }
  };

  const handleCreateNewBlogBtnClick = () => {
    setIsCreateListModal(true);
  };

  const handleBookmarkBtnClick = (e) => {
    e.stopPropagation();

    if (blog?.lists?.length === 0) {
      saveBlogToDefaultList();
    }
  };

  const handleAddBlogToList = async (list, setIsLoading) => {
    try {
      const params = {
        blog: blog._id,
        list,
      };

      const response = await requestHandler("/list/items/create", "POST", params);
      const result = await response.json();

      if (response?.status === 201 && result?.data?.listItem) {
        setBlog((prev) => ({ ...prev, lists: [...prev.lists, result.data.listItem.list] }));
        handleToggleBlogSaveInParent("add", result.data.listItem.list);
      } else {
        showToast(result?.message || "Some error occured");
      }
    } catch (err) {
      showToast("Some error occured");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsCreateListModal(false);
    }
  };

  const createNewUserList = async (list, setIsLoading) => {
    handleAddBlogToList(list._id, setIsLoading);
  };

  useEffect(() => {
    setBlog({ ...item });
  }, [item]);

  return (
    <>
      {!isListLoader && (
        <div className="inline-block">
          <Popover.Root>
            <Popover.Trigger onClick={(e) => handleBookmarkBtnClick(e)} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out color-3 opacity-[0.8] hover:opacity-100" title="Save">
              <div className="width-13 aspect-square">
                {!blog.lists.length > 0 && <MdOutlineBookmarkAdd className="w-full h-full align-middle" />}
                {blog.lists.length > 0 && <IoBookmark className="w-full h-full align-middle" />}
              </div>
            </Popover.Trigger>
            <Popover.Content onClick={(e) => e.stopPropagation()} side="bottom" align="middle" sideOffset={1} className="z-[700] box-shadow-4 border-radius-3 box-border">
              <div className="border-radius-3 custom-bg-8 overflow-hidden">
                {!isBookmarkLoader && (
                  <div className="width82">
                    <div className="padding-16 padding80 padding81 padding82 height82 overflow-y-auto">
                      <div>
                        {myLists.map((item) => (
                          <ListItem list={item} blog={blog} setBlog={setBlog} handleToggleBlogSaveInParent={handleToggleBlogSaveInParent} key={item._id} />
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
                )}
                {isBookmarkLoader && (
                  <div className="width82 height67 flex items-center justify-center">
                    <div className="h-[25%] aspect-square border-2 border-gray-500 border-t-0 border-r-0 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      )}

      <CreateNewListModal isCreateListModal={isCreateListModal} setIsCreateListModal={setIsCreateListModal} createNewUserList={createNewUserList} />
    </>
  );
}

export default SaveBlog;
