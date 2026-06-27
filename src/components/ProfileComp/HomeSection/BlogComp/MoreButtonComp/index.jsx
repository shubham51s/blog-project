import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { RiMoreLine } from "react-icons/ri";
import Edit from "../../../../Common/BlogActions/Edit";
import StoryStatsBtn from "../../../../Common/BlogActions/StoryStats";
import BreakLine from "../../../../Common/BlogActions/BreakLine";
import FollowAuthorBtn from "../../../../Common/BlogActions/FollowAuthor";
import FollowPublicationBtn from "../../../../Common/BlogActions/FollowPublication";
import SubmitToPublicationBtn from "../../../../Common/BlogActions/SubmitToPublication";
import MuteAuthorBtn from "../../../../Common/BlogActions/MuteAuthor";
import MutePublicationBtn from "../../../../Common/BlogActions/MutePublication";
import HideResponsesBtn from "../../../../Common/BlogActions/HideResponses";
import ReportStory from "../../../../Common/BlogActions/ReportStory";
import DeleteBlogBtn from "../../../../Common/BlogActions/Delete";
import { UserContext } from "../../../../../context/userContext";

function MoreButton({ blog, setBlog, removeBlogFromList }) {
  const { userInfo } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="margin-26">
      <div className="inline-block">
        <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popover.Trigger onClick={(e) => e.stopPropagation()}>
            <div className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="More">
              <div className="width-13 aspect-square">
                <RiMoreLine className="w-full h-full align-middle" />
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content side="bottom" className="z-[999]" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
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
                <DeleteBlogBtn blog={blog} handleAfterBlogDelete={removeBlogFromList} closePopup={closePopup} />
              </ul>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}

export default MoreButton;
