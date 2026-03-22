import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import HomeDefaultComp from "../../components/Home/DefaultComp";
import LoginSignupComp from "../../components/Authentication";
import HeaderComp from "../../components/Common/Header";
import { Outlet, useLocation, useParams } from "react-router-dom";
import MenuComp from "../../components/Common/Menu";

function MainComp() {
  const { pathname } = useLocation();
  const { isUserLoggedIn, isShowLoginPopup, isInitialLoading } = useContext(UserContext);
  const [isMenu, setIsMenu] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const path = pathname.split("/").join("");

    if (path === "new-publication" && isMenu) {
      setIsMenu(false);
    } else if (slug && pathname.includes("/settings") && isMenu) {
      setIsMenu(false);
    } else {
      if (!isMenu) setIsMenu(true);
    }
  }, [pathname]);

  return (
    <>
      {!isUserLoggedIn && (
        <>
          {isShowLoginPopup && <LoginSignupComp />}
          <HomeDefaultComp />
        </>
      )}
      {!isInitialLoading && isUserLoggedIn && (
        <div className="custom-bg-8">
          <HeaderComp />

          {isMenu && (
            <div className="flex height-11">
              <MenuComp />
              <div className="width-17 grow shrink basis-auto h-full">
                <Outlet />
              </div>
            </div>
          )}

          {!isMenu && <Outlet />}
        </div>
      )}
    </>
  );
}

export default MainComp;
