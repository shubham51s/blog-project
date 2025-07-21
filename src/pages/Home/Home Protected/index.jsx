import React from "react";
import HeaderComp from "../../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../../components/Home/Home components/Left Menu";

function HomePageProtected() {
  return (
    <div className="custom-bg-8">
      <HeaderComp />
      {/* home content */}
      <div className="flex">
        <HomeLeftMenuComp />
        <div className="width-17 flex-grow flex-shrink basis-auto">
          <div className="width-18 m-auto flex justify-evenly">
            {/* home middle section */}
            {/* home right section */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageProtected;
