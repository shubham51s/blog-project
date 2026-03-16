import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function HeaderSection({ publication, setPublication }) {
  return (
    <div className="flex flex-col gap11 bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
      <div className="height-55 w-full custom-bg-8"></div>
      <div className="flex justify-center">
        <div className="w-full min-w-0 custom-max-w-1 custom-m-x-1">
          <div className="margin54 flex items-start">
            <div className="relative grow-0 shrink-0 custom-m-r">
              <img src={publication.profileImg} alt={publication.name} className="width70 aspect-square border-radius-5" />
              <div className="absolute top-0 width70 aspect-square border-radius-5 boxShadow7"></div>
            </div>

            <div className="grow flex flex-col custom-gap-5 custom-m-r">
              <div>
                <h2 className="letter-spacing10 line21 font15 font-semibold color-3 m-0">{publication.name}</h2>
              </div>
              <div className="flex items-center custom-fs-1">
                <Link to="" className="cursor-pointer m-0 p-0 color-3 line20 font-medium opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                  {publication.stats.followers} follower
                </Link>
                <span className="margin-9 color-4 line20 font-medium" style={{ marginBlock: 0 }}>
                  ·
                </span>
                <button className="cursor-pointer m-0 p-0 color-3 line20 font-medium opacity-[0.85] transition-all duration-75 ease hover:opacity-100">{publication.stats.editors} editor</button>
              </div>
            </div>

            <div className="grow-0 shrink-0">
              {publication.isFollowing && (
                <button className="flex items-center justify-center m-0 bdr17-hover padding-37 padding-38 border-radius-8 cursor-pointer transition-all duration-500 ease">
                  <span className="color-3 custom-fs-1 line20 w-full font-normal">Following</span>
                </button>
              )}
              {!publication.isFollowing && (
                <button className="flex items-center justify-center m-0 bdr17-hover padding-37 padding-38 border-radius-8 cursor-pointer transition-all duration-500 ease">
                  <span className="color-3 custom-fs-1 line20 w-full font-normal">Follow</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="min-w-0 flex justify-between custom-gap-2">
              <div className="grow shrink basis-auto"></div>
              <div className="margin-21 bdr-8 padding-7 grow-0 shrink-0 basis-auto" style={{ marginTop: 0, marginInline: 0, borderRight: 0, borderBlock: 0, paddingRight: 0 }}>
                <div className="flex">
                  <button className="cursor-pointer m-0 p-0">
                    <div className="flex custom-gap-1 items-center">
                      <p className="custom-fs-1 color-4 line20 font-normal m-0">Manage publication</p>
                      <div className="width84 aspect-square">
                        <IoIosArrowDown className="w-full h-full color-4" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
