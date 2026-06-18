import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import * as Popover from "@radix-ui/react-popover";
import { useToggleUserFollow } from "../../../../../hooks/toggleUserFollow";
import { FollowingContext } from "../../../../../context/followingContext";
import { showToast } from "../../../../../utils/toaster";
import { UserContext } from "../../../../../context/userContext";
import FollowAuthorBtn from "../../../../Common/BlogActions/FollowAuthor";
import BreakLine from "../../../../Common/BlogActions/BreakLine";
import FollowPublicationBtn from "../../../../Common/BlogActions/FollowPublication";
import MuteAuthorBtn from "../../../../Common/BlogActions/MuteAuthor";
import MutePublicationBtn from "../../../../Common/BlogActions/MutePublication";
import ReportStory from "../../../../Common/BlogActions/ReportStory";
import RemoveHistoryItem from "../../../../Common/BlogActions/RemoveHistoryItem";
import DeleteBlogBtn from "../../../../Common/BlogActions/Delete";
import StoryStatsBtn from "../../../../Common/BlogActions/StoryStats";
import Edit from "../../../../Common/BlogActions/Edit";
import SubmitToPublicationBtn from "../../../../Common/BlogActions/SubmitToPublication";
import HideResponsesBtn from "../../../../Common/BlogActions/HideResponses";

function MoreButton({ blog, setBlog, removeListItem }) {
  const { userInfo } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const isMyBlog = userInfo._id === blog?.author?._id;

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger className="cursor-pointer m-0 padding-33 color-3 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
        <Tooltip arrow placement="top" enterDelay={500} title="More">
          <div className="width-13 aspect-square">
            <MdOutlineMoreHoriz className="w-full h-full" />
          </div>
        </Tooltip>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content onClick={(e) => e.stopPropagation()} side="bottom" align="middle" sideOffset={1} className="box-shadow-4 border-radius-3 box-border custom-bg-8 z-99">
          <Popover.Arrow className="fill-white" />
          <ul className="flex flex-col items-stretch p-0 m-0 list-none custom-px-2 width59 overflow-hidden">
            <RemoveHistoryItem blog={blog} removeListItem={removeListItem} />
            <BreakLine />
            <Edit blog={blog} />
            <StoryStatsBtn blog={blog} />
            {isMyBlog && <BreakLine />}
            <FollowAuthorBtn user={blog.author} />
            <FollowPublicationBtn publication={blog.publication} />
            <SubmitToPublicationBtn blog={blog} closePopup={closePopup} />
            <BreakLine />
            <MuteAuthorBtn user={blog.author} />
            <MutePublicationBtn publication={blog.publication} />
            <HideResponsesBtn blog={blog} closePopup={closePopup} setBlog={setBlog} />
            <ReportStory blog={blog} closePopup={closePopup} />
            <DeleteBlogBtn blog={blog} handleAfterBlogDelete={removeListItem} closePopup={closePopup} />
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default MoreButton;
