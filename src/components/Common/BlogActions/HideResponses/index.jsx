import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import DisableBlogCommentsModal from "../../Modals/DisableComments";
import { showToast } from "../../../../utils/toaster";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function HideResponsesBtn({ blog, closePopup, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseResponseModal = () => {
    closePopup();
    setIsResponseModal(false);
  };

  const onHideResponse = () => {
    setBlog((prev) => ({ ...prev, allowComments: false }));
    closePopup();
  };

  const enableShowComments = async () => {
    setIsLoading(true);
    try {
      const params = {
        blogId: blog._id,
      };
      const response = await requestHandler("/blogs/show-responses", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast("Responses are now shown for the blog.");
        setBlog((prev) => ({ ...prev, allowComments: true }));
        closePopup();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {blog?.author?._id === userInfo._id && blog.hasOwnProperty("allowComments") && (
        <>
          {blog.allowComments && (
            <li className="custom-px-2 padding59">
              <button onClick={() => setIsResponseModal(true)} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                <div className="flex items-start text-left">Hide responses</div>
              </button>
            </li>
          )}
          {!blog.allowComments && (
            <li className="custom-px-2 padding59">
              <button onClick={enableShowComments} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
                <div className="flex items-start text-left">Show responses</div>
              </button>
            </li>
          )}
        </>
      )}

      {isResponseModal && <DisableBlogCommentsModal blog={blog} isResponseModal={isResponseModal} handleCloseResponseModal={handleCloseResponseModal} onHideResponse={onHideResponse} />}
    </>
  );
}

export default HideResponsesBtn;
