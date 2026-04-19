import React, { useState } from "react";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toaster";

function Edit({ blog }) {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditStoryBtnClick = async () => {
    setIsLoading(true);
    try {
      const params = {
        blogId: blog._id,
      };

      const response = await requestHandler("/draft/create-from-blog", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.draftId) {
        navigate(`/p/${result.data.draftId}/edit`);
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

  return (
    <li className="custom-px-2 padding59">
      <button onClick={handleEditStoryBtnClick} disabled={isLoading} className="cursor-pointer m-0 p-0 flex items-center color-3 custom-fs-1 font-normal transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
        <div className="flex items-start text-left">Edit story</div>
      </button>
    </li>
  );
}

export default Edit;
