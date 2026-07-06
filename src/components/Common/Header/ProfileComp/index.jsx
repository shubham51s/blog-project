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
import { FiMoreHorizontal } from "react-icons/fi";
import PublicationListItem from "./PublicationListItem";
import { scrollToTop } from "../../../../utils/common";

function ProfileHeaderComp() {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [publications, setPublications] = useState([]);

  const handleUserLogout = async () => {
    try {
      const response = await requestHandler("/users/logout");
      if (response?.status === 200) {
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

  const getMyContributedPublications = async () => {
    try {
      const response = await requestHandler("/publication/my-contributions?limit=4");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications) {
        setPublications(result.data.publications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabClick = () => {
    closePopup();
    scrollToTop();
  };

  useEffect(() => {
    getMyContributedPublications();
  }, []);

  return (
    <>
      {userInfo && (
        <div>
          <div className="bg-transparent relative border-0 p-0 m-0 flex items-center opacity-90 transition-all duration-75 ease hover:opacity-100">
            <div className="relative">
              <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                <Popover.Trigger className="relative cursor-pointer">
                  <img loading="lazy" className="width-11 aspect-square rounded-full align-middle" src={userInfo.profileImg} />
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content side="bottom" align="end" sideOffset={10} alignOffset={2} className="box-shadow-1 border-radius-3">
                    <div className="overflow-y-auto height-7 custom-bg-8 border-radius-3 font-normal bg-white">
                      <div className="border-radius-4 custom-bg-8 overflow-hidden">
                        <div className="width-9">
                          <div className="height-8"></div>

                          <Link to={`/profile/${userInfo.username}`} onClick={handleTabClick} className="text-left cursor-pointer no-underline m-0 p-0 group">
                            <div className="padding-6 custom-fs-1 color-4 padding-19 custom-line-h-1 font-normal">
                              <div className="flex items-center custom-gap-2 max-w-full overflow-hidden">
                                <div className="relative shrink-0">
                                  <img loading="lazy" className="width-15 aspect-square bg-11 box-border rounded-full align-middle" src={userInfo.profileImg} />
                                  <div className="absolute width-15 aspect-square top-0 rounded-full"></div>
                                </div>
                                <div className="flex flex-col custom-gap-1 overflow-hidden transition-all duration-75 ease opacity-[0.85] group-hover:opacity-100">
                                  <p className="height-6 custom-fs-1 color-3 custom-line-h-1 font-medium truncate m-0 p-0">{userInfo.name}</p>
                                  <p className="height-9 truncate font-8 line-h-7 color-3 font-medium m-0 p-0">View profile</p>
                                </div>
                              </div>
                            </div>
                          </Link>

                          <div className="padding-42 padding94 bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
                            {publications.slice(0, 3).map((item) => (
                              <PublicationListItem publication={item.publication} handleTabClick={handleTabClick} key={item._id} />
                            ))}

                            {publications.length >= 4 && (
                              <Link to="/me/settings/publishing#managePublications" onClick={handleTabClick} className="color-3 cursor-pointer text-left m-0 p-0 transition-all ease duration-75 opacity-[0.85] hover:opacity-100">
                                <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                  <div className="flex items-center custom-gap-2">
                                    <div className="height-10 aspect-square shrink-0 bg-11 rounded-full flex items-center justify-center">
                                      <FiMoreHorizontal className="w-[70%] h-[70%]" />
                                    </div>
                                    <div className="flex overflow-hidden">
                                      <p className="height-6 custom-fs-1 custom-line-h-1 font-medium m-0 p-0 truncate">See all publications</p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </div>

                          <div className="padding-6 padding-16 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                            <Link to="/me/settings" onClick={handleTabClick} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <div className="height-10 aspect-square shrink-0">
                                    <IoSettingsOutline className="w-full h-full" />
                                  </div>
                                  <div className="flex overflow-hidden">
                                    <p className="height-6 truncate custom-fs-1 custom-line-h-1 font-medium m-0 p-0">Settings</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/new-publication" onClick={handleTabClick} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <div className="height-10 aspect-square shrink-0">
                                    <RiUserCommunityLine className="w-full h-full" />
                                  </div>
                                  <div className="flex overflow-hidden">
                                    <p className="height-6 truncate custom-fs-1 custom-line-h-1 font-medium m-0 p-0">New publication</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/me/following/suggestions" onClick={handleTabClick} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <div className="height-10 aspect-square shrink-0">
                                    <MdOutlineExplore className="w-full h-full" />
                                  </div>
                                  <div className="flex overflow-hidden">
                                    <p className="height-6 truncate custom-fs-1 custom-line-h-1 font-medium m-0 p-0">Suggestions</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <Link to="/me/lists/reading-history" onClick={handleTabClick} className="text-left border-0 cursor-pointer no-underline m-0 p-0 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                              <div className="padding-6 padding-19 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                <div className="flex items-center custom-gap-2">
                                  <div className="height-10 aspect-square shrink-0">
                                    <RiHistoryFill className="w-full h-full" />
                                  </div>
                                  <div className="flex overflow-hidden">
                                    <p className="height-6 truncate custom-fs-1 custom-line-h-1 font-medium m-0 p-0">Reading History</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div className="padding-17 bdr-5" style={{ paddingInline: 0, borderTop: 0, borderInline: 0 }}>
                            <button onClick={handleUserLogout} className="text-left border-0 cursor-pointer m-0 p-0 w-full bg-transparent transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                              <div className="padding-19 padding-20 custom-fs-1 color-3 custom-line-h-1 font-medium">
                                <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                                  Sign out
                                </div>
                                <p className="height-9 overflow-hidden line-truncate font-8 color-3 font-medium m-0 p-0">{userInfo.email}</p>
                              </div>
                            </button>
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
