import React, { useState } from "react";
import SubmitBlogModal from "../../Modals/SubmitBlog";

function SubmitToPublicationBtn({ blog }) {
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);

  return (
    <>
      <button onClick={() => setIsShowSubmitModal(true)} className="cursor-pointer m-0 p-0 flex items-center">
        <div className="flex items-start text-left">Submit to publication</div>
      </button>
      {isShowSubmitModal && <SubmitBlogModal id={blog._id} setIsShowSubmitModal={setIsShowSubmitModal} tabNo={0} edited={false} />}
    </>
  );
}

export default SubmitToPublicationBtn;
