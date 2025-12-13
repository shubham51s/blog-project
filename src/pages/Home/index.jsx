import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import HomePageProtected from "./Home Protected";
import LoginSignupComp from "../../components/Authentication";

function Homepage() {
  const { isUserLoggedIn, isShowLoginPopup } = useContext(UserContext);

  return (
    <>
      {!isUserLoggedIn && (
        <>
          {isShowLoginPopup && <LoginSignupComp />}
          <HomeDefaultComp />
        </>
      )}
      {isUserLoggedIn && <HomePageProtected />}
    </>
  );
}

export default Homepage;
