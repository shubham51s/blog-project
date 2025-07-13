import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function SignupComp() {
  const { setIsShowSignupPopup, setIsShowLoginPopup } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
    gender: "",
  });

  const [validationErr, setValidationErr] = useState({
    name: false,
    email: false,
    pass: false,
    confirmPass: false,
    gender: false,
  });

  const handleNavigateToLogin = () => {
    setIsShowSignupPopup(false);
    setIsShowLoginPopup(true);
  };

  const handleCloseBtnClick = () => {
    setIsShowSignupPopup(false);
  };

  const handleEmailChange = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
    setValidationErr({ ...validationErr, email: false });
  };

  const handlePassChange = (e) => {
    setUserDetails({ ...userDetails, pass: e.target.value });
    setValidationErr({ ...validationErr, pass: false });
  };

  const handleConfirmPassChange = (e) => {
    setUserDetails({ ...userDetails, confirmPass: e.target.value });
    setValidationErr({ ...validationErr, confirmPass: false });
  };

  const handleGenderChange = (e) => {
    setUserDetails({ ...userDetails, gender: e.target.value });
    setValidationErr({ ...validationErr, gender: false });
  };

  const handleNameChange = (e) => {
    setUserDetails({ ...userDetails, name: e.target.value });
    setValidationErr({ ...validationErr, name: false });
  };

  const handleSubmitBtnClick = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidName = !nameRegex.test(userDetails.name);
    const isValidEmail = !emailRegex.test(userDetails.email);
    const isValidPassword = userDetails.pass.length < 4;
    const isValidConfirmPass = !isValidPassword && userDetails.pass !== userDetails.confirmPass;
    const isGenderSelected = userDetails.gender === "";

    setValidationErr({
      name: isValidName,
      email: isValidEmail,
      pass: isValidPassword,
      confirmPass: isValidConfirmPass,
      gender: isGenderSelected,
    });
  };

  return (
    <div className="absolute z-[999] w-full custom-bg-6 h-screen flex items-center justify-center">
      <div className="relative bg-gray-500 width-5 custom-bg-2 rounded">
        <div className="absolute right-0 top-0 width-4 aspect-square flex items-center justify-center">
          <CloseIcon onClick={handleCloseBtnClick} className="cursor-pointer w-[50%] opacity-75" />
        </div>
        <div className="padding-9 padding-8">
          <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-medium margin-7" style={{ marginTop: 0, marginInline: 0 }}>
            Join Medium.
          </h3>
          <div>
            <div>
              <div className="margin-6">
                <label htmlFor="name">Name</label>
              </div>
              <input onChange={(e) => handleNameChange(e)} id="name" className="w-full h-10 border border-black border-radius-1 padding-7" type="text" placeholder="Enter full name" />
              {validationErr.name && <p className="text-red-500 p-0 m-0">Please enter valid name</p>}
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="email">Email</label>
              </div>
              <input onChange={(e) => handleEmailChange(e)} id="email" className="w-full h-10 border border-black border-radius-1 padding-7" type="email" placeholder="Enter your email" />
              {validationErr.email && <p className="text-red-500 p-0 m-0">Please enter valid email address</p>}
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="password">Password</label>
              </div>
              <input onChange={(e) => handlePassChange(e)} id="password" className="w-full h-10 border border-black border-radius-1 padding-7" type="password" placeholder="Enter password" />
              {validationErr.pass && <p className="text-red-500 p-0 m-0">Please enter valid password</p>}
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="confirmPassowrd">Confirm password</label>
              </div>
              <input onChange={(e) => handleConfirmPassChange(e)} id="confirmPassowrd" className="w-full h-10 border border-black border-radius-1 padding-7" type="password" placeholder="Confirm password" />
              {!validationErr.pass && validationErr.confirmPass && <p className="text-red-500 p-0 m-0">Password did not match</p>}
            </div>
            <div>
              <div>
                <div className="margin-6 flex items-center">
                  <div className="margin-3 flex items-center">Gender:</div>
                  <label htmlFor="male" className="mr-3 flex items-center cursor-pointer">
                    <input onChange={(e) => handleGenderChange(e)} className="margin-9" style={{ marginBlock: 0, marginLeft: 0 }} id="male" name="gender" type="radio" value="male" />
                    Male
                  </label>
                  <label htmlFor="female" className="mr-3 flex items-center cursor-pointer">
                    <input onChange={(e) => handleGenderChange(e)} className="margin-9" style={{ marginBlock: 0 }} id="female" name="gender" type="radio" value="female" />
                    Female
                  </label>
                  <label htmlFor="other" className="flex items-center cursor-pointer">
                    <input onChange={(e) => handleGenderChange(e)} className="margin-9" style={{ marginBlock: 0 }} id="other" name="gender" type="radio" value="other" />
                    Other
                  </label>
                </div>
                {validationErr.gender && <p className="text-red-500 p-0 m-0">Please select gender</p>}
              </div>
              <div className="margin-6 flex items-center justify-center">
                <p className="margin-6 color-3 custom-line-h-1 m-0 font-normal custom-fs-1" style={{ marginBottom: 0 }}>
                  Already have an account?{" "}
                  <button onClick={handleNavigateToLogin} className="underline cursor-pointer m-0 p-0">
                    Sign in
                  </button>
                </p>
              </div>
              <div className="margin-8 tflex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
                <button onClick={handleSubmitBtnClick} className="padding-6 px-0 w-full bg-blue-800 font-normal color-5 font-9 rounded-full opacity-75 cursor-pointer transition-all ease-in-out duration-200 hover:opacity-100">
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

export default SignupComp;
