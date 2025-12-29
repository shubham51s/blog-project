import React from "react";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaHandsClapping } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { IoIosLink } from "react-icons/io";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";

function BlogComp({ item }) {
  return (
    <tr className="bdr-5" style={{ borderInline: 0, borderBottom: 0 }}>
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="w-full min-w-0 overflow-hidden relative cursor-pointer">
          <div className="margin58 width69 flex items-start custom-gap-2" style={{ marginLeft: 0, marginBlock: 0 }}>
            <div>
              <div className="relative z-[2] cursor-pointer m-0 p-0 height-54 width70">
                <img src={item.previewImg} alt={item.name} className="w-full object-cover object-center aspect-[3/2] border-radius-5 align-middle" />
              </div>
            </div>
            <div className="w-full flex items-stretch justify-between custom-gap-3">
              <div className="w-full flex flex-col items-start gap10">
                <div className="w-full break-all min-w-0">
                  <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0 p-0">{item.previewTitle}</h2>
                </div>
                <div className="w-full flex flex-col gap10">
                  <div className="flex items-center custom-gap-1">
                    <div className="flex items-center flex-wrap">
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">Published {formatMonthAndDayShort(item.createdAt)}</p>
                      <div className="padding-23 custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingBlock: 0 }}>
                        .
                      </div>
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">{item.readingTime} min read</p>
                      <div className="padding-23 custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingBlock: 0 }}>
                        .
                      </div>
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">Updated {formatMonthAndDayShort(item.updatedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-start custom-gap-2">
                    <div className="flex items-center custom-gap-1">
                      <div className="width-19 aspect-square">
                        <FaHandsClapping className="w-full h-full opacity-75" />
                      </div>
                      <p className="font-4 custom-line-h-1 font-normal m-0 p-0">{item.clapsCount}</p>
                    </div>
                    <div className="flex items-center custom-gap-1">
                      <div className="width-19 aspect-square">
                        <TbMessageCircleFilled className="w-full h-full opacity-75" />
                      </div>
                      <p className="font-4 custom-line-h-1 font-normal m-0 p-0">{item.commentCount}</p>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* publication */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden"></div>
      </td>

      {/* status */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden"></div>
      </td>

      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden flex justify-end">
          <Popover.Root>
            <Popover.Trigger className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100">
              <div className="width-13 aspect-square">
                <MdMoreHoriz className="w-full h-full" />
              </div>
            </Popover.Trigger>
            <Popover.Content side="bottom" className="z-[999]" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
              <div className="border-radius-3 overflow-hidden boxShadow11 custom-bg-8 margin-35" style={{ marginLeft: 0, marginBlock: 0 }}>
                <ul className="width71 custom-px-2 flex flex-col items-stretch list-none px-0 font-medium">
                  <li className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                    <button className="cursor-pointer p-0 m-0 flex items-center">
                      <div className="width-13 aspect-square">
                        <IoIosLink className="w-full h-full" />
                      </div>
                      <div className="margin-13" style={{ marginRight: 0 }}>
                        Copy link
                      </div>
                    </button>
                  </li>
                  <li className="custom-px-2">
                    <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                  </li>
                  <li className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                    <span className="cursor-pointer m-0 p-0">Edit story</span>
                  </li>
                  <li className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                    <span className="cursor-pointer m-0 p-0">Submit to publication</span>
                  </li>
                  <li className="custom-px-2">
                    <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                  </li>
                  <li className="custom-px-2 padding59 custom-fs-1 text-[#c94a4a] transition-all duration-200 linear hover:text-[#b63636] font-normal">
                    <span className="cursor-pointer m-0 p-0">Delete story</span>
                  </li>
                </ul>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </td>
    </tr>
  );
}

export default BlogComp;
