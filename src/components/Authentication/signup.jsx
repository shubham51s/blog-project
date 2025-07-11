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
            <div>
              <div className="margin-6">
                <label htmlFor="name">Name</label>
              </div>
              <input id="name" className="w-full h-10 border border-black border-radius-1 padding-7" type="text" placeholder="Enter full name" />
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="email">Email</label>
              </div>
              <input id="email" className="w-full h-10 border border-black border-radius-1 padding-7" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="password">Password</label>
              </div>
              <input id="password" className="w-full h-10 border border-black border-radius-1 padding-7" type="password" placeholder="Enter password" />
            </div>
            <div>
              <div className="margin-6">
                <label htmlFor="confirmPassowrd">Confirm password</label>
              </div>
              <input id="confirmPassowrd" className="w-full h-10 border border-black border-radius-1 padding-7" type="password" placeholder="Confirm password" />
            </div>
            <div>
              <div className="margin-6 flex items-center">
                <div className="margin-3 flex items-center">Gender:</div>
                <label htmlFor="male" className="mr-3 flex items-center cursor-pointer">
                  <input className="mr-2" id="male" name="gender" type="radio" value="male" />
                  Male
                </label>
                <label htmlFor="female" className="mr-3 flex items-center cursor-pointer">
                  <input className="mx-2" id="female" name="gender" type="radio" value="female" />
                  Female
                </label>
                <label htmlFor="other" className="flex items-center cursor-pointer">
                  <input className="mx-2" id="other" name="gender" type="radio" value="other" />
                  Other
                </label>
              </div>
              <div className="mt-5 flex items-center w-full justify-center">
                <button className="padding-6 px-0 w-full bg-blue-800 font-normal color-5 font-9 rounded-full opacity-75 cursor-pointer transition-all ease-in-out duration-200 hover:opacity-100">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComp;
