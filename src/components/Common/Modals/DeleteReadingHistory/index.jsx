import React, { useState } from "react";
import { Dialog, Fade, Grow, Slide, Zoom } from "@mui/material";
import { IoMdClose } from "react-icons/io";

function DeleteReadingHistoryModal({ isDeleteModal, handleCloseDeleteModal, clearReadingHistory }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmDeleteBtnClick = () => {
    clearReadingHistory(setIsLoading);
  };

  return (
    <Dialog
      open={isDeleteModal}
      onClose={handleCloseDeleteModal}
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "auto",
          margin: 0,
          boxShadow: "none",
          backgroundImage: "none",
          overflow: "visible",
        },
      }}
    >
      {/* <div className="padding64 my-auto bg-transparent"> */}
      <div className="relative">
        <div className="flex flex-col items-center justify-between height79 width80 boxShadow6 padding-17 border-radius-3">
          <div className="grow shrink-0 basis-auto flex flex-col items-center justify-center max-width-2 padding77 padding78">
            <div className="flex flex-col items-center">
              <h2 className="letter-spacing10 line21 font15 font-medium color-3 m-0">Clear reading history</h2>
              <div className="padding87 padding88">
                <div className="font-10 line-h-8 color-4 font-normal">The stories that are cleared will no longer influence the recommendations that you receive in your feed or email digest</div>
              </div>
              <div className="w-full flex justify-center">
                <button onClick={handleCloseDeleteModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                  Cancel
                </button>
                <div className="padding50" style={{ paddingRight: 0 }}>
                  <button onClick={handleConfirmDeleteBtnClick} disabled={isLoading} className={`flex items-center custom-gap-3 bdr-3 border-[#c94a4a] bg-[#c94a4a] border-radius-9 text-center color-2 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 transition-all duration-75 linear ${isLoading ? "cursor-default opacity-[0.5]" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
                    {isLoading && <div className="width83 aspect-square rounded-full border-2 border-white border-t-0 border-r-0 animate-spin"></div>}Confirm and clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute topRight2">
          <button onClick={handleCloseDeleteModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
            <div className="width58 aspect-square">
              <IoMdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
      {/* </div> */}
    </Dialog>
  );
}

export default DeleteReadingHistoryModal;
