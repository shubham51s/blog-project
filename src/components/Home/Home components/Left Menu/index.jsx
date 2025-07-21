import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

function HomeLeftMenuComp() {
  const menuOptions = [
    {
      id: 0,
      name: "Home",
      path: "/",
      IconInactive: IoHomeOutline,
      IconActive: IoHomeSharp,
    },
    {
      id: 1,
      name: "Following",
      path: "/",
      IconInactive: BsPeople,
      IconActive: BsPeopleFill,
    },
    {
      id: 2,
      name: "Library",
      path: "/",
      IconInactive: BsBookmarks,
      IconActive: BsBookmarksFill,
    },
    {
      id: 3,
      name: "Stories",
      path: "/",
      IconInactive: FaRegFile,
      IconActive: FaRegFileAlt,
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleMenuTabButtonClick = (item) => {
    setActiveTabIndex(item.id);
  };

  return (
    <div className="width-16 flex-none">
      <div className="sticky translate-x-0 top-2 height-11 bdr-5 width-16 custom-bg-8 flex flex-col z-[500]" style={{ borderLeft: 0, borderBlock: 0 }}>
        <div className="flex-grow flex-shrink basis-auto flex">
          <div className="flex flex-col custom-gap-4 overflow-auto padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
            {/* top section */}
            <div className="flex flex-col custom-gap-4">
              <div className="height-12"></div>

              {menuOptions.map((item) => (
                <div key={item.id}>
                  <a onClick={() => handleMenuTabButtonClick(item)} href="#" className={`text-left line-h-8 padding-21 py-0 flex items-center custom-gap-2 font-10 relative cursor-pointer m-0 color-6 font-normal no-underline transition-all duration-300 ease-in-out hover:opacity-100 ${activeTabIndex == item.id ? "opacity-100" : "opacity-[0.7]"}`}>
                    {activeTabIndex == item.id && <item.IconActive className="width-13 height-10 align-middle" />}
                    {activeTabIndex != item.id && <item.IconInactive className="width-13 height-10 align-middle" />}
                    <span className="shrink grow text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</span>
                  </a>
                </div>
              ))}
            </div>

            {/* middle section */}
            <div className="margin-20 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>

            {/* bottom section */}
            <div className="flex flex-col custom-gap-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLeftMenuComp;
