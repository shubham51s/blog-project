import React, { useContext, useState } from "react";
import ReportBlogModal from "../../Modals/ReportBlog";
import { UserContext } from "../../../../context/userContext";

function ReportStory({ blog, closePopup = () => {} }) {
  const { userInfo } = useContext(UserContext);
  const [isReportModal, setIsReportModal] = useState(false);

  const handleCloseReportModal = () => {
    setIsReportModal(false);
    closePopup();
  };

  const handleShowReportModal = () => {
    setIsReportModal(true);
  };

  return (
    <>
      {blog?.author?._id && blog.author._id !== userInfo._id && (
        <li className="custom-px-2 padding59 custom-fs-1 font-normal opacity-[0.9] transition-all duration-75 ease hover:opacity-100">
          <button onClick={() => handleShowReportModal()} className="cursor-pointer m-0 p-0 color-9">
            Report story...
          </button>
        </li>
      )}
      {isReportModal && <ReportBlogModal isReportModal={isReportModal} handleCloseReportModal={handleCloseReportModal} blog={blog} />}
    </>
  );
}

export default ReportStory;
