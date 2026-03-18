import React from "react";
import ListItem from "./ListItem";

function RightSection() {
  return (
    <div className="width-22 width-21 padding-24 padding75 custom-bg-8 min-h-full bdr-5" style={{ borderRight: 0, borderBlock: 0 }}>
      <div className="relative inline-block w-full h-full">
        <div className="sticky top-2">
          <div className="min-h-full flex flex-col">
            <div className="grow shrink-0 basis-auto">
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="padding-42">
                  <div className="relative">
                    <img src="https://miro.medium.com/v2/resize:fill:176:176/1*P4EG7xT11E1Rsoy4tHoMKA.png" alt="" className="width74 aspect-square rounded-full" />
                    <div className="absolute top-0 width74 aspect-square rounded-full boxShadow7"></div>
                  </div>
                </div>
                <div className="padding-42">
                  <p className="custom-fs-1 color-4 line20 font-normal m-0">
                    <span className="break-words">For latest technology related content</span>
                  </p>
                </div>
                <div className="padding-42">
                  {false && (
                    <button className="bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer flex justify-center items-center m-0 transition-all duration-500 ease">
                      <span className="w-full font-normal color-3 custom-fs-1 line20">Following</span>
                    </button>
                  )}
                  {true && (
                    <button className="bdr-7 padding-38 padding-37 custom-bg-3 border-radius-8 cursor-pointer flex justify-center items-center m-0 transition-all duration-500 ease">
                      <span className="w-full font-normal color-2 custom-fs-1 line20">Follow</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                <div>
                  <div className="padding-42">
                    <h2 className="font-10 color-3 line20 m-0 font-medium"></h2>
                  </div>
                </div>
                <div>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ListItem key={index} />
                  ))}
                </div>
              </div>
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
