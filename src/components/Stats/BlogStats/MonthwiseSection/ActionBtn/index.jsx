import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

function ActionBtn({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [months, setMonths] = useState([
    {
      id: 0,
      month: 0,
      year: 2026,
    },
    {
      id: 1,
      month: 1,
      year: 2026,
    },
    {
      id: 2,
      month: 2,
      year: 2026,
    },
    {
      id: 3,
      month: 3,
      year: 2026,
    },
    {
      id: 4,
      month: 4,
      year: 2026,
    },
    {
      id: 5,
      month: 5,
      year: 2026,
    },
    {
      id: 6,
      month: 6,
      year: 2026,
    },
  ]);

  return (
    <div>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger disabled={isLoading} className={`width107 max-w-full flex items-center justify-between flex-wrap cursor-pointer padding-7 border-radius-7 transition-all duration-75 ease ${isOpen ? "bdr-7" : "bdr-8"}`}>
          <div className="padding50" style={{ paddingLeft: 0 }}>
            <span className="color-3 custom-fs-1 line20 font-medium">April 2026</span>
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
            <ul className="list-none border-radius-3 boxShadow6 custom-bg-8 width107 max-w-full overflow-hidden">
              {months.map((item) => (
                <li key={item.id} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                  <div className="padding50" style={{ paddingLeft: 0 }}>
                    <span className="color-3 custom-fs-1 line20 font-medium">
                      {monthArr[item.month]} {item.year}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <div className="padding-6" style={{ paddingRight: 0 }}>
                      <div className={`width84 aspect-square`}></div>
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
