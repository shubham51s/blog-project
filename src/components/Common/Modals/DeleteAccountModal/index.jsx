import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { UserContext } from "../../../../context/userContext";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import ButtonSpinner from "../../ButtonSpinner";
import { showToast } from "../../../../utils/toaster";
import { broadcastLogout } from "../../../../utils/authChannel";

function DeleteAccountModal({ isShowModal, handleCloseModal }) {
  const { userInfo } = useContext(UserContext);
  const { requestHandler } = useRequestHandler();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocusChange = (isFocused) => {
    if (isFocused && !isFocus) {
      setIsFocus(true);
    } else if (!isFocused && isFocus) {
      setIsFocus(false);
    }
  };

  const handleInputChange = (val) => {
    setValue(val);
  };

  const closeModal = () => {
    if (isLoading) return;
    handleCloseModal();
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/users/delete", "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        showToast(result.message);
        broadcastLogout();
        window.location.reload();
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
    <Dialog
      open={isShowModal}
      onClose={closeModal}
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "auto",
          margin: 0,
          boxShadow: "none",
          backgroundImage: "none",
          overflow: "visible",
        },
      }}
    >
      <div className="width60 boxShadow6 padding70 relative border-radius-3 custom-bg-8">
        <div className="text-center">
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Delete account</h2>
        </div>

        <div className="margin60">
          <div className="color-3 custom-fs-1 line20 font-normal m-0">
            <div>We're sorry to see you go. Once your account is deleted, all of your content will be permanently gone, including your profile, stories, publications, notes, and responses. Deleting your Medium account will not delete any Stripe account you have connected to your Medium account.</div>
          </div>
        </div>

        <div className="margin51">
          <div className="color-3 custom-fs-1 line20 font-normal">
            <div className="w-full flex flex-col">
              <div className="margin68 color-3" style={{ marginTop: 0 }}>
                To confirm deletion, type “delete” below:
              </div>
              <div className={`bdr22 border-solid bg-11 border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus ? "custom-bdr-3" : "border-transparent"}`}>
                <input disabled={isLoading} type="text" maxLength={30} value={value} onChange={(e) => handleInputChange(e.target.value)} onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-semibold" />
              </div>
            </div>
          </div>
        </div>

        <div className="margin51">
          <div className="flex justify-end custom-gap-2">
            <button onClick={closeModal} className="padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 font-normal m-0 bdr22 border-solid border-[#b63636] text-[#b63636] transition-all duration-75 ease opacity-[0.9] cursor-pointer hover:opacity-100">
              Cancel
            </button>

            <button onClick={deleteUser} disabled={isLoading || value !== "delete"} className={`flex items-center justify-center custom-gap-3 padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 bg-[#b63636] text-white font-normal m-0 bdr22 border-solid border-[#b63636] transition-all duration-75 ease ${isLoading || value !== "delete" ? "opacity-[0.6] cursor-default" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
              {isLoading && <ButtonSpinner />}
              Delete account
            </button>
          </div>
        </div>

        <div className="absolute right5 top6">
          <button onClick={closeModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.6] transition-all duration-75 ease hover:opacity-[0.8]">
            <div className="width-13 aspect-square">
              <MdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteAccountModal;
