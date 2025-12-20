import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import LoginSignupComp from "../../components/Authentication";
import HeaderComp from "../../components/Common/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";
import { Outlet } from "react-router-dom";

function MainComp() {
  const { isUserLoggedIn, isShowLoginPopup } = useContext(UserContext);

  return (
    <>
      {!isUserLoggedIn && (
        <>
          {isShowLoginPopup && <LoginSignupComp />}
          <HomeDefaultComp />
        </>
      )}
      {isUserLoggedIn && (
        <div className="custom-bg-8">
          <HeaderComp />
          <div className="flex">
            <HomeLeftMenuComp />
            <div className="width-17 grow flex-shrink basis-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainComp;
