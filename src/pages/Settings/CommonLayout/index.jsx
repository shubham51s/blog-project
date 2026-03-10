import React from "react";
import HeaderSection from "../../../components/Settings/HeaderSection";
import { Outlet } from "react-router-dom";

function CommonLayout() {
  return (
    <div className="flex m-auto justify-evenly width-18">
      <main className="grow shrink basis-auto width-20">
        <div className="flex justify-center">
          <div className="w-full min-w-0 max-width-2 margin-12">
            <div className="padding61">
              <HeaderSection />
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <div className="width-22 width-21 padding-24 padding75 height-13 bdr-5 custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}></div>
    </div>
  );
}

export default CommonLayout;
