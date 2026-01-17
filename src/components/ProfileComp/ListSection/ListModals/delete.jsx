import React from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";

function DeleteListModal({ isDeleteModal, handleCloseDeleteModal }) {
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
      <div className="relative">
        <div className="custom-bg-8 height79 width80 boxShadow6 padding-17 flex flex-col justify-between items-center border-radius-3">
          <div className="grow shrink-0 basis-auto max-width-2 padding77 padding78 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="padding-20" style={{ paddingTop: 0 }}>
                <h2 className="line21 font15 font-semibold color-3 m-0">Delete list</h2>
              </div>
              <div className="padding61">
                <p className="line-h-8 font-10 color-4 font-normal m-0">Deleting this list {"(Reading list)"} will remove it from Your library. If others have saved this list, it will also be deleted and removed from their library. Deleting this list will not delete any stories in it.</p>
              </div>
              <div className="w-full flex justify-center">
                <button onClick={handleCloseDeleteModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                  Cancel
                </button>
                <div className="padding50" style={{ paddingRight: 0 }}>
                  <button className="bdr-3 border-[#c94a4a] bg-[#c94a4a] border-radius-9 text-center color-2 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">Delete</button>
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
    </Dialog>
  );
}

export default DeleteListModal;
