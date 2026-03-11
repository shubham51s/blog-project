import React, { useContext, useState } from "react";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";

function SignoutSection() {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);

  const signoutAllSessions = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/users/logout-allSessions");
      const result = await response.json();

      if (response?.status === 200) {
        showToast("You have been signed out of all other sessions.");
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button disabled={isLoading} onClick={signoutAllSessions} className="w-full flex items-center justify-between text-left margin-14 color-3 custom-fs-1 cursor-pointer p-0 group" style={{ marginInline: 0 }}>
        <div className="flex w-full items-baseline justify-between">
          <div className="flex items-center">
            <div className="grow shrink basis-0">
              <span className="text-[#c03a3a] custom-fs-1 line20 font-normal">Sign out of all other sessions</span>
              <div className="whitespace-pre-line margin44">
                <span className="font-4 color-4 line20 font-normal">Sign out of sessions in other browsers or on other computers.</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default SignoutSection;
