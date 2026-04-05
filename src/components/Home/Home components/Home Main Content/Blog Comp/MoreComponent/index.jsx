import React, { useContext, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import * as Popover from "@radix-ui/react-popover";
import { RiMoreLine } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { showToast } from "../../../../../../utils/toaster";
import { FollowingContext } from "../../../../../../context/followingContext";
import { useToggleUserFollow } from "../../../../../../hooks/toggleUserFollow";
import { useToggleMute } from "../../../../../../hooks/toggleMute";
import DeleteBlogModal from "../../../../../Common/Modals/ConfirmDeleteBlog";
import DeleteBlogBtn from "../../../../../Common/BlogActions/Delete";
import Edit from "../../../../../Common/BlogActions/Edit";

function MoreComp({ blog, removeBlogFromList }) {
  const { followUser, unfollowUser } = useToggleUserFollow();
  const { muteUser } = useToggleMute();
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const [loaders, setLoaders] = useState({
    isFollowLoader: false,
    mute: false,
  });

  const handleFollowAuthor = async () => {
    setLoaders((prev) => ({ ...prev, isFollowLoader: true }));

    const params = {
      _id: blog.author._id,
      name: blog.author.name,
    };
    await followUser(params);

    setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
  };

  const handleUnfollowAuthor = async () => {
    setLoaders((prev) => ({ ...prev, isFollowLoader: true }));

    const params = {
      _id: blog.author._id,
      name: blog.author.name,
    };
    await unfollowUser(params);

    setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
  };

  const handleMuteUser = async () => {
    setLoaders((prev) => ({ ...prev, mute: true }));
    const params = {
      target: blog.author._id,
      name: blog.author.name,
    };

    const isMuted = muteUser(params);
    setLoaders((prev) => ({ ...prev, mute: false }));

    if (isMuted) {
      removeBlogFromList();
    }
  };

  const handleAfterBlogDelete = () => {
    removeBlogFromList();
  };

  return (
    <>
      <div className="margin-26">
        <div className="inline-block">
          <Popover.Root>
            <Popover.Trigger>
              <div className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="More">
                <div className="width-13 aspect-square">
                  <RiMoreLine className="w-full h-full align-middle" />
                </div>
              </div>
            </Popover.Trigger>
            <Popover.Content side="bottom" className="z-[999]" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
              <div className="box-shadow-4 border-radius-3 box-border custom-bg-8 overflow-hidden">
                {/* below options are for others blog */}
                {!blog.isMyBlog && (
                  <ul className="width59 padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 flex items-center">
                        <div className="grow-0 shrink-0 basis-auto margin-7" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <div className="width-13 aspect-square align-middle">
                            <CiCircleMinus className="w-full h-full" />
                          </div>
                        </div>
                        <div className="flex items-start text-left my-auto">Show less like this</div>
                      </button>
                    </li>
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    {!isFetchUserLoader && (
                      <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                        {!followingUsers[blog.author._id] && (
                          <button onClick={handleFollowAuthor} className="cursor-pointer m-0 p-0" disabled={loaders.isFollowLoader}>
                            Follow author
                          </button>
                        )}
                        {followingUsers[blog.author._id] && (
                          <button onClick={handleUnfollowAuthor} className="cursor-pointer m-0 p-0" disabled={loaders.isFollowLoader}>
                            Unfollow author
                          </button>
                        )}
                      </li>
                    )}
                    {blog.community && (
                      <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                        <button className="cursor-pointer m-0 p-0">Follow publication</button>
                      </li>
                    )}
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0" onClick={handleMuteUser} disabled={loaders.mute}>
                        Mute author
                      </button>
                    </li>
                    {blog.community && (
                      <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                        <button className="cursor-pointer m-0 p-0">Mute publication</button>
                      </li>
                    )}
                    <li className="custom-px-2 padding59 custom-fs-1 font-normal opacity-[0.9] transition-all duration-200 ease-in-out hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 color-9">Report story...</button>
                    </li>
                  </ul>
                )}
                {blog.isMyBlog && (
                  <ul className="width62 padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <Edit blog={blog} />
                    </li>
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 flex items-center">
                        <div className="flex items-start text-left">Hide responses</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 flex items-center">
                        <div className="flex items-start text-left">Submit to publication</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 custom-fs-1 color1 font-normal opacity-75 transition-all duration-200 ease-in-out hover:opacity-100">
                      <DeleteBlogBtn blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />
                    </li>
                  </ul>
                )}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </>
  );
}

export default MoreComp;
