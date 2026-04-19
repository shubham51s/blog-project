import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import ConfirmDeletePublicationModal from "../../DeletePublicationModal";

function ActionBtn({ publication }) {
  const [isShowModal, setIsShowModal] = useState(false);

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {publication.isOwner && (
        <div className="flex justify-end items-center margin51">
          <Popover.Root>
            <Popover.Trigger className="cursor-pointer select-none font-normal color-3 flex items-center custom-gap-1 opacity-[0.7] transition-all duration-75 ease hover:opacity-[0.9]">
              <span className="custom-fs-1 select-none font-normal">Advanced</span>
              <div className="width-38 aspect-square">
                <MdOutlineKeyboardArrowDown className="w-full h-full" />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content side="bottom" align="middle" sideOffset={10}>
                <div className="custom-px-2 boxShadow5 width44 custom-bg-8 border-radius-4">
                  <ul className="p-0 list-none m-0">
                    <li className="padding-27 padding47 w-full whitespace-nowrap">
                      <button onClick={() => setIsShowModal(true)} className="text-[#ce4747] custom-fs-1 cursor-pointer select-none font-normal opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                        Delete publication
                      </button>
                    </li>
                  </ul>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      )}

      {isShowModal && <ConfirmDeletePublicationModal closeModal={closeModal} />}
    </>
  );
}

export default ActionBtn;
