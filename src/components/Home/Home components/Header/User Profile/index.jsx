import React from "react";

function ProfileHeaderComp() {
  return (
    <div>
      <button className="bg-transparent relative border-0 cursor-pointer p-0 m-0 flex items-center opacity-90 transition-all duration-300 ease-in-out hover:opacity-100">
        <div className="relative">
          <div className="relative">
            <img className="width-11 aspect-square rounded-full align-middle" src="https://miro.medium.com/v2/resize:fill:64:64/0*AbhaXOwX9-XpKPtX" alt="user profile image" />
          </div>
        </div>
      </button>
    </div>
  );
}

export default ProfileHeaderComp;
