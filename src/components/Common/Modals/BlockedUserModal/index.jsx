import React, { useContext, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";

function BlockedUserModal({ isShowModal, handleCloseModal }) {
  return (
    <Dialog
      open={isShowModal}
      onClose={handleCloseModal}
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
      <div className="width60 boxShadow6 padding70 relative border-radius-3 custom-bg-8">
        <div className="text-center">
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Blocked users</h2>
        </div>

        <div className="margin60">
          <p className="color-3 custom-fs-1 line20 font-normal m-0">Blocked users will be removed from your feed and email digests, and you won't see them in the future.</p>
        </div>

        <div className="margin51">
          <p className="color-4 custom-fs-1 line20 font-normal m-0">You are not blocking any users.</p>
        </div>

        <div className="absolute right5 top6">
          <button onClick={handleCloseModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.6] transition-all duration-75 ease hover:opacity-[0.8]">
            <div className="width-13 aspect-square">
              <MdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default BlockedUserModal;
