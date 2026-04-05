import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { UserContext } from "../../../../context/userContext";
import DisableBlogCommentsModal from "../../../Common/Modals/DisableComments";
import DeleteBlogModal from "../../../Common/Modals/ConfirmDeleteBlog";
import { Tooltip } from "@mui/material";
import { FollowingContext } from "../../../../context/followingContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function BlogMoreBtn({ listItem, deleteListItem, list }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allowComments, setAllowComments] = useState(listItem.blog.allowComments);
  const [isHideResponseModal, setIsHideResponseModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [loaders, setLoaders] = useState({
    toggleFollowLoader: false,
    toggleCommentsLoader: false,
    removeListItemLoader: false,
  });

  const handleFollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));

    const params = {
      _id: listItem.blog.author._id,
      name: listItem.blog.author.name,
    };
    await followUser(params);

    setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
  };

  const handleUnfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));

    const params = {
      _id: listItem.blog.author._id,
      name: listItem.blog.author.name,
    };
    await unfollowUser(params);

    setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
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

  const removeListItem = async () => {
    setLoaders((prev) => ({ ...prev, removeListItemLoader: true }));
    await deleteListItem();
    setLoaders((prev) => ({ ...prev, removeListItemLoader: false }));
  };

  return (
    <>
      <div className="margin-26">
        <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popover.Trigger onClick={(e) => e.stopPropagation()} className="relative padding-33 cursor-pointer m-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
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
                  {list.user._id === userInfo._id && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={removeListItem} disabled={loaders.removeListItemLoader} className={`cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease ${loaders.removeListItemLoader ? "" : "hover:opacity-100"}`}>
                        Remove item
                      </button>
                    </li>
                  )}
                  {!isFetchUserLoader && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      {followingUsers[listItem.blog.author._id] && (
                        <button onClick={handleUnfollowUser} disabled={loaders.toggleFollowLoader} className={`cursor-pointer m-0 p-0 transition-all opacity-[0.85] duration-75 ease ${loaders.toggleFollowLoader ? "" : " hover:opacity-100"}`}>
                          Unfollow author
                        </button>
                      )}
                      {!followingUsers[listItem.blog.author._id] && (
                        <button onClick={handleFollowUser} disabled={loaders.toggleFollowLoader} className={`cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease ${loaders.toggleFollowLoader ? "" : "hover:opacity-100"}`}>
                          Follow author
                        </button>
                      )}
                    </li>
                  )}
                </ul>
              )}
              {userInfo._id === listItem.blog.author._id && (
                <ul className="flex flex-col items-stretch m-0 custom-px-2 width59 list-none">
                  {list.user._id === userInfo._id && (
                    <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                      <button onClick={removeListItem} disabled={loaders.removeListItemLoader} className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                        Remove item
                      </button>
                    </li>
                  )}
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
      <DeleteBlogModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} blog={listItem.blog} />
    </>
  );
}

export default BlogMoreBtn;
