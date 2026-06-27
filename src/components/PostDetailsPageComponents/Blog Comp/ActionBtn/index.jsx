import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { RiMoreFill } from "react-icons/ri";
import { UserContext } from "../../../../context/userContext";
import Edit from "../../../Common/BlogActions/Edit";
import StoryStatsBtn from "../../../Common/BlogActions/StoryStats";
import BreakLine from "../../../Common/BlogActions/BreakLine";
import FollowAuthorBtn from "../../../Common/BlogActions/FollowAuthor";
import FollowPublicationBtn from "../../../Common/BlogActions/FollowPublication";
import SubmitToPublicationBtn from "../../../Common/BlogActions/SubmitToPublication";
import MuteAuthorBtn from "../../../Common/BlogActions/MuteAuthor";
import MutePublicationBtn from "../../../Common/BlogActions/MutePublication";
import HideResponsesBtn from "../../../Common/BlogActions/HideResponses";
import ReportStory from "../../../Common/BlogActions/ReportStory";
import DeleteBlogBtn from "../../../Common/BlogActions/Delete";

function ActionBtn({ blog, setBlog, handleAfterBlogDelete }) {
  const { userInfo } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
      <Popover.Trigger className="padding-33 cursor-pointer m-0 color-3 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
        <div className="width-13 aspect-square">
          <RiMoreFill className="w-full h-full" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" align="middle" sideOffset={2} className="box-shadow-4 border-radius-3">
          <div className="box-shadow-4 border-radius-3 box-border custom-bg-8 overflow-hidden">
            <ul className="flex flex-col items-stretch p-0 m-0 list-none custom-px-2 width59 overflow-hidden">
              <Edit blog={blog} />
              <StoryStatsBtn blog={blog} />
              {userInfo._id === blog.author._id && <BreakLine />}
              <FollowAuthorBtn user={blog.author} />
              <FollowPublicationBtn publication={blog.publication} />
              <SubmitToPublicationBtn blog={blog} closePopup={closePopup} setBlog={setBlog} />
              <BreakLine />
              <MuteAuthorBtn user={blog.author} />
              <MutePublicationBtn publication={blog.publication} />
              <HideResponsesBtn blog={blog} closePopup={closePopup} setBlog={setBlog} />
              <ReportStory blog={blog} closePopup={closePopup} />
              <DeleteBlogBtn blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} closePopup={closePopup} />
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ActionBtn;
