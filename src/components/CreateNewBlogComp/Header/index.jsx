import React from "react";
import { Link } from "react-router-dom";
import mediumLogo from "./../../../assets/images/mediumIconFull.png";

function WriteBlogHeader() {
  return (
    <div className="fixed z-[500] w-full font-10 color10 font-normal top-0 box-border bg13">
      <div className="relative width41 height-63 padding-14 mx-auto flex justify-between items-center" style={{ paddingBlock: 0 }}>
        <div className="relative z-[500] grow shink basis-auto flex justify-start items-center">
          <div>
            <Link className="border-0 no-underline p-0 m-0 flex items-center">
              <div className="flex">
                <img src={mediumLogo} alt="brand logo" className="width42 height64" />
              </div>
            </Link>
          </div>
        </div>

        <div className="relative z-[500] grow-0 shrink-0 basis-auto flex items-center"></div>
      </div>
    </div>
  );
}

export default WriteBlogHeader;
