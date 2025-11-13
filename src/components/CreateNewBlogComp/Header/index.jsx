import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediumLogo from "./../../../assets/images/mediumIconFull.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { BorderBottom } from "@mui/icons-material";
import { UserContext } from "../../../context/userContext";
import { useApi } from "../../../hooks/useApi";

function WriteBlogHeader({ blog, setBlog }) {
  const { userInfo, isUserLoggedIn } = useContext(UserContext);
  const { fetchRequest } = useApi();

  const [profileOptions, setProfileOptions] = useState([
    {
      id: 0,
      name: "Profile",
      path: "/new-story",
    },
    {
      id: 1,
      name: "Library",
      path: "/new-story",
    },
    {
      id: 2,
      name: "Stories",
      path: "/new-story",
    },
    {
      id: 3,
      name: "Stats",
      path: "/new-story",
    },
    {
      id: 4,
      name: "Settings",
      path: "/new-story",
    },
    {
      id: 5,
      name: "Refine recommendations",
      path: "/new-story",
    },
    {
      id: 6,
      name: "Manage publications",
      path: "/new-story",
    },
    {
      id: 7,
      name: "Help",
      path: "/new-story",
    },
  ]);

  const handleUserLogout = async () => {
    try {
      const response = await fetchRequest("/users/logout", "GET");
      if (response.status === 200) {
        window.location.reload();
      } else {
        const msg = "Something went wrong!";
        toast.error(msg);
      }
    } catch (err) {
      const msg = "Something went wrong!";
      toast.error(msg);
    }
  };

  const handlePublishBtnClick = () => {
    if (!blog.isShowPreview) setBlog((prev) => ({ ...prev, isShowPreview: true }));
  };

  return (
    <div className="fixed z-[500] w-full font-10 color10 font-normal top-0 box-border bg13">
      <div className="relative width41 height-63 padding-14 mx-auto flex justify-between items-center" style={{ paddingBlock: 0 }}>
        <div className="relative z-[500] grow shink basis-auto flex justify-start items-center">
          <div>
            <Link to="/" className="border-0 no-underline p-0 m-0 flex items-center">
              <div className="flex">
                <img src={mediumLogo} alt="brand logo" className="width42 height64" />
              </div>
            </Link>
          </div>
        </div>

        <div className="relative z-[500] grow-0 shrink-0 basis-auto flex items-center">
          <div className="height-63 padding-6 flex items-center" style={{ paddingBlock: 0 }}>
            <button onClick={handlePublishBtnClick} className={`color-2 bg14 font13 custom-h-2 padding-25 m-0 box-border cursor-pointer bdr9 rounded-full ${blog.heading.trim().length >= 2 && blog.description.trim().length >= 4 ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}`} style={{ paddingBlock: 0 }}>
              <span>Publish</span>
            </button>
          </div>
          <div>
            <button className="align-middle p-0 text-left cursor-pointer box-border custom-h-2 aspect-square margin-21" style={{ marginLeft: 0, marginBlock: 0 }}>
              <div className="w-full h-full font13 text-left select-none font-normal">
                <IoIosNotificationsOutline className="w-full h-full color10" />
              </div>
            </button>
            <Popover.Root>
              <Popover.Trigger className="align-middle font13 p-0 text-left font-10 cursor-pointer select-none box-border font-normal m-0">
                <div className="whitespace-nowrap overflow-visible text-ellipsis text-left color10 font-10">
                  <img src={userInfo?.profileImg} alt="user profile" className="width-11 aspect-square align-middle rounded-full border-0" />
                </div>
              </Popover.Trigger>
              <Popover.Content side="bottom" align="middle" sideOffset={1}>
                <div className="color11 overflow-hidden font13 text-center padding44 relative">
                  <div className="custom-px-2 overflow-auto relative width44 custom-bg-8 border-radius-4 boxShadow5">
                    <ul className="m-0 p-0 list-none font13 text-center box-border">
                      <li className="text-left w-full whitespace-nowrap font-9 font-normal list-none custom-p-y-1 padding46">
                        <div className="flex items-center">
                          <div className="grow-0 shrink-0 basis-auto">
                            <img src={userInfo?.profileImg} alt="user profile" className="align-middle rounded-full width-4 aspect-square" />
                          </div>
                          <div className="font-10 padding44 grow shrink basis-auto" style={{ paddingRight: 0, paddingBlock: 0 }}>
                            <div className="font-semibold">
                              <Link to="/" className="inline-block color11 no-underline cursor-pointer">
                                {userInfo?.username}
                              </Link>
                            </div>
                            <div>
                              <Link to="/" className="inline-block color10 no-underline cursor-pointer">
                                {userInfo?.email}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="bdr9 margin-10 padding47" style={{ borderBottom: 0, borderInline: 0 }}></li>
                      <li className="text-left w-full whitespace-nowrap font-10 font-normal">
                        <Link to="/new-story" className="inline-block padding48 padding49 text-left w-full whitespace-nowrap color-6 align-baseline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                          Write
                        </Link>
                      </li>
                      <li className="bdr9 margin-10 padding47" style={{ borderBottom: 0, borderInline: 0 }}></li>
                      {profileOptions.slice(0, 4).map((item) => (
                        <li className="text-left w-full whitespace-nowrap font-10 font-normal">
                          <Link to={item.path} className="inline-block padding48 padding49 text-left w-full whitespace-nowrap color-6 align-baseline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li className="bdr9 margin-10 padding47" style={{ borderBottom: 0, borderInline: 0 }}></li>
                      {profileOptions.slice(4, 8).map((item) => (
                        <li className="text-left w-full whitespace-nowrap font-10 font-normal">
                          <Link to={item.path} className="inline-block padding48 padding49 text-left w-full whitespace-nowrap color-6 align-baseline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li className="bdr9 margin-10 padding47" style={{ borderBottom: 0, borderInline: 0 }}></li>{" "}
                      <li className="text-left w-full whitespace-nowrap font-10 font-normal">
                        <button onClick={handleUserLogout} className="inline-block padding48 padding49 text-left w-full whitespace-nowrap color-6 cursor-pointer align-baseline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteBlogHeader;
