import React, { useContext, useState } from "react";
import EditEmailModal from "../../Common/Modals/EditEmail";
import { UserContext } from "../../../context/userContext";
import EditUsernameModal from "../../Common/Modals/EditUsername";
import DeleteAccountModal from "../../Common/Modals/DeleteAccountModal";

function DeleteAccountSection() {
  const { userInfo } = useContext(UserContext);
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
              <span className="text-[#C94A4A] custom-fs-1 line20 font-normal">Delete account</span>
              <div className="whitespace-pre-line margin44">
                <span className="font-4 color-4 line20 font-normal">Permanently delete your account and all of your content.</span>
              </div>
            </div>
          </div>
        </div>
      </button>
      {isShowModal && <DeleteAccountModal isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default DeleteAccountSection;
