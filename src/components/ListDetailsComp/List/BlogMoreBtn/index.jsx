import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { UserContext } from "../../../../context/userContext";
import DisableBlogCommentsModal from "../../../Common/Modals/DisableComments";
import DeleteBlogModal from "../../../Common/Modals/ConfirmDeleteBlog";
import { Tooltip } from "@mui/material";

function BlogMoreBtn({ listItem, setListItems }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(listItem.blog.author.isFollowing);
  const [allowComments, setAllowComments] = useState(listItem.blog.allowComments);
  const [isHideResponseModal, setIsHideResponseModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [loaders, setLoaders] = useState({
    toggleFollowLoader: false,
    toggleCommentsLoader: false,
    removeListItemLoader: false,
  });

  const followUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));
    try {
      const params = {
        userToFollow: listItem.blog.author._id,
      };

      const response = await requestHandler("/follow/follow-user", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setIsFollowing(true);

        showToast(`Success! You're now following ${listItem.blog.author.name}`);
      } else {
        showToast("Some error occured");
      }

      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    }
  };

  const unfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));
    try {
      const params = {
        userToUnfollow: listItem.blog.author._id,
      };

      const response = await requestHandler("/follow/unfollow-user", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setIsFollowing(false);

        showToast(`You unfollowed ${listItem.blog.author.name}`);
      } else {
        showToast("Some error occured");
      }

      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    }
  };

  const handleCloseHideResponseModal = () => {
    setIsHideResponseModal(false);
  };

  const handleShowHideResponseModal = () => {
    setIsHideResponseModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleShowDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const hideResponses = async (setIsLoading) => {
    setIsLoading(true);
    try {
      const params = {
        blogId: listItem.blog._id,
      };

      const response = await requestHandler("/blogs/hide-responses", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setAllowComments(false);
        showToast("Responses are now hidden for this post.");
        setIsLoading(false);
        handleCloseHideResponseModal();
      } else {
        showToast("Some error occured");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
    }
  };

  const enableResponses = async () => {
    setLoaders((prev) => ({ ...prev, toggleCommentsLoader: true }));
    try {
      const params = {
        blogId: listItem.blog._id,
      };

      const response = await requestHandler("/blogs/show-responses", "POST", params);
      const result = await response.json();

      console.log("result -> ", result);

      if (response?.status === 200) {
        setAllowComments(true);
        showToast("Responses are now shown for this post.");
      }

      setLoaders((prev) => ({ ...prev, toggleCommentsLoader: false }));
    } catch (err) {
      console.error(err);
      setLoaders((prev) => ({ ...prev, toggleCommentsLoader: false }));
    }
  };

  const deleteBlog = async (setIsLoading) => {
    setIsLoading(true);
    try {
      // const response = await requestHandler(`/list/delete/${list._id}`, "DELETE");
      // if (response?.status === 200) {
      //   filterOutDeletedList(list._id);
      //   showToast("List deleted and removed from Your library");
      // } else {
      //   showToast("Some error occured");
      // }
      setIsLoading(false);
      handleCloseDeleteModal();
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
    }
  };

  const removeListItem = async () => {
    console.log("removeListItem: ");
    setLoaders((prev) => ({ ...prev, removeListItemLoader: true }));
    try {
      const params = {
        list: listItem.list,
        blog: listItem.blog._id,
      };

      const response = await requestHandler("/list/items/delete", "POST", params);

      if (response?.status === 204) {
        console.log("list item deleted: ", listItem._id);
        showToast("Successfully deleted");
        setListItems((prev) => [...prev.filter((item) => item._id !== listItem._id)]);
      } else {
        showToast("Some error occured");
      }

      setLoaders((prev) => ({ ...prev, removeListItemLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, removeListItemLoader: false }));
    }
  };

  return (
    <>
      <div className="margin-26">
        <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popover.Trigger className="relative padding-33 cursor-pointer m-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
            <div className="width-13 aspect-square">
              <Tooltip placement="top" arrow title="More">
                <MdOutlineMoreHoriz className="w-full h-full" />
              </Tooltip>
            </div>
          </Popover.Trigger>
          <Popover.Content side="bottom" className="z-[700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
            <div className="custom-bg-8 border-radius-3 overflow-hidden">
              {userInfo._id !== listItem.blog.author._id && (
                <ul className="flex flex-col items-stretch m-0 custom-px-2 width59 list-none">
                  <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                    <button onClick={removeListItem} disabled={loaders.removeListItemLoader} className={`cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease ${loaders.removeListItemLoader ? "" : "hover:opacity-100"}`}>
                      Remove item
                    </button>
                  </li>
                  {isFollowing && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={unfollowUser} disabled={loaders.toggleFollowLoader} className={`cursor-pointer m-0 p-0 transition-all opacity-[0.85] duration-75 ease ${loaders.toggleFollowLoader ? "" : " hover:opacity-100"}`}>
                        Unfollow author
                      </button>
                    </li>
                  )}
                  {!isFollowing && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={followUser} disabled={loaders.toggleFollowLoader} className={`cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease ${loaders.toggleFollowLoader ? "" : "hover:opacity-100"}`}>
                        Follow author
                      </button>
                    </li>
                  )}
                </ul>
              )}
              {userInfo._id === listItem.blog.author._id && (
                <ul className="flex flex-col items-stretch m-0 custom-px-2 width59 list-none">
                  <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                    <button onClick={removeListItem} disabled={loaders.removeListItemLoader} className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                      Remove item
                    </button>
                  </li>
                  <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                    <button className="cursor-pointer m-0 p-0 transition-all opacity-[0.85] duration-75 ease hover:opacity-100">Edit story</button>
                  </li>
                  {allowComments && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={handleShowHideResponseModal} className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                        Hide responses
                      </button>
                    </li>
                  )}
                  {!allowComments && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={enableResponses} disabled={loaders.toggleCommentsLoader} className={`cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease ${loaders.toggleCommentsLoader ? "" : "hover:opacity-100"}`}>
                        Show responses
                      </button>
                    </li>
                  )}
                  <li className="custom-px-2 padding59 color-9 custom-fs-1 font-normal">
                    <button onClick={handleShowDeleteModal} className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                      Delete story
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
      <DisableBlogCommentsModal isHideResponseModal={isHideResponseModal} handleCloseHideResponseModal={handleCloseHideResponseModal} hideResponses={hideResponses} />
      <DeleteBlogModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} deleteBlog={deleteBlog} />
    </>
  );
}

export default BlogMoreBtn;
