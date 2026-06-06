import React from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import * as Popover from "@radix-ui/react-popover";

function PublicationListItem({ item }) {
  return (
    <>
      {item.publication && (
        <div className="flex justify-between margin-11" style={{ marginBottom: 0 }}>
          <Link to={`/publication/${item.publication.slug}`} className="cursor-pointer m-0 p-0">
            <div className="flex">
              <div className="relative shrink-0">
                <img loading="lazy" src={item.publication.profileImg} className="height-2 aspect-square rounded-full" />
                <div className="absolute top-0 height-2 aspect-square rounded-full boxShadow7"></div>
              </div>
              <div className="margin-12" style={{ marginRight: 0 }}>
                <div className="margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                  <h2 className="font-10 font-medium color-3 line20 m-0">
                    {item.publication.name} <span className="opacity-[0.7]">{`(${item.role.charAt(0).toUpperCase() + item.role.slice(1)})`}</span>
                  </h2>
                </div>
                <p className="height-15 line-clamp-2 color-4 custom-fs-1 line20 font-normal m-0">{item.publication.description}</p>
              </div>
            </div>
          </Link>
          <div>
            <Popover.Root>
              <Popover.Trigger className="cursor-pointer m-0 p-0">
                <div className="custom-h-2 aspect-square">
                  <FiMoreHorizontal className="w-full h-full" />
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content side="bottom" align="middle" sideOffset={2} className="box-shadow-4 z-[99999999]">
                  <div className="custom-bg-8 overflow-hidden">
                    <ul className="custom-px-2 flex flex-col items-stretch list-none m-0">
                      <li className="custom-px-2 padding59">
                        <Link to={`/${item.publication.slug}/settings`} className="cursor-pointer m-0 p-0">
                          <p className="color-3 custom-fs-1 font-normal line20 m-0 opacity-[0.9] transition-all duration-75 ease hover:opacity-100">Publication settings</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicationListItem;
