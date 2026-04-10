import React, { useState } from "react";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function WithdrawSubmission({ blog, setBlog, setIsOpen }) {
  const { requestHandler } = useRequestHandler();
  const [buttonText, setButtonText] = useState("Withdraw submission");
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdrawSubmission = async () => {
    setIsLoading(true);
    setButtonText("Withdrawing...");
    try {
      const params = {
        blogId: blog._id,
      };

      const response = await requestHandler("/blogs/withdraw-submission", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setBlog((prev) => ({ ...prev, publicationInfo: { ...prev.publicationInfo, status: "withdrawn" } }));
        setIsOpen(false);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
    } finally {
      setIsLoading(false);
      setButtonText("Withdraw submission");
    }
  };

  return (
    <button onClick={handleWithdrawSubmission} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center">
      <div className="flex items-start text-left">{buttonText}</div>
    </button>
  );
}

export default WithdrawSubmission;
