import React, { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import CreateNewListModal from "../../../Common/Modals/CreateNewList";

function CreateListBanner({ setIsShowListBanner }) {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [isCreateListModal, setIsCreateListModal] = useState(false);

  const createNewUserList = async (list, setIsLoading) => {
    setIsLoading(false);
    navigate(`/profile/${userInfo.username}/list/${list.slug}`);
  };

  const handleCreateNewBlogBtnClick = () => {
    setIsCreateListModal(true);
  };

  const handleRemoveListBanner = () => {
    setIsShowListBanner(false);
    sessionStorage.setItem("isHideListBanner", true);
  };

  return (
    <>
      <div className="margin51">
        <div className="bg-[#1A8917] margin67 flex justify-between border-radius-3 w-full height85" style={{ marginTop: 0 }}>
          <div className="padding70  w-[50%] max-w-[50%] flex flex-col justify-center items-start">
            <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
              <h2 className="letter-spacing-6 line-h-9 font-11 font-medium m-0">
                <span className="text-white">Create a list to easily organize and share stories</span>
              </h2>
            </div>
            <button onClick={handleCreateNewBlogBtnClick} className="padding-7 custom-px-2 cursor-pointer bdr-3 bg-black text-white text-center border-radius-9 custom-fs-1 line20 font-normal m-0 opacity-[0.9] transition-all duration-75 ease hover:opacity-100" style={{ borderColor: "black" }}>
              Start a list
            </button>
          </div>

          <div className="grow flex justify-between items-start">
            <div className="grow h-full overflow-hidden flex items-center justify-center">
              <div className="w-full aspect-square bg-[#ffffff1a] rounded-full flex items-center justify-center">
                <div className="bg-white rounded-full padding-6 opacity-[0.9]">
                  <div className="width-7 aspect-square">
                    <MdOutlineBookmarkAdd className="w-full h-full text-[#1A8917]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="padding-17 max-w-fit">
              <div className="relative right-0 top-0">
                <button onClick={handleRemoveListBanner} className="cursor-pointer m-0 p-0 flex">
                  <div className="width-25 aspect-square">
                    <IoCloseOutline className="w-full h-full text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateNewListModal isCreateListModal={isCreateListModal} setIsCreateListModal={setIsCreateListModal} createNewUserList={createNewUserList} />
    </>
  );
}

export default CreateListBanner;
