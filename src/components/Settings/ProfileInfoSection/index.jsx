import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import EditProfileInfoModal from "../../Common/Modals/EditProfileInfoModal";

function ProfileInfoSection() {
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
              <span className="color-3 custom-fs-1 line20 font-normal">Profile information</span>
              <div className="whitespace-pre-line margin44">
                <span className="font-4 color-4 line20 font-normal">Edit your photo, name, pronouns, short bio, etc.</span>
              </div>
            </div>
          </div>

          <div className="inline-block margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="inline-flex items-center padding-6" style={{ paddingRight: 0, paddingBlock: 0 }}>
              <span className="text-right align-bottom truncate opacity-[0.85] transition-all duration-75 ease group-hover:opacity-100">{userInfo.name}</span>
              <div className="margin-13" style={{ marginRight: 0 }}>
                <img src={userInfo.profileImg} className="width-13 aspect-square rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </button>
      {isShowModal && <EditProfileInfoModal isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default ProfileInfoSection;
