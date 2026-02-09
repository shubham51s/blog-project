import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function LibraryPage() {
  return (
    <div className="padding86" style={{ paddingTop: 0, paddingInline: 0 }}>
      <div className="flex justify-center">
        <div className="w-full max-width-2 min-w-0 margin-12">
          <div className="margin56 margin66">
            <div className="margin57">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-all line-clamp-1 text-ellipsis font-medium overflow-hidden color-3 m-0">Your library</h1>
                </div>
                <button className="text-center border-radius-9 bdr-3 border-[#1A8917] bg-[#1A8917] custom-px-2 padding59 text-white line-h-8 font-10 font-medium m-0">New list</button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="overflow-hidden flex items-center">
                <div className="w-full flex justify-start">
                  {/* map */}
                  <div className="min-w-max margin-3 bdr-7 padding-42" style={{ borderTop: 0, borderInline: 0 }}>
                    <Link to="" className="p-0 cursor-pointer no-underline">
                      <p className="color-3 custom-fs-1 line20 m-0 font-normal">
                        <span>Your lists</span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
