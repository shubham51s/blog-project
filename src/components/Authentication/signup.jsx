import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function SignupComp() {
  return (
    <div className="absolute z-[999] w-full custom-bg-6 h-screen flex items-center justify-center">
      <div className="relative bg-gray-500 width-5 h-[75%] custom-bg-2 rounded">
        <div className="absolute right-0 top-0 width-4 aspect-square flex items-center justify-center">
          <CloseIcon className="cursor-pointer w-[50%] opacity-75" />
        </div>
        <div className="p-8 bg-red-400">
          <h3 className="letter-spacing-4 line-h-5 font-7 color-6 font-normal">Join Medium.</h3>
        </div>
      </div>
    </div>
  );
}

export default SignupComp;
