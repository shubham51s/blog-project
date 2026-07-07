import React, { useContext, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { UserContext } from "../../../context/userContext";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Edit from "../../Common/BlogActions/Edit";
import StoryStatsBtn from "../../Common/BlogActions/StoryStats";
import BreakLine from "../../Common/BlogActions/BreakLine";
import FollowAuthorBtn from "../../Common/BlogActions/FollowAuthor";
import FollowPublicationBtn from "../../Common/BlogActions/FollowPublication";
import SubmitToPublicationBtn from "../../Common/BlogActions/SubmitToPublication";
import MuteAuthorBtn from "../../Common/BlogActions/MuteAuthor";
import MutePublicationBtn from "../../Common/BlogActions/MutePublication";
import HideResponsesBtn from "../../Common/BlogActions/HideResponses";
import ReportStory from "../../Common/BlogActions/ReportStory";
import DeleteBlogBtn from "../../Common/BlogActions/Delete";

function MoreOptionsComp({ blog, setBlog, clapDetails, undoMyClaps }) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUndoClaps = async () => {
    setIsLoading(true);
    try {
      const isSuccess = await undoMyClaps();
      if (isSuccess) closePopup();
    } finally {
      setIsLoading(false);
    }
  };

  const removeBlogFromList = () => {
    navigate(`/profile/${userInfo.username}`);
  };

  return (
    <div className="shrink-0 inline-block">
      <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <Popover.Trigger className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-75 ease cursor-pointer hover:opacity-100">
          <Tooltip arrow placement="top" enterDelay={300} title="More">
            <div className="width-13 aspect-square">
              <MdOutlineMoreHoriz className="w-full h-full" />
            </div>
          </Tooltip>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" align="middle" sideOffset={1} className="z-[999] box-shadow-4 border-radius-3 custom-bg-8">
            {blog && (
              <div className="box-shadow-4 border-radius-3 box-border custom-bg-8 overflow-hidden">
                <ul className="flex flex-col items-stretch p-0 m-0 list-none custom-px-2 width59 overflow-hidden">
                  {blog.author._id !== userInfo._id && clapDetails.myClaps > 0 && (
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button onClick={handleUndoClaps} disabled={isLoading} className="m-0 p-0 cursor-pointer">
                        Undo claps
                      </button>
                    </li>
                  )}
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
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default MoreOptionsComp;
