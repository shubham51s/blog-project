import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";
import { UserContext } from "../../context/userContext";
import { showToast } from "../../utils/toaster";
import SectionHeader from "../../components/LibraryComp/SectionHeader";
import CreateNewListModal from "../../components/Common/Modals/CreateNewList";

function LibraryPage() {
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

  return (
    <>
      <div className="padding86" style={{ paddingTop: 0, paddingInline: 0 }}>
        <div className="flex justify-center">
          <div className="w-full max-width-2 min-w-0 margin-12">
            <SectionHeader handleCreateNewBlogBtnClick={handleCreateNewBlogBtnClick} />
            <Outlet />
          </div>
        </div>
      </div>
      <CreateNewListModal isCreateListModal={isCreateListModal} setIsCreateListModal={setIsCreateListModal} createNewUserList={createNewUserList} />
    </>
  );
}

export default LibraryPage;
