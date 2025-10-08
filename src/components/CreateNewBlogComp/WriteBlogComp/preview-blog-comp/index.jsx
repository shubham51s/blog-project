import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function PreviewBlogComp() {
  return (
    <div className="custom-bg-8 fixed overflow-auto text-center top-0 left-0 bottom-0 right-0 flex z-[900] w-full p-0 m-0 border-0">
      <div className="m-auto overflow-hidden padding54 padding53 width57 relative">
        <div className="color13 margin42" style={{ marginInline: 0, marginTop: 0 }}>
          <div className="flex">
            <button className="absolute top-0 right-0 padding44 text-left align-baseline inline-block color-6 custom-bg-8 font-10 cursor-pointer select-none box-border font-normal transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
              <div className="width58 aspect-square">
                <IoCloseOutline className="w-full h-full" />
              </div>
            </button>

            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto">
              <p className="font14 font-bold line-h-8 color11 margin-10 p-0 transition-all duration-200 ease-in-out opacity-75 hover:opacity-100" style={{ marginTop: 0, marginInline: 0 }}>
                Story Preview
              </p>

              <div className="bg15 w-full">
                <div className="height67 relative">
                  <button className="inline-block height68 absolute positionCenter line-h11 padding-38 bdr12 border-radius-9 whitespace-nowrap font-10 text-center align-bottom cursor-pointer select-none box-border font-normal bg16 color-2">Change preview image</button>
                  <div>
                    <img src="https://cdn-images-1.medium.com/fit/c/880/400/1*En4Eq_T7gcTS9F-9aZXqwQ.png" alt="" className="w-full height67" />
                  </div>
                </div>
                {/* working */}
                <div className="bg15 relative"></div>
              </div>

              <div className="w-full margin46" style={{ marginBottom: 0, marginInline: 0 }}></div>

              <p className="font-10 font-normal custom-line-h-1 color10 margin-11 margin47 p-0" style={{ marginInline: 0 }}></p>
            </div>

            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBlogComp;
