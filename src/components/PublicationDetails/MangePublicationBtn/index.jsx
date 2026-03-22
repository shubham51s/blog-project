import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "react-router-dom";

function ManagePublicationBtn({ publication }) {
  return (
    <div className="margin-21 bdr-8 padding-7 grow-0 shrink-0 basis-auto" style={{ marginTop: 0, marginInline: 0, borderRight: 0, borderBlock: 0, paddingRight: 0 }}>
      <div className="flex">
        <Popover.Root>
          <Popover.Trigger className="cursor-pointer m-0 p-0">
            <div className="flex custom-gap-1 items-center">
              <p className="custom-fs-1 color-4 line20 font-normal m-0">Manage publication</p>
              <div className="width84 aspect-square">
                <IoIosArrowDown className="w-full h-full color-4" />
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="bottom" align="middle" sideOffset={10} className="box-shadow-4 border-radius-3 custom-bg-8 overflow-hidden">
              <ul className="width-28 flex flex-col items-stretch m-0 list-none padding-18">
                <li className="padding59 custom-px-2 custom-fs-1 color-3 font-normal opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                  <Link to="/new-story">Write a story</Link>
                </li>
                <li className="padding59 custom-px-2 custom-fs-1 color-3 font-normal opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                  <Link to={`/publication/${publication.slug}/followers`}>Followers</Link>
                </li>
                <li className="padding59 custom-px-2 custom-fs-1 color-3 font-normal opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                  <Link to={`/${publication.slug}/settings`}>Settings</Link>
                </li>
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}

export default ManagePublicationBtn;
