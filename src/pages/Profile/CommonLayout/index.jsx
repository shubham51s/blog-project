import React, { useEffect, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Link, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useRequestHandler } from "../../../hooks/requestHandler";
import RightSectionComp from "../../../components/ProfileComp/RightSection";
import Skeleton from "react-loading-skeleton";

function ProfileCommonLayout() {
  const { user, isError } = useOutletContext();
  const { pathname } = useLocation();

  const navOptions = [
    {
      id: 0,
      name: "Home",
      path: "",
    },
    {
      id: 1,
      name: "Lists",
      path: "lists",
    },
    {
      id: 2,
      name: "About",
      path: "about",
    },
  ];

  const isActiveTab = (id) => {
    if (id === 0) return !pathname.includes("/about") && !pathname.includes("/lists");

    if (id === 1) return pathname.includes("/lists");

    if (id === 2) return pathname.includes("/about");
  };

  return (
    <>
      {isError && <div className="">Error</div>}
      {!isError && (
        <div className="width-18 m-auto flex justify-evenly">
          <main className="grow shrink basis-auto width-20 block">
            <div className="height-13 flex flex-col custom-bg-8">
              <div>
                {/* cover image */}
                {user?.coverImage && <div className="height75 flex flex-col bg-top bg-cover opacity-[0.70]" style={{ backgroundImage: `url(${user.coverImage})` }}></div>}
                <div className="flex justify-center">
                  <div className="min-w-0 w-full max-width-2 margin-12">
                    <div className="margin56 margin54 boxShadow10">
                      <div className="flex items-center justify-end flex-nowrap margin57">
                        <div className="w-full flex items-center">
                          <div className="grow shrink basis-auto flex items-center justify-start">
                            <div className="flex flex-nowrap">
                              {user && (
                                <span className="letter-spacing-7 height-53 line-h-10 font-12 color16 padding50 break-all line-clamp-1 text-ellipsis font-bold overflow-hidden" style={{ paddingLeft: 0 }}>
                                  {user.name}
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
                              <button className="cursor-pointer m-0 p-0 color16 opacity-[0.75] transition-all duration-100 linear hover:opacity-100">
                                <div className="padding-23">
                                  <div className="custom-h-2 aspect-square">
                                    <MdOutlineMoreHoriz className="w-full h-full" />
                                  </div>
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative overflow-hidden boxShadow10">
                        <div className="flex items-center overflow-y-hidden overflow-x-auto">
                          {navOptions.map((item) => (
                            <div className="min-w-[-webkit-max-content]" key={item.id}>
                              <div className={`margin-14 min-w-max padding-42 ${isActiveTab(item.id) ? "bdr-7" : ""}`} style={{ marginLeft: 0, marginBlock: 0, borderTop: 0, borderInline: 0 }}>
                                <Link to={item.path} className="p-0 border-0 cursor-pointer">
                                  <p className={`color-3 custom-fs-1 custom-line-h-1 font-medium m-0 transition-all duration-100 linear ${isActiveTab(item.id) ? "opacity-100" : "opacity-[0.85] hover:opacity-100"}`}>
                                    <span>{item.name}</span>
                                  </p>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* passing data to all outlet components */}
              <Outlet context={{ user }} />
            </div>
          </main>
          <RightSectionComp user={user} />
        </div>
      )}
    </>
  );
}

export default ProfileCommonLayout;
