import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { UserContext } from "../../../../context/userContext";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import ButtonSpinner from "../../ButtonSpinner";
import { showToast } from "../../../../utils/toaster";

function EditProfileInfoModal({ isShowModal, handleCloseModal }) {
  const { userInfo, fetchUpdatedUserDetails } = useContext(UserContext);
  const nameRegex = /^[A-Za-z\s]+$/;
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState({
    firstName: false,
    lastName: false,
    bio: false,
  });
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    bio: false,
  });
  const [oldDetails, setOldDetails] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    bio: userInfo.bio || "",
  });

  const [user, setUser] = useState({ firstName: userInfo.firstName, lastName: userInfo.lastName, bio: userInfo.bio || "" });

  const handleUpdateUserInfo = async () => {
    setIsLoading(true);
    try {
      const params = {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
      };
      const response = await requestHandler("/users/update/basic-info", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        const isSuccess = await fetchUpdatedUserDetails();
        if (isSuccess) {
          showToast("User updated successfully.");
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

  const handleFocusChange = (type, isFocused) => {
    if (type === "firstName") {
      if (isFocused && !isFocus.firstName) {
        setIsFocus((prev) => ({ ...prev, firstName: true }));
      } else if (!isFocused && isFocus.firstName) {
        setIsFocus((prev) => ({ ...prev, firstName: false }));
      }
    }

    if (type === "lastName") {
      if (isFocused && !isFocus.lastName) {
        setIsFocus((prev) => ({ ...prev, lastName: true }));
      } else if (!isFocused && isFocus.lastName) {
        setIsFocus((prev) => ({ ...prev, lastName: false }));
      }
    }

    if (type === "bio") {
      if (isFocused && !isFocus.bio) {
        setIsFocus((prev) => ({ ...prev, bio: true }));
      } else if (!isFocused && isFocus.bio) {
        setIsFocus((prev) => ({ ...prev, bio: false }));
      }
    }
  };

  const validateFirstName = (value) => {
    const val = value.trim();
    if (!val) {
      setError((prev) => ({ ...prev, firstName: "Please enter your first name." }));
      return false;
    }

    if (!nameRegex.test(val)) {
      setError((prev) => ({
        ...prev,
        firstName: "First name can contain only letters.",
      }));
      return false;
    }

    setError((prev) => ({ ...prev, firstName: "" }));
    return true;
  };

  const validateLastName = (value) => {
    const val = value.trim();
    if (!val) {
      setError((prev) => ({ ...prev, lastName: "Please enter your last name." }));
      return false;
    }

    if (!nameRegex.test(val)) {
      setError((prev) => ({
        ...prev,
        lastName: "Last name can contain only letters",
      }));
      return false;
    }

    setError((prev) => ({ ...prev, lastName: "" }));
    return true;
  };

  const handleInputChange = (type, val) => {
    if (type === "firstName") {
      setUser((prev) => ({ ...prev, firstName: val }));
      const isValid = validateFirstName(val);
    }

    if (type === "lastName") {
      setUser((prev) => ({ ...prev, lastName: val }));
      validateLastName(val);
    }
  };

  const handleBioChange = (e) => {
    setUser((prev) => ({ ...prev, bio: e.target.value }));
    const el = e.target;
    el.style.height = "auto"; // reset height
    el.style.height = el.scrollHeight + "px"; // grow based on content
  };

  const isValid = () => {
    return !error.firstName && !error.lastName && !error.bio && (oldDetails.firstName !== user.firstName.trim() || oldDetails.lastName !== user.lastName.trim() || oldDetails.bio !== user.bio.trim());
  };

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
      <div className="width60 boxShadow6 padding70 relative border-radius-3 custom-bg-8 overflow-y-auto">
        <div className="text-center">
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Profile information</h2>
        </div>

        <div className="margin51">
          {/* profile photo */}
          <div className="margin54">
            <div className="w-full flex flex-col">
              <input type="text" className="hidden" />

              <div className="margin-10" style={{ marginTop: 0 }}>
                <label className="color-4 custom-fs-1 line20 font-normal">Photo</label>
              </div>

              <div className="flex">
                <button className="cursor-pointer p-0 m-0">
                  <div className="relative">
                    <img src={userInfo.profileImg} className="height76 aspect-square rounded-full" />
                    <div className="absolute top-0 boxShadow7 height76 aspect-square rounded-full"></div>
                  </div>
                </button>

                <div className="margin-12" style={{ marginRight: 0 }}>
                  <div className="margin-21 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                    <button className="cursor-pointer m-0 p-0">
                      <p className="text-[#1A8917] custom-fs-1 line20 font-normal m-0">Update</p>
                    </button>
                    <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
                      <button className="cursor-pointer m-0 p-0">
                        <p className="text-[#C94A4A] custom-fs-1 line20 font-normal m-0">Remove</p>
                      </button>
                    </div>
                  </div>
                  <p className="color-4 custom-fs-1 line20 font-normal m-0">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                </div>
              </div>
            </div>
          </div>

          {/* first name */}
          <div className="color-3 custom-fs-1 line20 font-normal margin-21" style={{ marginTop: 0, marginInline: 0 }}>
            <div className="w-full flex flex-col">
              <label className="margin68 color-3 font-medium" style={{ marginTop: 0 }}>
                First Name*
              </label>
              <div className={`bdr22 border-solid border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus.firstName ? "bg-10" : "bg-11"} ${isFocus.firstName && !error.firstName ? "custom-bdr-3" : `${error.firstName ? "border-[#c94a4a]" : "border-transparent"}`}`}>
                <input disabled={isLoading} type="text" maxLength={30} value={user.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} onFocus={() => handleFocusChange("firstName", true)} onBlur={() => handleFocusChange("firstName", false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-medium" />
              </div>
              <div className="flex justify-between margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                <span className="font-4 text-[#C94A4A] grow shrink line20 font-normal">{error.firstName}</span>
                <span className="font-4 color-4 max-w-fit shrink-0 line20 font-normal">{`${user.firstName.length}/30`}</span>
              </div>
            </div>
          </div>

          {/* last name */}
          <div className="color-3 custom-fs-1 line20 font-normal margin-21" style={{ marginTop: 0, marginInline: 0 }}>
            <div className="w-full flex flex-col">
              <label className="margin68 color-3 font-medium" style={{ marginTop: 0 }}>
                Last Name*
              </label>
              <div className={`bdr22 border-solid border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus.lastName ? "bg-10" : "bg-11"} ${isFocus.lastName && !error.lastName ? "custom-bdr-3" : `${error.lastName ? "border-[#c94a4a]" : "border-transparent"}`}`}>
                <input disabled={isLoading} type="text" maxLength={30} value={user.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} onFocus={() => handleFocusChange("lastName", true)} onBlur={() => handleFocusChange("lastName", false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-medium" />
              </div>
              <div className="flex justify-between margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                <span className="font-4 text-[#C94A4A] grow shrink line20 font-normal">{error.lastName}</span>
                <span className="font-4 color-4 max-w-fit shrink-0 line20 font-normal">{`${user.lastName.length}/30`}</span>
              </div>
            </div>
          </div>

          {/* bio */}
          <div className="color-3 custom-fs-1 line20 font-normal margin-21" style={{ marginTop: 0, marginInline: 0 }}>
            <div className="w-full flex flex-col">
              <label className="margin68 color-3 font-medium" style={{ marginTop: 0 }}>
                Short bio
              </label>
              <div className={`bdr22 border-solid border-radius-3 w-full flex padding-28 custom-px-2 transition-all duration-75 ease ${isFocus.bio ? "bg-10" : "bg-11"} ${isFocus.bio && !error.bio ? "custom-bdr-3" : `${error.bio ? "border-[#c94a4a]" : "border-transparent"}`}`}>
                <textarea disabled={isLoading} type="text" maxLength={160} value={user.bio} onChange={(e) => handleBioChange(e)} onFocus={() => handleFocusChange("bio", true)} onBlur={() => handleFocusChange("bio", false)} className="p-0 grow shrink basis-0 outline-none border-none w-full m-0 color-3 font-medium resize-none overflow-hidden" />
              </div>
              <div className="flex justify-between margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                <span className="font-4 text-[#C94A4A] grow shrink line20 font-normal">{error.bio}</span>
                <span className="font-4 color-4 max-w-fit shrink-0 line20 font-normal">{`${user.bio.length}/160`}</span>
              </div>
            </div>
          </div>

          {/* break line */}
          <div className="h-0 w-full bdr-5 margin-14" style={{ marginInline: 0, borderTop: 0, borderInline: 0 }}></div>

          {/* about */}
          <Link to={`/profile/${userInfo.username}/about`} className="w-full custom-fs-1 flex items-center justify-between no-underline text-left margin-14 color-4 cursor-pointer p-0 group" style={{ marginInline: 0 }}>
            <div className="w-full flex justify-between items-baseline">
              <div className="flex items-baseline">
                <div className="grow shrink basis-0">
                  <span className="color-3 custom-fs-1 line20 font-normal">About Page</span>
                  <div className="margin44 whitespace-pre-line">
                    <span className="font-4 color-4 line20 font-normal">Personalize with images and more to paint more of a vivid portrait of yourself than your ‘Short bio.’</span>
                  </div>
                </div>
              </div>
              <div className="inline-block margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
                <div className="width-19 aspect-square">
                  <GoArrowUpRight className="w-full h-full color-3 opacity-[0.75] transition-all duration-75 ease group-hover:opacity-[0.95]" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="margin51">
          <div className="flex justify-end custom-gap-2">
            <button onClick={handleCloseModal} className="padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 font-normal m-0 bdr22 border-solid border-[#156d12] text-[#156d12] transition-all duration-75 ease opacity-[0.9] cursor-pointer hover:opacity-100">
              Cancel
            </button>

            <button onClick={handleUpdateUserInfo} disabled={isLoading || !isValid()} className={`flex items-center justify-center custom-gap-3 padding-28 custom-px-2 line20 custom-fs-1 text-center border-radius-9 bg-[#156d12] text-white font-normal m-0 bdr22 border-solid border-[#156d12] transition-all duration-75 ease ${isLoading || !isValid() ? "opacity-[0.6] cursor-default" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
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

export default EditProfileInfoModal;
