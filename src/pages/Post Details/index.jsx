import React from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";

function PostDetailsPage() {
  return (
    <div className="custom-bg-8">
      <HeaderComp />
      {/* home content */}
      <div className="flex">
        <HomeLeftMenuComp />
        {/* width need to check later given different width than original */}
        <div className="width-17 grow-1 shrink-1 basis-auto">
          <div>
            {/* working */}
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
