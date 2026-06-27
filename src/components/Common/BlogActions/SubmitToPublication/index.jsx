import React, { useContext, useState } from "react";
import SubmitBlogModal from "../../Modals/SubmitBlog";
import { UserContext } from "../../../../context/userContext";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";

function SubmitToPublicationBtn({ blog, setBlog, closePopup }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);

  const handleWithdrawSubmission = async () => {
    setIsLoading(true);
    try {
      const params = {
        blogId: blog._id,
      };
      const response = await requestHandler("/blogs/withdraw-submission", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setBlog((prev) => ({ ...prev, submission: "submit", publication: null }));
        showToast(`You have withdrawn your story.`);
        closePopup();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmission = () => {
    setBlog((prev) => ({ ...prev, submission: "withdraw" }));
  };

  return (
    <>
      {blog?.submission === "submit" && blog?.author?._id === userInfo._id && (
        <li className="custom-px-2 padding59">
          <button onClick={() => setIsShowSubmitModal(true)} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
            <div className="flex items-start text-left">Submit to publication</div>
          </button>
        </li>
      )}

      {blog?.submission === "withdraw" && blog?.author?._id === userInfo._id && (
        <li className="custom-px-2 padding59">
          <button onClick={() => handleWithdrawSubmission()} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
            <div className="flex items-start text-left">Withdraw submission</div>
          </button>
        </li>
      )}
      {isShowSubmitModal && <SubmitBlogModal id={blog._id} setIsShowSubmitModal={setIsShowSubmitModal} closePopup={closePopup} tabNo={0} edited={false} isNaviate={false} handleOnSubmission={handleOnSubmission} />}
    </>
  );
}

export default SubmitToPublicationBtn;
