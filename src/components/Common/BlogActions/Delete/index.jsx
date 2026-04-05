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
      <button onClick={handleShowDeleteModal} className="cursor-pointer m-0 p-0 flex items-center color-9">
        <div className="flex items-start text-left color-9">Delete story</div>
      </button>
      {isDeleteModal && <DeleteBlogModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />}
    </>
  );
}

export default DeleteBlogBtn;
