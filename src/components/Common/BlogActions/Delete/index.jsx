import React, { useState } from "react";
import DeleteBlogModal from "../../Modals/ConfirmDeleteBlog";

function DeleteBlogBtn({ blog, handleAfterBlogDelete = () => {} }) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  return (
    <>
      <li className="custom-px-2 padding59">
        <button onClick={handleShowDeleteModal} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
          <div className="flex items-start text-left color-9">Delete story</div>
        </button>
      </li>
      {isDeleteModal && <DeleteBlogModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />}
    </>
  );
}

export default DeleteBlogBtn;
