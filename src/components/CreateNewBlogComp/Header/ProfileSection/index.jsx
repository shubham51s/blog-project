import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import * as Popover from "@radix-ui/react-popover";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { broadcastLogout } from "../../../../utils/authChannel";

function ProfileSection() {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [profileOptions, setProfileOptions] = useState([
    {
      id: 0,
      name: "Profile",
      path: `/profile/${userInfo?.username}`,
    },
    {
      id: 1,
      name: "Library",
      path: "/me/lists",
    },
    {
      id: 2,
      name: "Stories",
      path: "/me/stories",
    },
    {
      id: 4,
      name: "Settings",
      path: "/me/settings",
    },
    {
      id: 5,
      name: "Refine recommendations",
      path: "/me/following",
    },
    {
      id: 6,
      name: "Manage publications",
      path: "/me/settings/publishing#managePublications",
    },
  ]);

  const handleUserLogout = async () => {
    try {
      const response = await requestHandler("/users/logout");
      const result = await response.json();

      if (response?.status === 200) {
        broadcastLogout();
        window.location.reload();
      } else {
        showToast(result?.message || "Some error occured.", "error");
      }
    } catch (err) {
      showToast("Some error occured.", "error");
    }
  };

  return (
    <>
      {userInfo && (
        <Popover.Root>
          <Popover.Trigger className="align-middle font13 p-0 text-left font-10 cursor-pointer select-none box-border font-normal m-0">
            <div className="overflow-visible text-ellipsis text-left color10 font-10">
              <img loading="lazy" src={userInfo.profileImg} className="width-11 aspect-square align-middle rounded-full border-0" />
            </div>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="middle" sideOffset={1}>
            <div className="color11 font13 text-center padding44 relative">
              <div className="custom-px-2 overflow-y-auto-auto relative width44 overflow-x-hidden custom-bg-8 border-radius-4 boxShadow5">
                <ul className="m-0 p-0 list-none font13 text-center box-border">
                  <li className="text-left w-full whitespace-nowrap font-9 font-normal list-none custom-p-y-1 padding46">
                    <div className="flex items-center">
                      <div className="grow-0 shrink-0 basis-auto">
                        <img loading="lazy" src={userInfo.profileImg} className="align-middle rounded-full width-4 aspect-square" />
                      </div>
                      <div className="font-10 padding44 grow shrink basis-auto" style={{ paddingRight: 0, paddingBlock: 0 }}>
                        <div className="font-semibold">
                          <Link to={`/profile/${userInfo.username}`} title={userInfo.name} className="inline-block color11 no-underline cursor-pointer">
                            {userInfo.name}
                          </Link>
                        </div>
                        <div>
                          <Link to={`/profile/${userInfo.username}`} title={userInfo.email} className="inline-block color-4 truncate cursor-pointer transition-all duration-75 ease hover:underline">
                            {userInfo.email}
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
                    <li key={item.id} className="text-left w-full whitespace-nowrap font-10 font-normal">
                      <Link to={item.path} className="inline-block padding48 padding49 text-left w-full whitespace-nowrap color-6 align-baseline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li className="bdr9 margin-10 padding47" style={{ borderBottom: 0, borderInline: 0 }}></li>
                  {profileOptions.slice(4, 8).map((item) => (
                    <li key={item.id} className="text-left w-full whitespace-nowrap font-10 font-normal">
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
      )}
    </>
  );
}

export default ProfileSection;
