import React, { useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { LuCircleHelp } from "react-icons/lu";
import { PiStarFourDuotone } from "react-icons/pi";

function ProfileHeaderComp() {
  const profileNavOptions = [
    {
      id: 0,
      name: "About",
      path: "/",
    },
    {
      id: 1,
      name: "Blog",
      path: "/",
    },
    {
      id: 2,
      name: "Careers",
      path: "/",
    },
    {
      id: 3,
      name: "Privacy",
      path: "/",
    },
    {
      id: 4,
      name: "Terms",
      path: "/",
    },
    {
      id: 5,
      name: "Text to speech",
      path: "/",
    },
    {
      id: 6,
      name: "More",
      path: "/",
    },
  ];

  const profileBtnRef = useRef();
  const profileOptionsRef = useRef();
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  const handleUserProfileBtnClick = () => {
    setIsShowProfileMenu(!isShowProfileMenu);
  };

  const handleClickOutside = (e) => {
    if (profileBtnRef.current && !profileBtnRef.current.contains(e.target) && profileOptionsRef.current && !profileOptionsRef.current.contains(e.target)) {
      setIsShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-transparent relative border-0 cursor-pointer p-0 m-0 flex items-center opacity-90 transition-all duration-300 ease-in-out hover:opacity-100">
        <div className="relative">
          <div ref={profileBtnRef} onClick={() => handleUserProfileBtnClick()} className="relative">
            <img className="width-11 aspect-square rounded-full align-middle" src="https://miro.medium.com/v2/resize:fill:64:64/0*AbhaXOwX9-XpKPtX" alt="user profile image" />
          </div>

          {/* user profile popup */}
          {isShowProfileMenu && (
            <div ref={profileOptionsRef} className="absolute right-0 z-[1000] top-1 box-shadow-1 border-radius-3">
              <div className="overflow-y-auto height-7 custom-bg-8 border-radius-3 font-normal">
                <div className="border-radius-4 custom-bg-8 overflow-hidden">
                  <div className="width-9">
                    <div className="height-8"></div>

                    <a href="#" className="text-left cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-[0.80] hover:opacity-100">
                      <div className="padding-6 custom-fs-1 color-4 padding-19 custom-line-h-1 font-normal">
                        <div className="flex items-center custom-gap-2">
                          <div className="relative">
                            <img className="width-15 aspect-square bg-11 box-border rounded-full align-middle" src="https://miro.medium.com/v2/resize:fill:96:96/0*AbhaXOwX9-XpKPtX" alt="profile image" />
                            <div className="absolute width-15 aspect-square top-0 rounded-full"></div>
                          </div>
                          <div className="flex flex-col custom-gap-1">
                            <p className="break-all text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">shubhams1234</p>
                            <p className="height-9 break-all text-ellipsis overflow-hidden font-8 line-h-7 color-6 font-medium m-0 p-0">View profile</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    <div className="padding-6 padding-16 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                      <a href="#" className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="flex items-center custom-gap-2">
                            <IoSettingsOutline className="width-13 height-10 align-middle overflow-hidden color-6" />
                            <div className="flex flex-col custom-gap-1">
                              <p className="break-all text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">Settings</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="flex items-center custom-gap-2">
                            <IoIosStats className="width-13 height-10 align-middle overflow-hidden color-6" />
                            <div className="flex flex-col custom-gap-1">
                              <p className="break-all text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">Stats</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="flex items-center custom-gap-2">
                            <LuCircleHelp className="width-13 height-10 align-middle overflow-hidden color-6" />
                            <div className="flex flex-col custom-gap-1">
                              <p className="break-all text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">Help</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="padding-17 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                      <a href="#" className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-20 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="flex items-center justify-between text-center custom-fs-1">
                            Become a Medium member
                            <PiStarFourDuotone className="aspect-square width-19 align-middle text-yellow-900" />
                          </div>
                        </div>
                      </a>
                      <a href="#" className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-20 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="flex items-center justify-between">Apply to the Partner Program</div>
                        </div>
                      </a>
                    </div>

                    <div className="padding-17 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                      <button className="text-left border-0 cursor-pointer m-0 p-0 w-full bg-transparent transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        <div className="padding-19 padding-20 custom-fs-1 color-6 custom-line-h-1 font-medium">
                          <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                            Sign out
                          </div>
                          <p className="height-9 break-all text-ellipsis overflow-hidden line-h-7 font-8 color-6 font-medium m-0 p-0">sh•••••••••••@gmail.com</p>
                        </div>
                      </button>
                    </div>

                    <div className="padding-3 padding-18 flex flex-col custom-gap-1">
                      <div className="flex custom-gap-3">
                        {profileNavOptions.slice(0, 5).map((item) => (
                          <div key={item.id} className="line-h-7 font-8 color-6 font-medium transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                            <a href="#" className="cursor-pointer no-underline m-0 p-0">
                              {item.name}
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="flex custom-gap-3">
                        {profileNavOptions.slice(5, 8).map((item) => (
                          <div key={item.id} className="line-h-7 font-8 color-6 font-medium transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                            <a href="#" className="cursor-pointer no-underline m-0 p-0">
                              {item.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderComp;
