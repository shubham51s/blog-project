import React from "react";

function HomeRightSectionComp() {
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

                <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}></div>

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
