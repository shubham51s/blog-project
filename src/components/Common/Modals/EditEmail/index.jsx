import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { UserContext } from "../../../../context/userContext";
import ButtonSpinner from "../../ButtonSpinner";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";

function EditEmailModal({ isShowModal, handleCloseModal }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo, fetchUpdatedUserDetails } = useContext(UserContext);
  const [email, setEmail] = useState(userInfo.email);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRef = useRef(null);

  const handleUpdateEmail = async () => {
    setIsLoading(true);
    try {
      const params = { email };
      const response = await requestHandler("/users/update/email", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        const isSuccess = await fetchUpdatedUserDetails();
        if (isSuccess) {
          showToast("Email updated successfully.");
          handleCloseModal();
        }
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

  const handleFocusChange = (isFocused) => {
    if (isFocused && !isFocus) {
      setIsFocus(true);
    } else if (!isFocused && isFocus) {
      setIsFocus(false);
    }
  };

  const handleInputChange = (val) => {
    setEmail(val);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      emailRef.current?.focus();
    }, 100);
  }, []);

  return (
    <Dialog
      open={isShowModal}
      onClose={handleCloseModal}
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
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Email address</h2>
        </div>

        <div className="margin51">
          <div className="color-3 custom-fs-1 line20 font-normal">
            <div className="w-full flex flex-col">
              <div className={`bdr22 border-solid bg-11 border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus ? "custom-bdr-3" : "border-transparent"}`}>
                <input ref={emailRef} disabled={isLoading} type="text" value={email} onChange={(e) => handleInputChange(e.target.value)} onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-semibold" />
              </div>
              <div className="flex justify-between margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                {isValidEmail && <span className="font-4 color-4 w-full line20 font-normal">You can sign into StoryNest with this email address.</span>}
                {!isValidEmail && <span className="font-4 text-[#C94A4A] w-full line20 font-normal">Please enter a valid email.</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="margin51">
          <div className="flex justify-end custom-gap-2">
            <button onClick={handleCloseModal} className="padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 font-normal m-0 bdr22 border-solid border-[#156d12] text-[#156d12] transition-all duration-75 ease opacity-[0.9] cursor-pointer hover:opacity-100">
              Cancel
            </button>

            <button onClick={handleUpdateEmail} disabled={userInfo.email === email || isLoading || !isValidEmail} className={`flex items-center justify-center custom-gap-3 padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 bg-[#156d12] text-white font-normal m-0 bdr22 border-solid border-[#156d12] transition-all duration-75 ease ${userInfo.email === email || isLoading || !isValidEmail ? "opacity-[0.6] cursor-default" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
              {isLoading && <ButtonSpinner />}
              Save
            </button>
          </div>
        </div>

        <div className="absolute right5 top6">
          <button onClick={handleCloseModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.6] transition-all duration-75 ease hover:opacity-[0.8]">
            <div className="width-13 aspect-square">
              <MdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditEmailModal;
