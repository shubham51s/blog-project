import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PiHandsClappingThin } from "react-icons/pi";
import { Link } from "react-router-dom";

function ShowClapsComp({ clapDetails, setClapDetails }) {
  const [isClose, setIsClose] = useState(false);
  const closeTimeout = useRef(null);

  const handleClose = () => {
    setIsClose(true);

    if (closeTimeout.current) clearTimeout(closeTimeout.current);

    closeTimeout.current = setTimeout(() => {
      setClapDetails((prev) => ({ ...prev, isShowClapsComp: false }));
    }, 300);
  };

  useEffect(() => {
    console.log("mounted");
  });

  return (
    <div onClick={() => handleClose()} className={`fixed inset-0 overflow-x-hidden overflow-y-auto flex justify-center items-center bg13 scroll-smooth z-[800] transition-all duration-300 linear ${isClose ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
      <div className="my-auto padding64">
        <div onClick={(e) => e.stopPropagation()} className="width63 padding-44">
          <div className="margin-17 text-center flex flex-col" style={{ marginTop: 0 }}>
            <h2 className="font-3 line-h-8 font-semibold tracking-normal color-3 m-0">${`161 claps from 49 people for " My experience of interview preparation as MLE"`}</h2>
          </div>
          <div className="">
            {/* list */}
            <div className="padding-33 flex items-start justify-between" style={{ paddingInline: 0 }}>
              <div className="width64 flex items-start">
                <div className="padding-7" style={{ paddingLeft: 0 }}>
                  <div className="relative height-2 aspect-square">
                    <img src="https://miro.medium.com/v2/resize:fill:80:80/1*eSdGhVPDHM0RPnZjeYTNTQ.jpeg" className="box-border rounded-full align-middle" />
                    <div className="absolute inset-0 aspect-square rounded-full border-0 boxShadow7"></div>
                    <span className="absolute padding-36 left4 bg-[#1a8917] border-radius11 bottom-0 color-2 text-center">
                      <div className="height-4 aspect-square">
                        <PiHandsClappingThin className="w-full h-full" />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <Link className="cursor-pointer m-0 p-0 no-underline">
                    <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0">Sanskruti Raut</h2>
                  </Link>
                  <p className="font-4 color-4 custom-line-h-1 font-medium m-0 p-0">MS in EE from USC, Los Angeles | Former Analyst @ Deloitte USI | B. Tech in ECE from MITWPU, Pune.</p>
                </div>
              </div>

              <div className="padding50 width65 text-right" style={{ paddingRight: 0 }}>
                <div className="inline-block">
                  <button className="bdr-7 padding-20 padding-28 width-24 border-radius-7 flex justify-center cursor-pointer items-center m-0">
                    <span className="color-3 w-full custom-fs-1 custom-line-h-1 font-medium">
                      <span className="inline-block break-keep">Follow</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex self-start grow-0 shrink-0 basis-auto relative bg-red-500"> */}
      <div className="absolute top7 right6">
        <div className="absolute topRight1">
          <button className="cursor-pointer m-0 p-0 width58 aspect-square color-6 transition-all duration-200 linear opacity-[0.45] hover:opacity-[0.55]">
            <IoMdClose className="w-full h-full" />
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ShowClapsComp;
