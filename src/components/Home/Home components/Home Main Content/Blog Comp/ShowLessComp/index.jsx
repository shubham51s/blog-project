import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { GoMute } from "react-icons/go";

function ShowLessComp({ setIsHideBlog }) {
  const handleShowLessLikeThisBtnClick = (e) => {
    e.stopPropagation();
    setIsHideBlog(true);
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
      <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 z-[800] padding-2 flex items-center justify-center bg17">
        <div className="my-auto p-0">
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
                  <button className="bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100" style={{ borderInline: 0, borderTop: 0 }}>
                    <div className="width-13 aspect-square">
                      <GoMute className="w-full h-full color-3" />
                    </div>
                    <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                      <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Mute author</p>
                      <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                    </div>
                  </button>
                  <button className="bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100" style={{ borderInline: 0, borderTop: 0 }}>
                    <div className="width-13 aspect-square">
                      <GoMute className="w-full h-full color-3" />
                    </div>
                    <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                      <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Mute publication</p>
                      <p className="break-all line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                    </div>
                  </button>
                  <button className="padding-19 padding-42 padding63 cursor-pointer m-0 flex color-9 transition-all duration-200 ease-out opacity-[0.9] hover:opacity-100">
                    <div className="width-13 aspect-square">
                      <GoMute className="w-full h-full" />
                    </div>
                    <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                      <p className="break-all line-clamp-1 text-ellipsis height-6 color-9 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Mute publication</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="margin51">
              <div className="flex justify-end custom-gap-2">
                <button className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 bdr-7 border-radius-9 text-center box-border color-3 font-400 m-0">Undo</button>
                <button className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 border-radius-9 text-center box-border font-400 m-0 bdr-6 custom-bg-1 color-2">Done</button>
              </div>
            </div>

            <div className="absolute right5 top6">
              <button className="cursor-pointer m-0 p-0 width-13 aspect-square color-6 transition-all duration-200 ease-out opacity-75 hover:opacity-100">
                <IoMdClose className="w-full h-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowLessComp;
