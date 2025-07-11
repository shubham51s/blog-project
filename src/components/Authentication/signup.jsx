import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function SignupComp() {
  const [isShowPopup, setIsShowPopup] = useState(true);

  return (
    <div className="absolute z-[999] w-full custom-bg-6 h-screen flex items-center justify-center">
      <div className="relative bg-gray-500 width-5 custom-bg-2 rounded">
        <div className="absolute right-0 top-0 width-4 aspect-square flex items-center justify-center">
          <CloseIcon onclick={() => setIsShowPopup(false)} className="cursor-pointer w-[50%] opacity-75" />
        </div>
        <div className="py-12 px-20">
          <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-medium mb-8">Join Medium.</h3>
          <div>
            <label className="my-4">Name</label>
            <input className="w-full h-10 border border-black rounded-md px-4" placeholder="Enter your name" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComp;
