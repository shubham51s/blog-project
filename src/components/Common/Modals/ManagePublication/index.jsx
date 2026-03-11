import React, { useContext, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

function ManagePublication({ isShowModal, handleCloseModal }) {
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
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Manage publications</h2>
        </div>

        <div className="margin51">
          <Link to="" className="cursor-pointer m-0 p-0">
            <div className="text-[#1A8917] custom-fs-1 line20 font-normal m-0 flex items-center">
              <div className="width84 aspect-square margin-3">
                <GoPlus className="w-full h-full" />
              </div>
              <span className="inline-block">Create a new publication</span>
            </div>
          </Link>

          <div className="margin-17">
            <div className="h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
          </div>

          <p className="color-4 custom-fs-1 line20 font-normal m-0">You don't belong to any publications.</p>
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

export default ManagePublication;
