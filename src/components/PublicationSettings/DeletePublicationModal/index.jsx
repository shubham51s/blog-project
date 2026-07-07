import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useNavigate } from "react-router-dom";

function ConfirmDeletePublicationModal({ closeModal, publication }) {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deletePublication = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/publication/delete", "POST", { publicationId: publication._id });
      const result = await response.json();

      if (response?.status === 200) {
        showToast("Publication deleted successfully.");
        navigate("/");
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
    <div onClick={closeModal} disabled={isLoading} className="fixed text-center inset-0 z-[900] flex bg13 w-full">
      <button onClick={closeModal} disabled={isLoading} className="absolute top-0 right-0 padding44 cursor-pointer font-normal custom-bg-8 color-4 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
        <div className="width58 aspect-square">
          <IoCloseOutline className="w-full h-full" />
        </div>
      </button>
      <div onClick={(e) => e.stopPropagation()} className="text-center width90 m-auto overflow-hidden padding54 padding53">
        <h3 className="color11 font18 margin-6 font-semibold" style={{ marginTop: 0 }}>
          Confirm
        </h3>
        <div className="color13 margin71 font-9" style={{ marginTop: 0 }}>
          Are you sure you want to delete this publication?
        </div>
        <div>
          <button onClick={deletePublication} className="text-[#0F730C] bdr22 border-[#0F730C] margin-10 margin73 padding-38 custom-fs-1 text-center cursor-pointer whitespace-nowrap select-none font-normal padding-20 border-radius-9 transition-all duration-75 ease opacity-[0.95] hover:opacity-100" style={{ marginTop: 0, marginLeft: 0 }}>
            Confirm
          </button>
          <button onClick={closeModal} disabled={isLoading} className="color-3 bdr17-hover margin-10 margin73 padding-38 custom-fs-1 text-center cursor-pointer whitespace-nowrap select-none font-normal padding-20 border-radius-9 transition-all duration-300 ease opacity-[0.9]" style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePublicationModal;
