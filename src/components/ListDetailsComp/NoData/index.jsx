import React from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";

function NoData() {
  return (
    <div className="flex justify-center">
      <div className="min-w-0 w-full max-width-2 margin-12">
        <div className="padding68 padding69 text-center">
          <div className="padding55 bdr-8">
            <h3 className="font-10 color-4 line20 font-normal m-0">
              Add your favorite stories to your list. Simply click the{" "}
              <div className="custom-h-2 aspect-square inline-block mb-[-8px]">
                <MdOutlineBookmarkAdd className="w-full h-full" />
              </div>{" "}
              on any Medium story to get started.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoData;
