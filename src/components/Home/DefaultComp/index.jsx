import React from "react";
import logo from "../../../assets/images/mediumLogo.png";

function UnauthenticatedHome() {
  return (
    <div className="w-screen h-screen flex flex-col font-normal bg-[#F7F4ED]">
      <div className="flex-grow flex-shrink-0 basis-auto overflow-hidden custom-min-h-1 flex flex-col">
        <div className="transition-colors duration-300 ease-linear border border-[#242424] w-full">
          <div className="flex justify-center">
            <div className="my-0 custom-m-x-1 w-full">
              <div className="flex custom-h-1 custom-p-y-1 px-0 items-center">
                <div>
                  <span className="cursor-pointer m-0 p-0">
                    <img className="custom-h-2 w-auto" src={logo} />
                  </span>
                </div>
                <div className="grow flex-shrink-0 basis-auto"></div>
                <div className="flex items-center font-medium">
                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="text-[#242424] custom-fs-1 font-sans">
                        <span className="cursor-pointer m-0 p-0 ">Our story</span>
                      </p>
                    </div>
                  </div>
                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="text-[#242424] custom-fs-1 font-sans">
                        <span className="cursor-pointer m-0 p-0 ">Membership</span>
                      </p>
                    </div>
                  </div>
                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="text-[#242424] custom-fs-1 font-sans">
                        <span className="cursor-pointer m-0 p-0 ">Write</span>
                      </p>
                    </div>
                  </div>
                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="text-[#242424] custom-fs-1 font-sans">
                        <span className="cursor-pointer m-0 p-0 ">Sign in</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>
                      <a className="cursor-pointer m-0 p-0 text-white">
                        <button className="transition-colors duration-300 ease-linear text-center no-underline inline-block border rounded-full border-[#191919] bg-[#191919] fill-white text-white custom-px-2 custom-py-2 custom-line-h-1 custom-fs-1">Get started</button>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow w-full flex overflow-hidden justify-center items-center"></div>
      </div>
      {/* footer */}
      <div></div>
    </div>
  );
}

export default UnauthenticatedHome;
