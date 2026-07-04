import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { UserContext } from "../../../../context/userContext";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import ButtonSpinner from "../../ButtonSpinner";
import { showToast } from "../../../../utils/toaster";

function EditUsernameModal({ isShowModal, handleCloseModal }) {
  const { userInfo, fetchUpdatedUserDetails } = useContext(UserContext);
  const basePath = window.location.host;
  const { requestHandler } = useRequestHandler();
  const [username, setUsername] = useState(userInfo.username.split("@").join(""));
  const [currentUsername, setCurrentUsername] = useState(username);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inpRef = useRef(null);
  const searchTimeout = useRef(null);

  const handleUpdateUsername = async () => {
    setIsLoading(true);
    try {
      const params = { username: "@" + username };
      const response = await requestHandler("/users/update/username", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        const isSuccess = await fetchUpdatedUserDetails();

        if (isSuccess) {
          showToast("Username updated successfully.");
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

  const validateUsername = (username) => {
    if (!username) {
      setErrorMsg("Username is required");
      return false;
    }

    if (username.length < 3) {
      setErrorMsg("Username must be at least 3 characters");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!usernameRegex.test(username)) {
      setErrorMsg("Username can only contain letters, numbers, _ and .");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await requestHandler(`/users/check-username-availability/@${username}`);
      const result = await response.json();

      if (result?.data?.isAvailable) {
        setErrorMsg("");
      } else {
        setErrorMsg("Username is not available.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (val) => {
    if (val.includes("@")) return; // prevent @
    setUsername(val);

    const isValid = validateUsername(val);

    if (!isValid || val === currentUsername) return;

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      checkUsernameAvailability(val);
      searchTimeout.current = null;
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      inpRef.current?.focus();
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
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Username</h2>
        </div>

        <div className="margin51">
          <div className="color-3 custom-fs-1 line20 font-normal">
            <div className="w-full flex flex-col">
              <div className={`bdr22 border-solid bg-11 border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus ? "custom-bdr-3" : "border-transparent"}`}>
                <span className="color-4">@</span>
                <input ref={inpRef} disabled={isLoading} type="text" maxLength={30} value={username} onChange={(e) => handleInputChange(e.target.value)} onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-semibold" />
              </div>
              <div className="flex justify-between margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                {!errorMsg && <span className="font-4 color-4 grow shrink line20 font-normal">{`${basePath}/profile/@${username}`}</span>}
                {errorMsg && <span className="font-4 text-[#C94A4A] grow shrink line20 font-normal">{errorMsg}</span>}
                <span className="font-4 color-4 max-w-fit shrink-0 line20 font-normal">{`${username.length}/30`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="margin51">
          <div className="flex justify-end custom-gap-2">
            <button onClick={handleCloseModal} className="padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 font-normal m-0 bdr22 border-solid border-[#156d12] text-[#156d12] transition-all duration-75 ease opacity-[0.9] cursor-pointer hover:opacity-100">
              Cancel
            </button>

            <button onClick={handleUpdateUsername} disabled={currentUsername === username || isLoading || errorMsg} className={`flex items-center justify-center custom-gap-3 padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 bg-[#156d12] text-white font-normal m-0 bdr22 border-solid border-[#156d12] transition-all duration-75 ease ${currentUsername === username || isLoading || errorMsg ? "opacity-[0.6] cursor-default" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
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

export default EditUsernameModal;
