import React from "react";
import { Link } from "react-router-dom";

function NoData() {
  return (
    <div className="margin51">
      <div className="flex justify-center">
        <div className="w-full min-w-0 custom-max-w-1 custom-m-x-1">
          <div className="mx-auto">
            <div className="padding71 width-27 mx-auto text-center">
              <div className="margin54">
                <h3 className="font-10 color-3 line20 font-normal m-0">This publication does not have any stories yet.</h3>
              </div>
              <p className="color-3 custom-fs-1 line20 font-normal m-0">
                <Link to="" className="cursor-pointer m-0 p-0 underline">
                  View recommended publications
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoData;
