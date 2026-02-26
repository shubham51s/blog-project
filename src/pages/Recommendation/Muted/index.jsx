import React from "react";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import RightSection from "../../../components/Recommendation/Common/RightSection";

function Muted() {
  return (
    <div className="flex m-auto justify-evenly width-18">
      <main className="grow shrink basis-auto width-20">
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-12">
            <div className="padding61">
              <NavSection />

              <div>
                {/* no data */}
                <div className="text-center padding-42">
                  <div className="padding-42 padding89">
                    <h2 className="font-10 font-medium color-3 line20 m-0">You haven't muted anything</h2>
                  </div>
                  <p className="color-4 custom-fs-1 line20 font-normal m-0">Writers and publications you've muted will appear here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="width-22 width-21 padding-24 padding75 height-13 bdr-5 custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}>
        <RightSection />
      </div>
    </div>
  );
}

export default Muted;
