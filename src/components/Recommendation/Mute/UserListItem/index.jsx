import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { useToggleMute } from "../../../../hooks/toggleMute";
import { MuteContext } from "../../../../context/mute";

function UserListItem({ user, onMuteStatusChange }) {
  const { muteLoader, mutedUsers } = useContext(MuteContext);
  const { userInfo } = useContext(UserContext);
  const { muteUser, unmuteUser } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);

  const handleMuteBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await muteUser(params);
    if (isSuccess) onMuteStatusChange("user", true, user._id);

    setIsLoading(false);
  };

  const handleUnmuteBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: user._id,
      name: user.name,
    };
    const isSuccess = await unmuteUser(params);
    if (isSuccess) onMuteStatusChange("user", false, user._id);

    setIsLoading(false);
  };

  return (
    <>
      {user && (
        <div className="margin60 flex">
          <Link to={`/profile/${user.username}`} className="cursor-pointer list-none">
            <div className="relative">
              <img src={user.profileImg} alt={user.name} className="width-15 aspect-square rounded-full" />
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

            {!muteLoader.user && userInfo._id !== user._id && (
              <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
                {mutedUsers[user._id] && (
                  <button onClick={handleUnmuteBtnClick} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${isLoading ? "opacity-75" : "opacity-100"}`}>
                    <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Muted</div>
                  </button>
                )}
                {!mutedUsers[user._id] && (
                  <button onClick={handleMuteBtnClick} disabled={isLoading} className={`bdr-6 bg-[#191919] padding-20 padding-28 border-radius-7 cursor-pointer opacity-[0.95] transition-all duration-75 ease ${isLoading ? "" : "hover:opacity-100"}`}>
                    <div className="text-white custom-fs-1 line20 font-normal">Mute</div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserListItem;
