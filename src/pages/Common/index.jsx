import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import LoginSignupComp from "../../components/Authentication";
import HeaderComp from "../../components/Common/Header";
import { Outlet } from "react-router-dom";
import MenuComp from "../../components/Common/Menu";

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
          <div className="flex height-11">
            <MenuComp />
            <div className="width-17 grow shrink basis-auto h-full">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainComp;
