import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import ProfileSection from "./ProfileSection";

function WriteBlogHeader({ blog, handlePublishBlogBtnClick, images }) {
  const { pathname } = useLocation();

  return (
    <div className="fixed z-[500] w-full font-10 color10 font-normal top-0 box-border bg13">
      <div className="relative width41 height-63 padding-14 mx-auto flex justify-between items-center" style={{ paddingBlock: 0 }}>
        <div className="relative z-[500] grow shink basis-auto flex justify-start items-center">
          <div>
            <Link to="/" className="color-3 border-0 no-underline m-0 p-0 flex font-bold padding-6 font-2" style={{ paddingBlock: 0, paddingLeft: 0 }}>
              Medium
            </Link>
          </div>
          {!pathname.includes("new-story") && (
            <div className="height-63 margin-34 flex items-center font-10" style={{ marginRight: 0, marginBlock: 0 }}>
              <span className="whitespace-nowrap truncate color11">
                {blog.type === "new" ? "Draft " : ""}
                <span className="color10 margin65" style={{ marginRight: 0, marginBlock: 0 }}>
                  {blog.isLoading ? "Saving" : "Saved"}
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="relative z-[500] grow-0 shrink-0 basis-auto flex items-center">
          <div className="height-63 padding-6 flex items-center" style={{ paddingBlock: 0 }}>
            <button onClick={() => handlePublishBlogBtnClick(1)} disabled={(blog.heading.trim().length < 2 && blog.description.trim().length < 2) || pathname.includes("new-story") || images.pending.length || images.failed.length} className={`color-2 bg14 font13 custom-h-2 padding-25 m-0 box-border cursor-pointer bdr9 rounded-full ${(blog.heading.trim().length < 2 && blog.description.trim().length < 2) || pathname.includes("new-story") || images.pending.length || images.failed.length ? "opacity-50" : "opacity-100"}`} style={{ paddingBlock: 0 }}>
              <span>Publish</span>
            </button>
          </div>
          <div className="height-63 padding-6 flex items-center" style={{ paddingBlock: 0 }}>
            <button onClick={() => handlePublishBlogBtnClick(0)} disabled={(blog.heading.trim().length < 2 && blog.description.trim().length < 2) || pathname.includes("new-story") || images.pending.length || images.failed.length} className={`color-2 bg14 font13 custom-h-2 padding-25 m-0 box-border cursor-pointer bdr9 rounded-full ${(blog.heading.trim().length < 2 && blog.description.trim().length < 2) || pathname.includes("new-story") || images.pending.length || images.failed.length ? "opacity-50" : "opacity-100"}`} style={{ paddingBlock: 0 }}>
              <span>Submit to publication</span>
            </button>
          </div>
          <div>
            <button className="align-middle p-0 text-left cursor-pointer box-border custom-h-2 aspect-square margin-21" style={{ marginLeft: 0, marginBlock: 0 }}>
              <div className="w-full h-full font13 text-left select-none font-normal">
                <IoIosNotificationsOutline className="w-full h-full color10" />
              </div>
            </button>
            <ProfileSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteBlogHeader;
