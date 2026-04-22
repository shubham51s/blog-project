import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToggleMute } from "../../../../hooks/toggleMute";
import { MuteContext } from "../../../../context/mute";

function PublicationListItem({ publication, onMuteStatusChange }) {
  const { muteLoader, mutedPublications } = useContext(MuteContext);
  const { mutePublication, unmutePublication } = useToggleMute();
  const [isLoading, setIsLoading] = useState(false);

  const handleMuteBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: publication._id,
      name: publication.name,
    };
    const isSuccess = await mutePublication(params);

    if (isSuccess) {
      onMuteStatusChange("publication", true, publication._id);
    }

    setIsLoading(false);
  };

  const handleUnmuteBtnClick = async () => {
    setIsLoading(true);

    const params = {
      _id: publication._id,
      name: publication.name,
    };
    const isSuccess = await unmutePublication(params);
    if (isSuccess) {
      onMuteStatusChange("publication", false, publication._id);
    }

    setIsLoading(false);
  };

  return (
    <>
      {publication && (
        <div className="margin60 flex">
          <Link to={`/publication/${publication.slug}`} className="cursor-pointer list-none">
            <div className="relative">
              <img src={publication.profileImg} className="width-15 aspect-square br13" />
              <div className="absolute top-0 boxShadow7 width-15 aspect-square br13"></div>
            </div>
          </Link>
          <div className="padding82 w-full flex justify-between">
            <div className="w-full flex flex-col justify-center">
              <div className="flex items-center">
                <Link to={`/publication/${publication.slug}`} className="cursor-pointer m-0 no-underline p-0">
                  <h2 className="height-15 font-10 font-medium color-3 line20 m-0 line-clamp-2">{publication.name}</h2>
                </Link>
              </div>
              {publication.description && (
                <Link to={`/publication/${publication.slug}`} className="cursor-pointer m-0 no-underline p-0">
                  <div className="w-full max-w-full whitespace-pre-wrap margin44 break-words">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0">{publication.description}</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="margin-14 flex items-start justify-end width-23" style={{ marginRight: 0, marginBlock: 0 }}>
              {!muteLoader.publication && mutedPublications[publication._id] && (
                <button onClick={handleUnmuteBtnClick} disabled={isLoading} className={`bdr17-hover padding-20 padding-28 border-radius-7 cursor-pointer transition-all duration-500 ease ${isLoading ? "opacity-75" : "opacity-100"}`}>
                  <div className="color-3 custom-fs-1 line20 font-normal flex items-center">Muted</div>
                </button>
              )}
              {!muteLoader.publication && !mutedPublications[publication._id] && (
                <button onClick={handleMuteBtnClick} disabled={isLoading} className={`bdr-6 bg-[#191919] padding-20 padding-28 border-radius-7 cursor-pointer opacity-[0.95] transition-all duration-75 ease ${isLoading ? "" : "hover:opacity-100"}`}>
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

export default PublicationListItem;
