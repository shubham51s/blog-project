import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EditorsListModal from "../EditorsList";
import { PublicationContext } from "../../../context/publication";
import { useTogglePublicationFollow } from "../../../hooks/togglePublicationFollow";
import ManagePublicationBtn from "../MangePublicationBtn";
import InboxBtn from "../InboxBtn";

function HeaderSection({ publication, setPublication }) {
  const { followingPublication, isPublicationLoader } = useContext(PublicationContext);
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handlePublicationFollow = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };

      const isSuccess = await followPublication(params);

      if (isSuccess) {
        setPublication((prev) => ({ ...prev, stats: { ...prev.stats, followers: prev.stats.followers + 1 } }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublicationUnfollow = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: publication._id,
        name: publication.name,
      };

      const isSuccess = await unfollowPublication(params);

      if (isSuccess) {
        setPublication((prev) => ({ ...prev, stats: { ...prev.stats, followers: prev.stats.followers - 1 } }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap11 bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
        <div className="height-55 w-full custom-bg-8"></div>
        <div className="flex justify-center">
          <div className="w-full min-w-0 custom-max-w-1 custom-m-x-1">
            <div className="margin54 flex items-start">
              <div className="relative grow-0 shrink-0 custom-m-r">
                <img loading="lazy" src={publication.profileImg} className="width70 aspect-square border-radius-5" />
                <div className="absolute top-0 width70 aspect-square border-radius-5 boxShadow7"></div>
              </div>

              <div className="grow flex flex-col custom-gap-5 custom-m-r">
                <div>
                  <h2 className="letter-spacing10 line21 font15 font-semibold color-3 m-0">{publication.name}</h2>
                </div>
                <div className="flex items-center custom-fs-1">
                  <Link to="followers" className="cursor-pointer m-0 p-0 color-3 line20 font-medium opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                    {publication.stats.followers} {publication.stats.followers > 1 ? "followers" : "follower"}
                  </Link>
                  <span className="margin-9 color-4 line20 font-medium" style={{ marginBlock: 0 }}>
                    ·
                  </span>
                  <button onClick={() => setIsShowModal(true)} className="cursor-pointer m-0 p-0 color-3 line20 font-medium opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                    {`${publication.stats.editors} ${publication.stats.editors > 1 ? "editors" : "editor"}`}{" "}
                  </button>
                </div>
              </div>

              {!isPublicationLoader && (
                <div className="grow-0 shrink-0">
                  {followingPublication[publication._id] && (
                    <button onClick={handlePublicationUnfollow} disabled={isLoading} className="flex items-center justify-center m-0 bdr17-hover padding-37 padding-38 border-radius-8 cursor-pointer transition-all duration-500 ease">
                      <span className="color-3 custom-fs-1 line20 w-full font-normal">Following</span>
                    </button>
                  )}
                  {!followingPublication[publication._id] && (
                    <button onClick={handlePublicationFollow} disabled={isLoading} className="flex items-center justify-center m-0 bdr17-hover padding-37 padding-38 border-radius-8 cursor-pointer transition-all duration-500 ease">
                      <span className="color-3 custom-fs-1 line20 w-full font-normal">Follow</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="min-w-0 flex justify-between custom-gap-2">
                <div className="grow shrink basis-auto"></div>
                {publication.isMember && <InboxBtn publication={publication} />}
                {publication.isMember && <ManagePublicationBtn publication={publication} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && <EditorsListModal publication={publication} handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default HeaderSection;
