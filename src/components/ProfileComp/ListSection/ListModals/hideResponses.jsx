import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";

function HideResponseModal({ isHideResponseModal, handleCloseHideResponseModal, hideResponses }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleHideResponsesBtnClick = () => {
    hideResponses(setIsLoading);
  };

  return (
    <Dialog
      open={isHideResponseModal}
      onClose={handleCloseHideResponseModal}
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
      <div className="relative">
        <div className="custom-bg-8 height79 width80 boxShadow6 padding-17 flex flex-col justify-between items-center border-radius-3">
          <div className="grow shrink-0 basis-auto max-width-2 padding77 padding78 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="padding-20" style={{ paddingTop: 0 }}>
                <h2 className="line21 font15 font-semibold color-3 m-0">Hide responses</h2>
              </div>
              <div className="padding61">
                <p className="line-h-8 font-10 color-4 font-normal m-0">This will disable the ability to respond or view responses to a list. Any existing responses will also no longer be visible. You can always undo this action.</p>
              </div>
              <div className="w-full flex justify-center">
                <button onClick={handleCloseHideResponseModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                  Cancel
                </button>
                <div className="padding50" style={{ paddingRight: 0 }}>
                  <button onClick={handleHideResponsesBtnClick} disabled={isLoading} className={`flex items-center custom-gap-3 bdr-3 border-[#1a8917] bg-[#1a8917] border-radius-9 text-center text-white custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 transition-all duration-75 linear ${isLoading ? "cursor-default opacity-[0.5]" : "cursor-pointer opacity-[0.9] hover:opacity-100"}`}>
                    {isLoading && <div className="width83 aspect-square rounded-full border-2 border-white border-t-0 border-r-0 animate-spin"></div>}Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute topRight2">
          <button onClick={handleCloseHideResponseModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
            <div className="width58 aspect-square">
              <IoMdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default HideResponseModal;
