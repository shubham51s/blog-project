import React, { useContext } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import LoginSignupComp from "../../components/Authentication";
import HeaderComp from "../../components/Common/Header";
import MenuComp from "../../components/Common/Menu";

function MainComp() {
  const { pathname } = useLocation();
  const { isUserLoggedIn, isShowLoginPopup } = useContext(UserContext);

  const isEditDraftPage = !!useMatch("/p/:draftId/edit");
  const isUserSettingsPage = !!useMatch("/:slug/settings");
  const showHeader = pathname !== "/new-story" && !isEditDraftPage;
  const showMenu = pathname !== "/new-publication" && !isUserSettingsPage;

  if (!isUserLoggedIn) {
    return (
      <>
        {isShowLoginPopup && <LoginSignupComp />}
        <HomeDefaultComp />
      </>
    );
  }

  if (!showHeader) {
    return <Outlet />;
  }

  return (
    <div className="custom-bg-8">
      <HeaderComp />

      {showMenu ? (
        <div className="flex">
          <MenuComp />
          <div className="width-17 grow shrink basis-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default MainComp;
