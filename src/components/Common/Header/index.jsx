import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchHomeComp from "./SearchComp";
import { FiEdit } from "react-icons/fi";
import ProfileHeaderComp from "./ProfileComp";
import { IoNotificationsOutline } from "react-icons/io5";
import { UserContext } from "../../../context/userContext";
import { MdOutlineMenu } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

function HeaderComp() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { setIsShowMenu, isShowMenu } = useContext(UserContext);

  const toggleLeftMenu = () => {
    setIsShowMenu((prev) => !prev);

    localStorage.setItem("isShowMenu", JSON.stringify(!isShowMenu));
  };

  return (
    <div className="sticky top-0 z-[500] custom-bg-8" style={{ transform: "translateY(0px)" }}>
      <div className="padding-1 height-3 bdr-5 flex items-center" style={{ borderTop: 0, borderInline: 0 }}>
        {/* left section */}
        <div className="flex items-center flex-[1_0_auto]">
          <div className="inline-block">
            <button className="relative m-0 width-7 aspect-square bg-transparent flex items-center padding-6" style={{ paddingBlock: 0, paddingRight: 0 }}>
              <div onClick={toggleLeftMenu} className="width-8 aspect-square flex cursor-pointer opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
                <FiMenu className="h-full w-full" />
              </div>
            </button>
          </div>
          <div className="width-6 flex items-center"></div>
          <Link to="/" className="border-0 no-underline m-0 p-0 flex font-bold padding-6 font-2" style={{ paddingBlock: 0, paddingLeft: 0 }}>
            Medium
          </Link>
          <SearchHomeComp />
        </div>
        {/* right section */}
        <div className="flex">
          <div className="margin-14 flex" style={{ marginLeft: 0 }}>
            <Link className="no-underline border-0 cursor-pointer m-0 p-0 opacity-75 transition-all duration-300 ease-in-out hover:opacity-100" to="/new-story">
              <div className="relative color-4 custom-line-h-1 flex items-center font-normal">
                <FiEdit className="width-10 height-5 align-middle color-6" />
                <div className="margin-9 color-6 custom-fs-1 font-normal" style={{ marginBlock: 0, marginRight: 0 }}>
                  Write
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="margin-14 flex" style={{ marginLeft: 0, marginBlock: 0 }}>
            <Link className="border-0 cursor-pointer p-0 m-0 opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
              <div className="relative custom-fs-1 color-6 custom-line-h-1 flex items-center font-normal">
                <IoNotificationsOutline className="width-10 height-5 align-middle color-6" />
              </div>
            </Link>
          </div>
        </div>
        <ProfileHeaderComp />
      </div>
    </div>
  );
}

export default HeaderComp;
