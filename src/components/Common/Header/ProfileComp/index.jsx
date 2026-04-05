import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { RiUserCommunityLine } from "react-icons/ri";
import { LuCircleHelp } from "react-icons/lu";
import { PiStarFourDuotone } from "react-icons/pi";
import { UserContext } from "../../../../context/userContext";
import { showToast } from "../../../../utils/toaster";
import { RiHistoryFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function ProfileHeaderComp() {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleUserLogout = async () => {
    try {
      const response = await requestHandler("/users/logout");
      if (response.status === 200) {
        window.location.reload();
      } else {
        const msg = "Some error occured";
        showToast(msg, "error");
      }
    } catch (err) {
      const msg = "Some error occured";
      showToast(msg, "error");
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {userInfo && (
        <div>
          <div className="bg-transparent relative border-0 p-0 m-0 flex items-center opacity-90 transition-all duration-300 ease-in-out hover:opacity-100">
            <div className="relative">
              <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                <Popover.Trigger className="relative cursor-pointer">
                  <img className="width-11 aspect-square rounded-full align-middle" src={userInfo.profileImg} />
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content side="bottom" align="end" sideOffset={10} alignOffset={2} className="box-shadow-1 border-radius-3">
                    <div className="overflow-y-auto height-7 custom-bg-8 border-radius-3 font-normal bg-white">
                      <div className="border-radius-4 custom-bg-8 overflow-hidden">
                        <div className="width-9">
                          <div className="height-8"></div>

                          <Link to={`/profile/${userInfo.username}`} onClick={closePopup} className="text-left cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-[0.80] hover:opacity-100">
                            <div className="padding-6 custom-fs-1 color-4 padding-19 custom-line-h-1 font-normal">
                              <div className="flex items-center custom-gap-2 max-w-full overflow-hidden">
                                <div className="relative shrink-0">
                                  <img className="width-15 aspect-square bg-11 box-border rounded-full align-middle" src={userInfo.profileImg} />
                                  <div className="absolute width-15 aspect-square top-0 rounded-full"></div>
                                </div>
                                <div className="flex flex-col custom-gap-1 overflow-hidden">
                                  <p className="height-6 custom-fs-1 color-6 custom-line-h-1 font-medium truncate m-0 p-0">{userInfo.name}</p>
                                  <p className="height-9 break-words text-ellipsis overflow-hidden font-8 line-h-7 color-6 font-medium m-0 p-0">View profile</p>
                                </div>
                              </div>
                            </div>
                          </Link>

                          <div className="padding-6 padding-16 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                            <Link to="/me/settings" onClick={closePopup} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <IoSettingsOutline className="width-13 height-10 align-middle overflow-hidden color-6" />
                                  <div className="flex flex-col custom-gap-1">
                                    <p className="break-words text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">Settings</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/new-publication" onClick={closePopup} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <RiUserCommunityLine className="width-13 height-10 align-middle overflow-hidden color-6" />
                                  <div className="flex flex-col custom-gap-1">
                                    <p className="break-words text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">New publication</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/me/following/suggestions" onClick={closePopup} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <MdOutlineExplore className="width-13 height-10 align-middle overflow-hidden color-6" />
                                  <div className="flex flex-col custom-gap-1">
                                    <p className="break-words text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">Suggestions</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/me/lists/reading-history" onClick={closePopup} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-6 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <RiHistoryFill className="width-13 height-10 align-middle overflow-hidden color-6" />
                                  <div className="flex flex-col custom-gap-1">
                                    <p className="break-words text-ellipsis height-6 overflow-hidden custom-fs-1 color-6 custom-line-h-1 font-medium m-0 p-0">History</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div className="padding-17 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                            <button onClick={handleUserLogout} className="text-left border-0 cursor-pointer m-0 p-0 w-full bg-transparent transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                              <div className="padding-19 padding-20 custom-fs-1 color-6 custom-line-h-1 font-medium">
                                <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                                  Sign out
                                </div>
                                <p className="height-9 break-words text-ellipsis overflow-hidden line-h-7 font-8 color-6 font-medium m-0 p-0">{userInfo.email}</p>
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
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileHeaderComp;
