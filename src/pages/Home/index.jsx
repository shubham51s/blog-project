import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import SignupComp from "../../components/Authentication/signup";

function Homepage() {
  const { isUserLoggedIn, isShowSignupPopup } = useContext(UserContext);

  return (
    <>
      {!isUserLoggedIn && (
        <>
          {isShowSignupPopup && <SignupComp />}
          <HomeDefaultComp />
        </>
      )}
    </>
  );
}

export default Homepage;
