import React, { useContext, useState } from "react";
import { MuteContext } from "../../../../context/mute";
import { useToggleMute } from "../../../../hooks/toggleMute";

function MutePublicationBtn({ publication, handleMuteStatusChange = () => {} }) {
  const { muteLoader, mutedPublications } = useContext(MuteContext);
  const { mutePublication, unmutePublication } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);

  const handleMutePublication = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      const isSuccess = await mutePublication(params);

      if (isSuccess) handleMuteStatusChange(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnmutePublication = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };
      await unmutePublication(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {publication && !muteLoader.publication && publication._id && publication.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!mutedPublications[publication._id] && (
            <button onClick={handleMutePublication} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Mute publication
            </button>
          )}

          {mutedPublications[publication._id] && (
            <button onClick={handleUnmutePublication} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Unmute publication
            </button>
          )}
        </li>
      )}
    </>
  );
}

export default MutePublicationBtn;
