import React, { useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

function BlogMoreBtn() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="margin-26">
      <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <Popover.Trigger className="relative padding-33 cursor-pointer m-0 color-3 opacity-[0.85] transition-all duration-75 ease hover:opacity-100" title="More">
          <div className="width-13 aspect-square">
            <MdOutlineMoreHoriz className="w-full h-full" />
          </div>
        </Popover.Trigger>
        <Popover.Content side="bottom" className="z-[700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
          <div className="custom-bg-8 border-radius-3 overflow-hidden">
            <ul className="flex flex-col items-stretch m-0 custom-px-2 width59 list-none">
              <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                <button className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Remove item</button>
              </li>
              <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
                <button className="cursor-pointer m-0 p-0 opacity-[0.85] transition-all duration-75 ease hover:opacity-100">Follow author</button>
              </li>
            </ul>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default BlogMoreBtn;
