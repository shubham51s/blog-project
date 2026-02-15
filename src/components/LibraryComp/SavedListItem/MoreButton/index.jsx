import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { showToast } from "../../../../utils/toaster";

function MoreButton({ list }) {
  const rootUrl = window.location.origin;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      const listName = `${rootUrl}/profile/${list.user.username}/list/${list.slug}/${list._id}`;
      await navigator.clipboard.writeText(listName);
      showToast("Link copied");
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div>
      <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <Popover.Trigger onClick={(e) => e.stopPropagation()} className="custom-px-2 padding-36 cursor-pointer opacity-[0.75] transition-all duration-200 linear hover:opacity-100" title="More">
          <div className="width-13 aspect-square color-3">
            <MdOutlineMoreHoriz className="w-full h-full" />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" className="z-[700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
            <div className="custom-bg-8 border-radius-3 overflow-hidden">
              <ul className="flex flex-col items-stretch custom-px-2 list-none m-0">
                <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                  <button onClick={handleCopyLink} className="cursor-pointer m-0 p-0">
                    <div className="inline-block">Copy link</div>
                  </button>
                </li>
              </ul>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default MoreButton;
