import React, { useContext, useEffect, useRef, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { GoPersonFill } from "react-icons/go";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Following from "./Following";
import { scrollToTop } from "../../../utils/common";

function MenuComp() {
  const { isShowMenu } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const container = useRef(null);
  const { userInfo } = useContext(UserContext);

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
      name: "Library",
      path: "/me/lists",
      IconInactive: BsBookmarks,
      IconActive: BsBookmarksFill,
    },
    {
      id: 2,
      name: "Profile",
      path: `/profile/${userInfo.username}`,
      IconInactive: GoPerson,
      IconActive: GoPersonFill,
    },
    {
      id: 3,
      name: "Stories",
      path: "/me/stories",
      IconInactive: FaRegFile,
      IconActive: FaRegFileAlt,
    },
    {
      id: 4,
      name: "Stats",
      path: "/me/stats",
      IconInactive: IoStatsChartOutline,
      IconActive: IoStatsChartSharp,
    },
  ];

  const isActiveTab = (id) => {
    if (id === 0) return pathname === "/";
    if (id === 1) return pathname.includes("/me/lists");
    if (id === 2) return pathname.includes(`/profile/${userInfo.username}`);
    if (id === 3) return pathname.includes("/me/stories");
    if (id === 4) return pathname.includes("/me/stats");
  };

  const handleTabClick = (id) => {
    if (isActiveTab(id)) return;

    container.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    scrollToTop();
  };

  return (
    <div ref={container} className={`flex-none sticky top2 height-11 height-14 height77 transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${isShowMenu ? "width-16 visible" : "w-0 invisible"}`}>
      <div className="bdr-5 w-full custom-bg-8" style={{ borderLeft: 0, borderBlock: 0 }}>
        <div className="h-full w-full max-h-full flex-shrink basis-auto flex">
          <div className="flex flex-col custom-gap-4 overflow-auto padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
            <div className="flex flex-col custom-gap-4">
              <div className="height-12"></div>

              {menuOptions.map((item) => (
                <div key={item.id}>
                  <Link onClick={() => handleTabClick(item.id)} to={item.path} className={`text-left line-h-8 select-none padding-21 py-0 flex items-center custom-gap-2 font-10 relative cursor-pointer m-0 color-6 font-normal no-underline transition-all duration-300 ease-in-out hover:opacity-100 ${isActiveTab(item.id) ? "opacity-100" : "opacity-[0.7]"}`}>
                    {isActiveTab(item.id) ? <item.IconActive className="width-13 height-10 align-middle" /> : <item.IconInactive className="width-13 height-10 align-middle" />}
                    <span className="shrink grow text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>

            <div className="margin-20 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>

            {/* herer */}
            <Following />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuComp;
