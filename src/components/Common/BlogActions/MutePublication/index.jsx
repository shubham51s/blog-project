import React, { useContext, useEffect, useState } from "react";
import { MuteContext } from "../../../../context/mute";
import { useToggleMute } from "../../../../hooks/toggleMute";

function MutePublicationBtn({ publication, handleMuteStatusChange = () => {} }) {
  const { mutedPublications, muteLoader } = useContext(MuteContext);
  const { mutePublication, unmutePublication, publicationMuteLoader } = useToggleMute();

  const handleMutePublication = async () => {
    const params = {
      _id: publication._id,
      name: publication.name,
    };
    const isSuccess = await mutePublication(params);

    if (isSuccess) {
      handleMuteStatusChange(true);
    }
  };

  const handleUnmutePublication = async () => {
    const params = {
      _id: publication._id,
      name: publication.name,
    };
    await unmutePublication(params);
  };

  return (
    <>
      {publication && publication._id && publication.name && !muteLoader.publication && (
        <li className="custom-px-2 padding59 color-3 custom-fs-1 font-normal">
          {!mutedPublications[publication._id] && (
            <button onClick={handleMutePublication} disabled={publicationMuteLoader} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Mute publication
            </button>
          )}

          {mutedPublications[publication._id] && (
            <button onClick={handleUnmutePublication} disabled={publicationMuteLoader} className="cursor-pointer m-0 p-0 color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
              Unmute publication
            </button>
          )}
        </li>
      )}
    </>
  );
}

export default MutePublicationBtn;
