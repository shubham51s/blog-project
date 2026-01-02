import React from "react";
import LoggedUserRightSection from "../../components/ProfileComp/RightSection/LoggedUserComp";
import { MdOutlineMoreHoriz } from "react-icons/md";

function ProfilePage() {
  return (
    <div className="width-18 m-auto flex justify-evenly">
      <main className="grow shrink basis-auto width-20 block">
        <div className="height-13 flex flex-col custom-bg-8">
          <div className="flex justify-center">
            <div className="min-w-0 w-full max-width-2 margin-12">
              <div className="margin56 margin54 boxShadow10">
                <div className="flex items-center justify-end flex-nowrap margin57">
                  <div className="w-full flex items-center">
                    <div className="grow shrink basis-auto flex items-center justify-start">
                      <div className="flex flex-nowrap">
                        <span className="letter-spacing-7 height-53 line-h-10 font-12 color16 padding50 break-all line-clamp-1 text-ellipsis font-bold overflow-hidden" style={{ paddingLeft: 0 }}>
                          shubhams1234
                        </span>
                      </div>
                    </div>
                    <div className="margin-13 flex" style={{ marginRight: 0 }}>
                      <button className="cursor-pointer m-0 p-0 color16 opacity-[0.75] transition-all duration-100 linear hover:opacity-100">
                        <div className="padding-23">
                          <div className="custom-h-2 aspect-square">
                            <MdOutlineMoreHoriz className="w-full h-full" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden boxShadow10"></div>
              </div>
            </div>
          </div>

          <div className="grow shrink-0 basis-auto"></div>
        </div>
      </main>
      <LoggedUserRightSection />
    </div>
  );
}

export default ProfilePage;
