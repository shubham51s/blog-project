import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import { MuteContext } from "../../../../context/mute";
import { useToggleMute } from "../../../../hooks/toggleMute";

function MuteAuthorBtn({ user, handleMuteStatusChange = () => {} }) {
  const { muteLoader, mutedUsers } = useContext(MuteContext);
  const { userInfo } = useContext(UserContext);
  const { muteUser, unmuteUser } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);

  const handleMuteAuthor = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      const isSuccess = await muteUser(params);
      if (isSuccess) handleMuteStatusChange(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnmuteAuthor = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: user._id,
        name: user.name,
      };
      await unmuteUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user && userInfo._id !== user._id && !muteLoader.user && user._id && user.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!mutedUsers[user._id] && (
            <button onClick={handleMuteAuthor} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Mute author
            </button>
          )}

          {mutedUsers[user._id] && (
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
