import React, { useContext, useState } from "react";
import { MuteContext } from "../../../../context/mute";
import { useToggleMute } from "../../../../hooks/toggleMute";

function MutePublicationBtn({ publication, handleMuteStatusChange = () => {} }) {
  const { mutedPublications } = useContext(MuteContext);
  const { mutePublication, unmutePublication } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);
  const [currPublication, setCurrPublication] = useState(publication);

  const handleMutePublication = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: currPublication._id,
        name: currPublication.name,
      };
      const isSuccess = await mutePublication(params);

      if (isSuccess) {
        handleMuteStatusChange(true);
        setCurrPublication((prev) => ({ ...prev, isMuted: true }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnmutePublication = async () => {
    setIsLoading(true);

    try {
      const params = {
        _id: currPublication._id,
        name: currPublication.name,
      };
      const isSuccess = await unmutePublication(params);
      if (isSuccess) {
        setCurrPublication((prev) => ({ ...prev, isMuted: false }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {publication && currPublication._id && currPublication.name && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!mutedPublications[currPublication._id] && !currPublication.isMuted && (
            <button onClick={handleMutePublication} disabled={isLoading} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Mute publication
            </button>
          )}

          {(mutedPublications[currPublication._id] || currPublication.isMuted) && (
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
