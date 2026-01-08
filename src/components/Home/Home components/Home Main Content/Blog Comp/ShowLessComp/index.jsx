import React, { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { GoMute } from "react-icons/go";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { showToast } from "../../../../../../utils/toaster";

function ShowLessComp({ isHideBlog, setIsHideBlog, blog }) {
  const [isShowModal, setIsShowModal] = useState(false);
  let showModalTimeout = null;

  const handleShowLessLikeThisBtnClick = (e) => {
    e.stopPropagation();

    if (showModalTimeout) clearTimeout(showModalTimeout);
    setIsHideBlog(true);
    showModalTimeout = setTimeout(() => {
      setIsShowModal(true);
    }, 400);
  };

  const closeShowLikeThisModal = (e) => {
    e.stopPropagation();
    setIsShowModal(false);
  };

  const handleUndoBtnClick = () => {
    setIsHideBlog(false);
    setIsShowModal(false);
  };

  const handleMuteBtnClick = (type) => {
    if (type === "author") {
      showToast(`${blog.author.name} has been muted. You will no longer see their stories on your homepage or in your email digests`);
    } else if (type === "publication") {
      showToast(`${blog.community.name} has been muted. You will no longer see their stories on your homepage or in your email digests`);
    }

    setIsShowModal(false);
  };

  return (
    <>
      <div>
        <div className="inline-block">
          <button onClick={(e) => handleShowLessLikeThisBtnClick(e)} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-200 ease-out opacity-[0.7] hover:opacity-100" title="Show less like this">
            <div className="width-13 aspect-square">
              <CiCircleMinus className="w-full h-full align-middle" />
            </div>
          </button>
        </div>
      </div>
      {/* show less like this confirmation modal */}
      {isHideBlog && isShowModal && (
        <div onClick={(e) => closeShowLikeThisModal(e)} className="fixed inset-0 z-[800] padding-2 flex items-center justify-center bg17">
          <div className="my-auto p-0" onClick={(e) => e.stopPropagation()}>
            <div className="width60 boxShadow6 padding62 padding61 padding60 border-radius-3 relative custom-bg-8">
              <div className="text-center">
                <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">Got it, we'll recommend fewer like this</h2>
              </div>

              <div className="text-center margin-37">
                <p className="color-3 custom-fs-1 custom-line-h-1 font-normal m-0 p-0">You can additionally take any of the actions below.</p>
              </div>

              <div className="margin51">
                <div className="margin-14 flex justify-center" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="border-radius10 bdr-5 flex flex-col w-full width61">
                    <button onClick={() => handleMuteBtnClick("author")} className="bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100" style={{ borderInline: 0, borderTop: 0 }}>
                      <div className="width-13 aspect-square">
                        <GoMute className="w-full h-full color-3" />
                      </div>
                      <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                        <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Mute author</p>
                        <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                      </div>
                    </button>
                    {blog.community && (
                      <button onClick={() => handleMuteBtnClick("publication")} className="bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100" style={{ borderInline: 0, borderTop: 0 }}>
                        <div className="width-13 aspect-square">
                          <GoMute className="w-full h-full color-3" />
                        </div>
                        <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                          <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Mute publication</p>
                          <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                        </div>
                      </button>
                    )}
                    <button className="padding-19 padding-42 padding63 cursor-pointer m-0 flex color-9 transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100">
                      <div className="width-13 aspect-square">
                        <MdOutlineReportGmailerrorred className="w-full h-full" />
                      </div>
                      <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                        <p className="break-all line-clamp-1 text-ellipsis height-6 color-9 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Report story...</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="margin51">
                <div className="flex justify-end custom-gap-2">
                  <button onClick={() => handleUndoBtnClick()} className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 bdr-7 border-radius-9 text-center box-border color-6 font-medium m-0 transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100">
                    Undo
                  </button>
                  <button onClick={(e) => closeShowLikeThisModal(e)} className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 border-radius-9 text-center box-border font-normal m-0 bdr-6 custom-bg-1 color-2 transition-all duration-200 ease-out opacity-[0.95] hover:opacity-100">
                    Done
                  </button>
                </div>
              </div>

              <div className="absolute right5 top6">
                <button onClick={(e) => closeShowLikeThisModal(e)} className="cursor-pointer m-0 p-0 width-13 aspect-square color-6 transition-all duration-200 ease-out opacity-75 hover:opacity-100">
                  <IoMdClose className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowLessComp;
