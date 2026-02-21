import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import * as Popover from "@radix-ui/react-popover";
import { useToggleUserFollow } from "../../../../../hooks/toggleUserFollow";
import { FollowingContext } from "../../../../../context/followingContext";
import { showToast } from "../../../../../utils/toaster";
import { UserContext } from "../../../../../context/userContext";

function MoreButton({ blog, setBlog, removeBlogFromHistory }) {
  const { userInfo } = useContext(UserContext);
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isMuteUser, setIsMuteUser] = useState(true);
  const [loaders, setLoaders] = useState({
    delete: false,
    follow: false,
  });

  const handleRemoveBlogBtnClick = async () => {
    setLoaders((prev) => ({ ...prev, delete: true }));
    try {
      const params = {
        blogId: blog._id,
      };
      const isDeleted = await removeBlogFromHistory(params);

      if (isDeleted) setBlog(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaders((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleFollowUser = async () => {
    setLoaders((prev) => ({ ...prev, follow: true }));
    try {
      const isSuccess = await followUser(blog.author._id);

      if (isSuccess) {
        showToast(`Success! You're now following ${blog.author.name}.`);
      } else {
        showToast("Some error occured.");
      }
    } catch (err) {
      showToast("Some error occured.");
    } finally {
      setLoaders((prev) => ({ ...prev, follow: false }));
    }
  };

  const handleUnfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, follow: true }));
    try {
      const isSuccess = await unfollowUser(blog.author._id);

      if (isSuccess) {
        showToast(`You unfollowed ${blog.author.name}.`);
      } else {
        showToast("Some error occured.");
      }
    } catch (err) {
      showToast("Some error occured.");
    } finally {
      setLoaders((prev) => ({ ...prev, follow: false }));
    }
  };

  const handleMuteUser = () => {
    setIsMuteUser(true);
  };

  const handleUnmuteUser = () => {
    setIsMuteUser(false);
  };

  return (
    <Popover.Root>
      <Popover.Trigger onClick={(e) => e.stopPropagation()} className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
        <Tooltip arrow placement="top" enterDelay={500} title="More">
          <div className="width-13 aspect-square">
            <MdOutlineMoreHoriz className="w-full h-full" />
          </div>
        </Tooltip>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content onClick={(e) => e.stopPropagation()} side="bottom" align="middle" sideOffset={1} className="box-shadow-4 border-radius-3 box-border custom-bg-8">
          <Popover.Arrow className="fill-white" />
          <ul className="flex flex-col items-stretch p-0 m-0 list-none custom-px-2 width59 overflow-hidden">
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button onClick={handleRemoveBlogBtnClick} disabled={loaders.delete} className="cursor-pointer m-0 p-0 text-[#c94a4a] transition-all duration-75 ease hover:text-[#b63636]">
                Remove from reading history
              </button>
            </li>
            <li className="custom-px-2">
              <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
            </li>
            {!isFetchUserLoader && userInfo._id !== blog.author._id && (
              <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
                {!followingUsers[blog.author._id] && (
                  <button onClick={handleFollowUser} disabled={loaders.follow} className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                    Follow author
                  </button>
                )}
                {followingUsers[blog.author._id] && (
                  <button onClick={handleUnfollowUser} disabled={loaders.follow} className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                    Unfollow author
                  </button>
                )}
              </li>
            )}
            {blog.publication && (
              <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
                <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Follow publication</button>
              </li>
            )}
            {!isFetchUserLoader && userInfo._id !== blog.author._id && !blog.publication && (
              <li className="custom-px-2">
                <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
              </li>
            )}
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              {!isMuteUser && (
                <button onClick={handleMuteUser} className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                  Mute author
                </button>
              )}
              {isMuteUser && (
                <button onClick={handleUnmuteUser} className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                  Unmute author
                </button>
              )}
            </li>
            {blog.publication && (
              <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
                <button className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Mute publication</button>
              </li>
            )}
            <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal">
              <button className="cursor-pointer m-0 p-0 text-[#c94a4a] transition-all duration-75 ease hover:text-[#b63636]">Report story</button>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default MoreButton;
