import React, { useContext, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import * as Popover from "@radix-ui/react-popover";
import { RiMoreLine } from "react-icons/ri";
import { FollowingContext } from "../../../../../../context/followingContext";
import DeleteBlogBtn from "../../../../../Common/BlogActions/Delete";
import Edit from "../../../../../Common/BlogActions/Edit";
import FollowAuthorBtn from "../../../../../Common/BlogActions/FollowAuthor";
import FollowPublicationBtn from "../../../../../Common/BlogActions/FollowPublication";
import MuteAuthorBtn from "../../../../../Common/BlogActions/MuteAuthor";
import SubmitToPublicationBtn from "../../../../../Common/BlogActions/SubmitToPublication";
import MutePublicationBtn from "../../../../../Common/BlogActions/MutePublication";
import ReportStory from "../../../../../Common/BlogActions/ReportStory";
import BreakLine from "../../../../../Common/BlogActions/BreakLine";
import { UserContext } from "../../../../../../context/userContext";
import StoryStatsBtn from "../../../../../Common/BlogActions/StoryStats";
import HideResponsesBtn from "../../../../../Common/BlogActions/HideResponses";

function MoreComp({ blog, removeBlogFromList, setBlog }) {
  const { userInfo } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMuteStatusChange = (isMuted) => {
    if (isMuted) {
      removeBlogFromList();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="margin-26">
        <div className="inline-block">
          <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <Popover.Trigger>
              <div className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-75 ease opacity-[0.7] hover:opacity-100" title="More">
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
                  <MuteAuthorBtn user={blog.author} handleMuteStatusChange={handleMuteStatusChange} />
                  <MutePublicationBtn publication={blog.publication} handleMuteStatusChange={handleMuteStatusChange} />
                  <HideResponsesBtn blog={blog} closePopup={closePopup} setBlog={setBlog} />
                  <ReportStory blog={blog} closePopup={closePopup} />
                  <DeleteBlogBtn blog={blog} handleAfterBlogDelete={removeBlogFromList} closePopup={closePopup} />
                </ul>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </>
  );
}

export default MoreComp;
