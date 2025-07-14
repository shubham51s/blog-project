import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function LoginComp() {
  const { setIsShowSignupPopup, setIsShowLoginPopup, setIsUserLoggedIn } = useContext(UserContext);

  const [isShowPass, setIsShowPass] = useState(false);

  const [userDetails, setUserDetails] = useState({
    email: "",
    pass: "",
  });

  const [validationErr, setValidationErr] = useState({
    email: false,
    pass: false,
  });

  const handleNavigateToSignup = () => {
    setIsShowLoginPopup(false);
    setIsShowSignupPopup(true);
  };

  const handleCloseBtnClick = () => {
    setIsShowLoginPopup(false);
  };

  const handleEmailChange = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
    setValidationErr({ ...validationErr, email: false });
  };

  const handlePassChange = (e) => {
    setUserDetails({ ...userDetails, pass: e.target.value });
    setValidationErr({ ...validationErr, pass: false });
  };

  const togglePasswordVisibility = (e, val) => {
    e.stopPropagation();
    setIsShowPass(val);
  };

  const handleSubmitBtnClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = !emailRegex.test(userDetails.email);
    const isValidPassword = userDetails.pass.length < 4;

    setValidationErr({
      email: isValidEmail,
      pass: isValidPassword,
    });

    if (!isValidEmail && !isValidPassword) {
      setIsUserLoggedIn(true);
    }
  };

  return (
    <div className="absolute z-[999] w-full custom-bg-6 h-screen flex items-center justify-center">
      <div id="loginPopupContainer" className="relative bg-gray-500 width-5 custom-bg-2 rounded">
        <div className="absolute right-0 top-0 width-4 aspect-square flex items-center justify-center">
          <CloseIcon onClick={handleCloseBtnClick} className="cursor-pointer w-[50%] opacity-75" />
        </div>
        <div className="padding-10 padding-8">
          <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-normal margin-8" style={{ marginTop: 0, marginInline: 0 }}>
            Welcome back.
          </h3>
          <div>
            <div>
              <div className="margin-10">
                <label htmlFor="email">Email</label>
              </div>

              <input onChange={(e) => handleEmailChange(e)} id="email" className="w-full height-2 border border-black border-radius-1 padding-7" type="email" placeholder="Enter email address" />
              {validationErr.email && <p className="color-9 p-0 m-0">Please enter valid email address</p>}
            </div>
            <div className="margin-11" style={{ marginBottom: 0, marginInline: 0 }}>
              <div className="margin-10">
                <label htmlFor="password">Password</label>
              </div>
              <div className="w-full height-2 relative">
                <input onChange={(e) => handlePassChange(e)} id="password" className="border w-full h-full border-black border-radius-1 padding-7" type={isShowPass ? "text" : "password"} placeholder="Enter password" />

                <div className="absolute right-0 top-0 bottom-0 aspect-square flex items-center justify-center">
                  {!isShowPass && <VisibilityIcon onClick={(e) => togglePasswordVisibility(e, true)} style={{ maxWidth: "50%", maxHeight: "50%", cursor: "pointer" }} />}
                  {isShowPass && <VisibilityOffIcon onClick={(e) => togglePasswordVisibility(e, false)} style={{ maxWidth: "50%", maxHeight: "50%", cursor: "pointer" }} />}
                </div>
              </div>
              {validationErr.pass && <p className="color-9 p-0 m-0">Please enter valid password</p>}
            </div>
            <div className="margin-11">
              <div className="flex items-center justify-center">
                <p className="margin-10 color-3 custom-line-h-1 m-0 font-normal custom-fs-1" style={{ marginBottom: 0 }}>
                  No account?{" "}
                  <button onClick={handleNavigateToSignup} className="underline cursor-pointer m-0 p-0">
                    Create one
                  </button>
                </p>
              </div>
              <div className="margin-8 flex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
                <button onClick={handleSubmitBtnClick} className="padding-6 px-0 w-full custom-bg-7 font-normal color-5 font-9 rounded-full opacity-75 cursor-pointer transition-all ease-in-out duration-200 hover:opacity-100">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
