import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Link, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useRequestHandler } from "../../../hooks/requestHandler";
import RightSectionComp from "../../../components/ProfileComp/RightSection";
import Skeleton from "react-loading-skeleton";
import * as Popover from "@radix-ui/react-popover";
import { showToast } from "../../../utils/toaster";
import { FollowingContext } from "../../../context/followingContext";
import NotFoundComp from "../../../components/Common/NotFound";
import { getImageUrl } from "../../../utils/common";
import { UserContext } from "../../../context/userContext";

function ProfileCommonLayout() {
  const rootUrl = window.location.origin;
  const { userInfo } = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const { username } = useParams();
  const { requestHandler } = useRequestHandler();
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const isActiveTab = (id) => {
    if (id === 0) return !pathname.includes("/about") && !pathname.includes("/lists");
    if (id === 1) return pathname.includes("/lists");
    if (id === 2) return pathname.includes("/about");
  };

  const handleCopyProfileBtnClick = async () => {
    try {
      await navigator.clipboard.writeText(`${rootUrl}/profile/${username}`);
      showToast("Link copied");
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const fetchUserLists = async (user) => {
    try {
      const response = await requestHandler(`/list/user/${user._id}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists?.length > 0) {
        const publicOnlyLists = result.data.lists.filter((item) => !item.isPrivate);
        setUser({ ...user, lists: result.data.lists, publicLists: publicOnlyLists });
      } else {
        setUser({ ...user, lists: [], publicLists: [] });
      }
    } catch (err) {
      console.error(err);
      setUser({ ...user, lists: [], publicLists: [] });
    }
  };

  const fetchUserDetails = async () => {
    try {
      if (!username) {
        setIsError(true);
        return;
      }
      const response = await requestHandler(`/users/${username}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.user) {
        fetchUserLists(result.data.user);
      } else setIsError(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserDetails();
  }, []);

  return (
    <>
      {isError && <NotFoundComp />}
      {!isError && (
        <div className="width-18 m-auto flex justify-evenly">
          <main className="grow shrink basis-auto width-20 block">
            <div className="height-13 flex flex-col custom-bg-8">
              {!pathname.includes("/followers") && !pathname.includes("/following") && (
                <div>
                  {/* cover image */}
                  {user && user._id !== userInfo._id && user?.coverImage && <div className="height75 flex flex-col bg-top bg-cover opacity-[0.70]" style={{ backgroundImage: `url(${getImageUrl(user.coverImage)})` }}></div>}
                  {user && user._id === userInfo._id && userInfo?.coverImage && <div className="height75 flex flex-col bg-top bg-cover opacity-[0.70]" style={{ backgroundImage: `url(${getImageUrl(userInfo.coverImage)})` }}></div>}
                  <div className="flex justify-center">
                    <div className="min-w-0 w-full max-width-2 margin-12">
                      <div className="margin56 margin54 boxShadow10">
                        <div className="flex items-center justify-end flex-nowrap margin57">
                          <div className="w-full flex items-center">
                            <div className="grow shrink basis-auto flex items-center justify-start">
                              <div className="flex flex-nowrap">
                                {user && (
                                  <span className="letter-spacing-7 height-53 line-h-10 font-12 color16 padding50 break-words line-clamp-1 text-ellipsis font-bold overflow-hidden" style={{ paddingLeft: 0 }}>
                                    {user._id === userInfo._id ? userInfo.name : user.name}
                                  </span>
                                )}
                                {!user && (
                                  <span className="height-53 padding50 overflow-hidden" style={{ paddingLeft: 0 }}>
                                    <Skeleton height={30} width={300} />
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="margin-13 flex" style={{ marginRight: 0 }}>
                              {user && (
                                <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                                  <Popover.Trigger className="cursor-pointer m-0 p-0 color16 opacity-[0.75] transition-all duration-100 linear hover:opacity-100">
                                    <div className="padding-23">
                                      <div className="custom-h-2 aspect-square">
                                        <MdOutlineMoreHoriz className="w-full h-full" />
                                      </div>
                                    </div>
                                  </Popover.Trigger>
                                  <Popover.Content side="bottom" className="z-[700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
                                    <div className="border-radius-3 custom-bg-8 overflow-hidden">
                                      <ul className="flex flex-col items-stretch m-0 list-none px-0 custom-px-2">
                                        <li className="custom-px-2 padding59 custom-fs-1 color-3 font-normal opacity-[0.85] transition-all duration-75 linear hover:opacity-100">
                                          <button onClick={handleCopyProfileBtnClick} className="cursor-pointer m-0 p-0">
                                            Copy link to profile
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </Popover.Content>
                                </Popover.Root>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="relative overflow-hidden boxShadow10">
                          {user && (
                            <div className="flex items-center overflow-y-hidden overflow-x-auto">
                              <div className="min-w-[-webkit-max-content]">
                                <div className={`margin-14 min-w-max padding-42 ${isActiveTab(0) ? "bdr-7" : ""}`} style={{ marginLeft: 0, marginBlock: 0, borderTop: 0, borderInline: 0 }}>
                                  <Link to="" onClick={scrollToTop} className="p-0 border-0 cursor-pointer">
                                    <p className={`color-3 custom-fs-1 custom-line-h-1 font-medium m-0 transition-all duration-100 linear ${isActiveTab(0) ? "opacity-100" : "opacity-[0.85] hover:opacity-100"}`}>
                                      <span>Home</span>
                                    </p>
                                  </Link>
                                </div>
                              </div>
                              {!user.isNoBlogPublished && (
                                <div className="min-w-[-webkit-max-content]">
                                  <div className={`margin-14 min-w-max padding-42 ${isActiveTab(1) ? "bdr-7" : ""}`} style={{ marginLeft: 0, marginBlock: 0, borderTop: 0, borderInline: 0 }}>
                                    <Link to="lists" onClick={scrollToTop} className="p-0 border-0 cursor-pointer">
                                      <p className={`color-3 custom-fs-1 custom-line-h-1 font-medium m-0 transition-all duration-100 linear ${isActiveTab(1) ? "opacity-100" : "opacity-[0.85] hover:opacity-100"}`}>
                                        <span>Lists</span>
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                              )}
                              <div className="min-w-[-webkit-max-content]">
                                <div className={`margin-14 min-w-max padding-42 ${isActiveTab(2) ? "bdr-7" : ""}`} style={{ marginLeft: 0, marginBlock: 0, borderTop: 0, borderInline: 0 }}>
                                  <Link to="about" onClick={scrollToTop} className="p-0 border-0 cursor-pointer">
                                    <p className={`color-3 custom-fs-1 custom-line-h-1 font-medium m-0 transition-all duration-100 linear ${isActiveTab(2) ? "opacity-100" : "opacity-[0.85] hover:opacity-100"}`}>
                                      <span>About</span>
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* passing data to all child routes */}
              <Outlet context={{ user, setUser }} />
            </div>
          </main>
          <RightSectionComp user={user} setUser={setUser} />
        </div>
      )}
    </>
  );
}

export default ProfileCommonLayout;
