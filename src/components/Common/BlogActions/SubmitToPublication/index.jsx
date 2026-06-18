import React, { useContext, useState } from "react";
import SubmitBlogModal from "../../Modals/SubmitBlog";
import { UserContext } from "../../../../context/userContext";

function SubmitToPublicationBtn({ blog }) {
  const { userInfo } = useContext(UserContext);
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);

  return (
    <>
      {!blog?.publication && blog?.author?._id === userInfo._id && (
        <li className="custom-px-2 padding59">
          <button onClick={() => setIsShowSubmitModal(true)} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
            <div className="flex items-start text-left">Submit to publication</div>
          </button>
        </li>
      )}
      {isShowSubmitModal && <SubmitBlogModal id={blog._id} setIsShowSubmitModal={setIsShowSubmitModal} tabNo={0} edited={false} />}
    </>
  );
}

export default SubmitToPublicationBtn;
