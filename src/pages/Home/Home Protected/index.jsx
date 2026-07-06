import React, { useEffect } from "react";
import HomeMainContentComp from "../../../components/Home/Home components/Home Main Content";
import HomeRightSectionComp from "../../../components/Home/Home components/Home Right Content";

function HomePageProtected() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="width-18 m-auto flex justify-evenly h-full">
      <HomeMainContentComp />
      <HomeRightSectionComp />
    </div>
  );
}

export default HomePageProtected;
