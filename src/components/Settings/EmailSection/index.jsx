import React, { useContext, useState } from "react";
import EditEmailModal from "../../Common/Modals/EditEmail";
import { UserContext } from "../../../context/userContext";

function EmailSection() {
  const { userInfo } = useContext(UserContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <button onClick={() => setIsShowModal(true)} className="w-full flex items-center justify-between text-left margin-14 color-3 custom-fs-1 cursor-pointer p-0 group" style={{ marginInline: 0 }}>
        <div className="flex w-full items-baseline justify-between">
          <div className="flex items-baseline">
            <div className="grow shrink basis-0 my-auto">
              <span className="color-3 custom-fs-1 line20 font-normal">Email address</span>
            </div>
          </div>

          <div className="inline-block margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
            <span className="inline-block width-28 text-right align-bottom truncate opacity-[0.75] transition-all duration-75 ease group-hover:opacity-[0.95]">{userInfo.email}</span>
          </div>
        </div>
      </button>
      {isShowModal && <EditEmailModal isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default EmailSection;
