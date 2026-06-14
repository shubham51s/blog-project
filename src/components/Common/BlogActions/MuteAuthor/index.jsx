import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import { MuteContext } from "../../../../context/mute";
import { useToggleMute } from "../../../../hooks/toggleMute";

function MuteAuthorBtn({ user, handleMuteStatusChange = () => {} }) {
  const { mutedUsers } = useContext(MuteContext);
  const { userInfo } = useContext(UserContext);
  const { muteUser, unmuteUser } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);
  const [currUser, setCurrUser] = useState(user);

  const handleMuteAuthor = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: currUser._id,
        name: currUser.name,
      };
      const isSuccess = await muteUser(params);
      if (isSuccess) {
        setCurrUser((prev) => ({ ...prev, isMuted: true }));
        handleMuteStatusChange(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnmuteAuthor = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: currUser._id,
        name: currUser.name,
      };

      const isSuccess = await unmuteUser(params);
      if (isSuccess) {
        setCurrUser((prev) => ({ ...prev, isMuted: false }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user && userInfo._id !== currUser._id && currUser._id && currUser.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!mutedUsers[currUser._id] && !currUser.isMuted && (
            <button onClick={handleMuteAuthor} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Mute author
            </button>
          )}

          {(mutedUsers[currUser._id] || currUser.isMuted) && (
            <button onClick={handleUnmuteAuthor} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Unmute author
            </button>
          )}
        </li>
      )}
    </>
  );
}

export default MuteAuthorBtn;
