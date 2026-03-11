import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

function MutedSection() {
  return (
    <>
      <Link to="/me/settings/mute" className="w-full flex items-center justify-between text-left margin-14 color-3 custom-fs-1 cursor-pointer p-0 group" style={{ marginInline: 0 }}>
        <div className="flex w-full items-baseline justify-between">
          <div className="flex items-center">
            <div className="grow shrink basis-0">
              <span className="color-3 custom-fs-1 line20 font-normal">Muted writers and publications</span>
            </div>
          </div>

          <div className="inline-block margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="inline-flex items-center padding-6" style={{ paddingRight: 0, paddingBlock: 0 }}>
              <div className="margin-13" style={{ marginRight: 0 }}>
                <div className="width-19 aspect-square">
                  <GoArrowUpRight className="w-full h-full color-3 opacity-[0.75] transition-all duration-75 ease group-hover:opacity-[0.95]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MutedSection;
