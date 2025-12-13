import React, { useEffect } from "react";
import HeaderComp from "../../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../../components/Home/Home components/Left Menu";
import HomeMainContentComp from "../../../components/Home/Home components/Home Main Content";
import HomeRightSectionComp from "../../../components/Home/Home components/Home Right Content";

function HomePageProtected() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="custom-bg-8">
      <HeaderComp />
      {/* home content */}
      <div className="flex">
        <HomeLeftMenuComp />
        <div className="width-17 grow flex-shrink basis-auto">
          <div className="width-18 m-auto flex justify-evenly">
            <HomeMainContentComp />
            <HomeRightSectionComp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageProtected;
