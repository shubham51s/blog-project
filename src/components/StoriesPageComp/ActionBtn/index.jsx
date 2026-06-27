import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import Edit from "../../Common/BlogActions/Edit";
import DeleteBlogBtn from "../../Common/BlogActions/Delete";
import SubmitToPublicationBtn from "../../Common/BlogActions/SubmitToPublication";
import { showToast } from "../../../utils/toaster";

function ActionBtn({ blog, setBlog }) {
  const rootUrl = window.location.origin;
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      const text = `${rootUrl}/${blog.slug}/${blog._id}`;
      await navigator.clipboard.writeText(text);
      showToast("Link copied");
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleAfterBlogDelete = () => {
    setBlog(null);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100">
        <div className="width-13 aspect-square">
          <MdMoreHoriz className="w-full h-full" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
          <div className="border-radius-3 overflow-hidden boxShadow11 custom-bg-8 margin-35" style={{ marginLeft: 0, marginBlock: 0 }}>
            <ul className="width71 custom-px-2 flex flex-col items-stretch list-none px-0 font-medium">
              <li className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                <button onClick={handleCopyLink} className="cursor-pointer p-0 m-0 flex items-center">
                  <div className="width-13 aspect-square">
                    <IoIosLink className="w-full h-full" />
                  </div>
                  <div className="margin-13" style={{ marginRight: 0 }}>
                    Copy link
                  </div>
                </button>
              </li>
              <li className="custom-px-2">
                <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
              </li>
              <Edit blog={blog} />
              {(!blog.publication || (blog.publication && (blog.publicationInfo.status === "withdrawn" || blog.publicationInfo.status === "declined"))) && <SubmitToPublicationBtn blog={blog} />}
              <li className="custom-px-2">
                <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
              </li>
              <DeleteBlogBtn blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ActionBtn;
