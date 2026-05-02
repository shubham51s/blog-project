import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

function ActionBtn({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const optionsArr = [
    {
      name: "Latest",
      value: "",
    },
    {
      name: "Oldest",
      value: "",
    },
    {
      name: "Most viewed",
      value: "",
    },
    {
      name: "Least viewed",
      value: "",
    },
    {
      name: "Most read",
      value: "",
    },
    {
      name: "Least read",
      value: "",
    },
  ];

  const handleSelection = (type) => {
    setIsOpen(false);
    if (type === selected) return;

    setSelected(type);
  };

  return (
    <div>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger disabled={isLoading} className={`width95 flex items-center justify-between flex-wrap cursor-pointer padding-7 border-radius-7 transition-all duration-75 ease ${isOpen ? "bdr-7" : "bdr-8"}`}>
          <div className="padding50" style={{ paddingLeft: 0 }}>
            <span className="color-3 custom-fs-1 line20 font-medium">{optionsArr[selected].name}</span>
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
            <ul className="list-none border-radius-3 boxShadow6 bg-white width95 overflow-hidden">
              <li onClick={() => handleSelection(0)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Latest</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>
              <li onClick={() => handleSelection(1)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Oldest</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>

              <li className="margin68 bdr-8" style={{ borderBottom: 0, borderInline: 0 }}></li>

              <li onClick={() => handleSelection(2)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Most viewed</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>
              <li onClick={() => handleSelection(3)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Least viewed</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>

              <li className="margin68 bdr-8" style={{ borderBottom: 0, borderInline: 0 }}></li>

              <li onClick={() => handleSelection(4)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Most read</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>

              <li onClick={() => handleSelection(5)} className={`flex items-center justify-between flex-wrap color-3 cursor-pointer padding-7 transition-all duration-75 ease opacity-[0.75] hover:opacity-100`}>
                <div className="padding50" style={{ paddingLeft: 0 }}>
                  <span className="color-3 custom-fs-1 line20 font-medium">Least read</span>
                </div>
                <div className="shrink-0">
                  <div className="padding-6" style={{ paddingRight: 0 }}>
                    <div className={`width84 aspect-square`}></div>
                  </div>
                </div>
              </li>
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default ActionBtn;
