import React, { useContext, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { UserContext } from "../../../context/userContext";
import { Tooltip } from "@mui/material";

function MoreOptionsComp({ blog, clapDetails, undoMyClaps }) {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="shrink-0 inline-block">
      <Popover.Root>
        <Popover.Trigger className="padding-6 padding-36 color-6 m-0 opacity-[0.65] transition-all duration-75 ease cursor-pointer hover:opacity-100">
          <Tooltip arrow placement="top" enterDelay={300} title="More">
            <div className="width-13 aspect-square">
              <MdOutlineMoreHoriz className="w-full h-full" />
            </div>
          </Tooltip>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" align="middle" sideOffset={1} className="z-[999] box-shadow-4 border-radius-3 custom-bg-8">
            {blog && (
              <div className="box-border overflow-hidden">
                {/* 1. if not logged in users story */}
                {blog.author._id !== userInfo._id && (
                  <ul className="width59 custom-px-2 flex flex-col items-stretch px-0 list-none m-0">
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0 flex">
                        <div className="grow-0 shrink-0 basis-auto margin-7" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <div className="width-13 aspect-square">
                            <CiCircleMinus className="w-full h-full" />
                          </div>
                        </div>
                        <div className="text-left">Show less like this</div>
                      </button>
                    </li>
                    <li className="custom-px-2">
                      <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Hide highlights</button>
                    </li>
                    {clapDetails.myClaps > 0 && (
                      <li onClick={undoMyClaps} className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                        <button className="m-0 p-0 cursor-pointer">Undo claps</button>
                      </li>
                    )}
                    <li className="custom-px-2">
                      <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Follow author</button>
                    </li>
                    <li className="custom-px-2">
                      <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Mute author</button>
                    </li>
                    <li className="padding59 custom-px-2 text-[#b80d0d] custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Report story</button>
                    </li>
                  </ul>
                )}

                {/* 2. if logged in users story */}
                {blog.author._id === userInfo._id && (
                  <ul className="width59 custom-px-2 flex flex-col items-stretch px-0 list-none m-0">
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Edit story</button>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Pin this story to your profile</button>
                    </li>
                    <li className="custom-px-2">
                      <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Story settings</button>
                    </li>
                    <li className="custom-px-2">
                      <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Hide responses</button>
                    </li>
                    <li className="padding59 custom-px-2 color-6 custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Submit to publication</button>
                    </li>
                    <li className="padding59 custom-px-2 text-[#b80d0d] custom-fs-1 font-normal opacity-[0.75] transition-all duration-75 ease cursor-pointer hover:opacity-100">
                      <button className="m-0 p-0 cursor-pointer">Delete story</button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default MoreOptionsComp;
