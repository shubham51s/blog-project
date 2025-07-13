import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import SignupComp from "../../components/Authentication/signup";
import LoginComp from "../../components/Authentication/login";

function Homepage() {
  const { isUserLoggedIn, isShowSignupPopup, isShowLoginPopup } = useContext(UserContext);

  return (
    <>
      {!isUserLoggedIn && (
        <>
          {isShowSignupPopup && !isShowLoginPopup && <SignupComp />}
          {isShowLoginPopup && !isShowSignupPopup && <LoginComp />}
          <HomeDefaultComp />
        </>
      )}
    </>
  );
}

export default Homepage;
