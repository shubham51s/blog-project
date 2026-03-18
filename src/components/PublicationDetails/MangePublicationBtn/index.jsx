import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function ManagePublicationBtn() {
  return (
    <div className="margin-21 bdr-8 padding-7 grow-0 shrink-0 basis-auto" style={{ marginTop: 0, marginInline: 0, borderRight: 0, borderBlock: 0, paddingRight: 0 }}>
      <div className="flex">
        <button className="cursor-pointer m-0 p-0">
          <div className="flex custom-gap-1 items-center">
            <p className="custom-fs-1 color-4 line20 font-normal m-0">Manage publication</p>
            <div className="width84 aspect-square">
              <IoIosArrowDown className="w-full h-full color-4" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ManagePublicationBtn;
