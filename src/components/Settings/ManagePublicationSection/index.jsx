import React, { useContext, useState } from "react";
import ManagePublication from "../../Common/Modals/ManagePublication";

function ManagePublicationSection() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <button onClick={() => setIsShowModal(true)} className="w-full flex items-center justify-between text-left margin-14 color-3 custom-fs-1 cursor-pointer p-0 group" style={{ marginInline: 0 }}>
        <div className="flex w-full items-baseline justify-between">
          <div className="flex items-center">
            <div className="grow shrink basis-0">
              <span className="color-3 custom-fs-1 line20 font-medium">Manage publications</span>
            </div>
          </div>
        </div>
      </button>
      {isShowModal && <ManagePublication isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default ManagePublicationSection;
