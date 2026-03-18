import React from "react";
import { Link } from "react-router-dom";

function ListItem() {
  return (
    <>
      <div className="relative">
        <div className="flex justify-between">
          <div className="w-full flex">
            <div className="margin-3">
              <div className="relative">
                <img src="	https://miro.medium.com/v2/resize:fill:96:96/0*iGq2_L7nJ-ZxCRNM" alt="" className="width-15 aspect-square rounded-full" />
                <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
              </div>
            </div>
            <div className="w-full width89 flex flex-col">
              <div className="flex justify-between">
                <div>
                  <div>
                    <Link to="" className="cursor-pointer m-0 p-0">
                      <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                        <h2 className="line-clamp-2 height-15 font-10 font-medium color-3 line20 m-0">shubhams1234</h2>
                      </div>
                    </Link>
                  </div>
                  <p className="font-4 color-4 line20 font-normal m-0">2 followers</p>
                </div>
              </div>
              <div className="margin68" style={{ marginBottom: 0 }}>
                <p className="custom-fs-1 color-4 line20 font-normal m-0">Software developer</p>
              </div>
            </div>
          </div>

          <div className="margin-13 padding-33" style={{ marginRight: 0, paddingBottom: 0, paddingInline: 0 }}>
            <button className="padding-20 padding-28 border-radius-7 cursor-pointer m-0 bdr-7">
              <span className="color-3 custom-fs-1 line20 font-normal">Follow</span>
            </button>
          </div>
        </div>
      </div>
      <div className="margin71 h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
    </>
  );
}

export default ListItem;
