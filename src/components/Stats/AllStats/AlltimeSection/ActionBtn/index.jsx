import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { IoMdCheckmark } from "react-icons/io";

function ActionBtn({ isLoading, selected, optionsArr, handleSelectionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (current) => {
    setIsOpen(false);
    if (current.value === selected.value) return;

    handleSelectionChange(current);
  };

  return (
    <div>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger disabled={isLoading} className={`width107 max-w-full flex items-center justify-between flex-wrap cursor-pointer padding-7 border-radius-7 transition-all duration-75 ease ${isOpen ? "bdr-7" : "bdr-8"}`}>
          <div className="padding50" style={{ paddingLeft: 0 }}>
            <span className="color-3 custom-fs-1 line20 font-medium">{selected.name}</span>
          </div>
          <div className="shrink-0">
            <div className="padding-6" style={{ paddingRight: 0 }}>
              <div className={`width84 aspect-square transition-all duration-75 linear ${isOpen ? "-rotate-180" : "rotate-0"} `}>
                <MdOutlineKeyboardArrowDown className="w-full h-full" />
              </div>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content onClick={(e) => e.stopPropagation()} side="bottom" align="middle" sideOffset={8}>
            <ul className="list-none border-radius-3 boxShadow6 custom-bg-8 width107 custom-px-2 overflow-hidden">
              {optionsArr.slice(0, 2).map((item) => (
                <li key={item.value} onClick={() => handleSelection(item)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                  <div className="padding50" style={{ paddingLeft: 0 }}>
                    <span className="color-3 custom-fs-1 line20 font-medium">{item.name}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="padding-6" style={{ paddingRight: 0 }}>
                      <div className={`width84 aspect-square`}>{selected.value === item.value && <IoMdCheckmark className="w-full h-full" />}</div>
                    </div>
                  </div>
                </li>
              ))}

              <li className="margin68 bdr-8 hidden" style={{ borderBottom: 0, borderInline: 0 }}></li>

              {optionsArr.slice(2, 4).map((item) => (
                <li key={item.value} onClick={() => handleSelection(item)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                  <div className="padding50" style={{ paddingLeft: 0 }}>
                    <span className="color-3 custom-fs-1 line20 font-medium">{item.name}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="padding-6" style={{ paddingRight: 0 }}>
                      <div className={`width84 aspect-square`}>{selected.value === item.value && <IoMdCheckmark className="w-full h-full" />}</div>
                    </div>
                  </div>
                </li>
              ))}

              <li className="margin68 bdr-8 hidden" style={{ borderBottom: 0, borderInline: 0 }}></li>

              {optionsArr.slice(4, 6).map((item) => (
                <li key={item.value} onClick={() => handleSelection(item)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                  <div className="padding50" style={{ paddingLeft: 0 }}>
                    <span className="color-3 custom-fs-1 line20 font-medium">{item.name}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="padding-6" style={{ paddingRight: 0 }}>
                      <div className={`width84 aspect-square`}>{selected.value === item.value && <IoMdCheckmark className="w-full h-full" />}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default ActionBtn;
