import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../../context/userContext";
import { useToggleMute } from "../../../../../hooks/toggleMute";

function ListItem({ item, onMuteStatusChange }) {
  const { muteUser, unmuteUser, userMuteLoader } = useToggleMute();
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState(item);

  const handleMuteBtnClick = async () => {
    setUser((prev) => ({ ...prev, isMuted: true }));
    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await muteUser(params);
    if (isSuccess) {
      onMuteStatusChange("user", true, user._id);
    } else {
      setUser((prev) => ({ ...prev, isMuted: false }));
    }
  };

  const handleUnmuteBtnClick = async () => {
    setUser((prev) => ({ ...prev, isMuted: false }));
    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await unmuteUser(params);
    if (isSuccess) {
      onMuteStatusChange("user", false, user._id);
    } else {
      setUser((prev) => ({ ...prev, isMuted: true }));
    }
  };

  return (
    <>
      {user && (
        <div className="margin60 flex">
          <Link to={`/profile/${user.username}`} className="cursor-pointer list-none">
            <div className="relative">
              <img loading="lazy" src={user.profileImg} className="width-15 aspect-square rounded-full" />
              <div className="absolute top-0 boxShadow7 width-15 aspect-square rounded-full"></div>
            </div>
          </Link>
          <div className="padding82 w-full flex justify-between">
            <div className="w-full flex flex-col justify-center">
              <div className="flex items-center">
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 no-underline p-0">
                  <h2 className="height-15 font-10 font-medium color-3 line20 m-0 line-clamp-2">{user.name}</h2>
                </Link>
              </div>
              {user.bio && (
                <Link to={`/profile/${user.username}`} className="cursor-pointer m-0 no-underline p-0">
                  <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0">{user.bio}</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
              {user.isMuted && (
                <button onClick={handleUnmuteBtnClick} disabled={userMuteLoader} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${userMuteLoader ? "opacity-75" : "opacity-100"}`}>
                  <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Muted</div>
                </button>
              )}
              {!user.isMuted && (
                <button onClick={handleMuteBtnClick} disabled={userMuteLoader} className={`bdr-6 bg-[#191919] padding-20 padding-28 border-radius-7 cursor-pointer opacity-[0.95] transition-all duration-75 ease  ${userMuteLoader ? "" : "hover:opacity-100"}`}>
                  <div className="text-white custom-fs-1 line20 font-normal">Mute</div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListItem;
