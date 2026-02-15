import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";
import CreateNewListModal from "../../components/List/CreateList";
import { UserContext } from "../../context/userContext";
import { showToast } from "../../utils/toaster";
import SectionHeader from "../../components/LibraryComp/SectionHeader";

function LibraryPage() {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [isCreateListModal, setIsCreateListModal] = useState(false);

  const createNewUserList = async (params, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/list/create", "POST", params);
      const result = await response.json();

      if (response?.status === 201 && result?.data?.list) {
        const list = result.data.list;
        navigate(`/profile/${userInfo.username}/list/${list.slug}/${list._id}`);
      } else {
        showToast(result?.message || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
    } finally {
      setIsLoading(false);
    }
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
