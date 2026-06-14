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

function MoreComp({ blog, removeBlogFromList }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMuteStatusChange = (isMuted) => {
    if (isMuted) {
      removeBlogFromList();
    }
  };

  const handleAfterBlogDelete = () => {
    removeBlogFromList();
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
                {/* below options are for others blog */}
                {!blog.isMyBlog && (
                  <ul className="width59 padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                    <FollowAuthorBtn user={blog.author} />
                    {blog.publication && <FollowPublicationBtn publication={blog.publication} />}
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    <MuteAuthorBtn user={blog.author} handleMuteStatusChange={handleMuteStatusChange} />
                    {blog.publication && <MutePublicationBtn publication={blog.publication} handleMuteStatusChange={handleMuteStatusChange} />}
                    <ReportStory blog={blog} closePopup={closePopup} />
                  </ul>
                )}

                {blog.isMyBlog && (
                  <ul className="width62 padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                    {blog.publication && <FollowPublicationBtn publication={blog.publication} />}
                    {blog.publication && <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>}
                    <Edit blog={blog} />
                    <li className="custom-px-2 padding59 custom-fs-1 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 flex items-center">
                        <div className="flex items-start text-left">Hide responses</div>
                      </button>
                    </li>
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    {!blog.publication && <SubmitToPublicationBtn blog={blog} />}
                    {blog.publication && <MutePublicationBtn publication={blog.publication} handleMuteStatusChange={handleMuteStatusChange} />}
                    <li className="custom-px-2 bdr-5" style={{ borderInline: 0, borderBottom: 0 }}></li>
                    <DeleteBlogBtn blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />
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
