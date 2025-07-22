import React from "react";

function HomeRightSectionComp() {
  const index = 3;
  return (
    <div className="width-22 width-21 height-13 bdr-5 padding-3 custom-bg-8 padding-24" style={{ borderRight: 0, borderBlock: 0, paddingBlock: 0 }}>
      <div className="relative inline-block h-full w-full">
        {/* position sticky & scroll need to check */}
        <div className="sticky top-2 mt-0">
          <div className="height-14 flex flex-col">
            <div className="flex-grow flex-shrink-0 basis-auto">
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="margin-17" style={{ marginTop: 0 }}>
                  <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                    <h2 className="font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Staff Picks</h2>
                  </a>
                </div>

                <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
                    <div className="h-full w-full">
                      <div className="flex items-center margin-7" style={{ marginTop: 0, marginInline: 0 }}>
                        <div className={`${index < 2 ? "margin-9" : ""}`} style={{ marginLeft: 0, marginBlock: 0 }}>
                          <a href="#" className="no-underline">
                            <div className="relative">
                              {/* dynamic */}
                              <img src="https://miro.medium.com/v2/resize:fill:40:40/1*53DFuQJAfFJSqUWkzDK6LA.png" alt="profile" className="border-radius-5 height-12 aspect-square align-middle" />
                              <div className="absolute border-radius-5 height-12 aspect-square top-0"></div>
                            </div>
                          </a>
                        </div>
                        {/* pending */}
                        <div className="padding-23 flex-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}></div>
                        <div></div>
                        <div className="padding-23" style={{ paddingBlock: 0 }}></div>
                        <div className=""></div>
                      </div>
                      <a href="#" className="cursor-pointer m-0 p-0 no-underline"></a>
                    </div>
                  </div>
                  <div className=""></div>
                  <div className=""></div>
                </div>

                <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0"></p>
              </div>

              {/* middle content */}
              <div className=""></div>
            </div>
            {/* footer */}
            <div className="flex padding-3 flex-wrap" style={{ paddingInline: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSectionComp;
