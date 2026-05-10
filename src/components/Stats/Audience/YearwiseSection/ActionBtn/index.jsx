import React, { useContext, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { UserContext } from "../../../../../context/userContext";
import { getYearsTillToday } from "../../../../../utils/dates";
import { IoMdCheckmark } from "react-icons/io";

function ActionBtn({ isLoading, handleYearChange, selected }) {
  const { userInfo } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [years, setYears] = useState(getYearsTillToday(userInfo.createdAt));

  const handnleSelection = (year) => {
    setIsOpen(false);
    if (year === selected) return;
    handleYearChange(year);
  };

  return (
    <div>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger disabled={isLoading} className={`widht104 flex items-center justify-between flex-wrap cursor-pointer padding-7 border-radius-7 transition-all duration-75 ease ${isOpen ? "bdr-7" : "bdr-8"}`}>
          <div className="padding50" style={{ paddingLeft: 0 }}>
            <span className="color-3 custom-fs-1 line20 font-medium">{selected}</span>
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
            <ul className="list-none border-radius-3 boxShadow6 custom-bg-8 custom-px-2 widht104 height82 overflow-x-hidden overflow-y-auto">
              {years.map((item) => (
                <li key={item} onClick={() => handnleSelection(item)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                  <div className="padding50" style={{ paddingLeft: 0 }}>
                    <span className="color-3 custom-fs-1 line20 font-medium">{item}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="padding-6" style={{ paddingRight: 0 }}>
                      <div className={`width84 aspect-square`}>{selected === item && <IoMdCheckmark className="w-full h-full" />}</div>
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
