import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import FollowingComp from "./FollowingComp";
import ListComp from "./ListComp";
import { footerOptions } from "../../../constants/constant";
import { IoIosArrowDown } from "react-icons/io";

function RightSectionComp({ user }) {
  const [isFollowing, setIsFollowing] = useState(true);
  const [loaders, setLoaders] = useState({
    isFollowLoader: false,
  });

  const handleUnfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, isFollowLoader: true }));
    try {
      setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
      setIsFollowing(false);
    } catch (err) {
      setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
      console.error(err);
    }
  };

  const handleFollowUser = async () => {
    setLoaders((prev) => ({ ...prev, isFollowLoader: true }));
    try {
      setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
      setIsFollowing(true);
    } catch (err) {
      setLoaders((prev) => ({ ...prev, isFollowLoader: false }));
      console.error(err);
    }
  };

  return (
    <>
      {user && (
        <div className="width-22 width-21 height-13 bdr-5 padding-24 padding75 box-border custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}>
          <div className="relative h-full inline-block w-full">
            <div className="sticky top-2">
              <div className="flex flex-col height-14">
                <div className="grow shrink-0 basis-auto">
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div className="relative">
                      <img src={user.profileImg} alt={user.name} className="width74 aspect-square rounded-full" />
                      <div className="absolute top-0 width74 aspect-square rounded-full boxShadow9"></div>
                    </div>
                    <div className="flex items-baseline flex-wrap margin-37">
                      <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">
                        <span className="padding50 break-all" style={{ paddingLeft: 0 }} title={user.name}>
                          {user.name}
                        </span>
                      </h2>
                    </div>
                    <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                      <span className="line-h-8 font-10 color-3 font-medium">
                        <Link to="followers" className="cursor-pointer m-0 p-0 no-underline color-3 opacity-[0.8] transition-all duration-75 ease-in-out hover:opacity-100">
                          {user.followersCount} followers
                        </Link>
                      </span>
                    </div>
                    {/* for current user */}
                    <div className="margin59 margin60 hidden">
                      <p className="text-[#1A8917] font-4 custom-line-h-1 font-medium m-0 p-0">
                        <Link to="/me/settings/account" className="cursor-pointer m-0 p-0 no-underline">
                          Edit profile
                        </Link>
                      </p>
                    </div>

                    {/* for other user */}
                    <div className="margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
                      <p className="color-4 custom-fs-1 line20 font-normal m-0">
                        <span className="break-all">I write about creativity, loving, language learning and psycho/spirituality. I’m a longtime painter and reader.</span>
                      </p>
                    </div>

                    <div className="margin60 margin57 flex">
                      {isFollowing && (
                        <button onClick={handleUnfollowUser} disabled={loaders.isFollowLoader} className="bdr-7 padding-37 padding-38 border-radius-8 flex justify-center items-center cursor-pointer custom-bg-3">
                          <span className="color-2 custom-fs-1 line20 font-normal flex items-center">Following</span>
                        </button>
                      )}
                      {!isFollowing && (
                        <button onClick={handleFollowUser} disabled={loaders.isFollowLoader} className="bdr-7 padding-37 padding-38 border-radius-8 flex justify-center items-center cursor-pointer custom-bg-3">
                          <span className="color-2 custom-fs-1 line20 font-normal flex items-center">Follow</span>
                        </button>
                      )}
                    </div>

                    <div className="relative">
                      <span className="font-10 font-medium color-3 custom-line-h-1">Following</span>
                      <ul className="margin-21 p-0 list-none" style={{ marginInline: 0 }}>
                        {/* map */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FollowingComp key={i} />
                        ))}
                      </ul>
                      {/* {user.followingCount > 5 && ( */}
                      <p className="font-4 color-3 custom-line-h-1 font-normal m-0 opacity-[0.8] transition-all duration-75 ease-in-out hover:opacity-100">
                        <Link to="following" className="cursor-pointer m-0 p-0 no-underline">
                          {`See all (${user.followingCount})`}
                        </Link>
                      </p>
                      {/* )} */}
                    </div>
                  </div>
                  {/* reading list */}
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <span className="font-10 font-medium color-3 line20">Lists</span>
                    <div className="margin-37"></div>
                    {/* map */}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <ListComp key={i} />
                    ))}
                    <p className="font-4 color-3 opacity-[0.85] line20 font-normal transition-all duration-75 ease-in-out hover:opacity-100">
                      <Link to="lists" className="cursor-pointer m-0 p-0 no-underline">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
                {/* footer */}
                <div className="flex flex-wrap padding-3" style={{ paddingInline: 0 }}>
                  {/* map */}
                  {footerOptions.map((item) => (
                    <div className="margin-24" style={{ marginLeft: 0, marginBlock: 0 }} key={item.id}>
                      <Link to={item.path} className="cursor-pointer m-0 p-0 no-underline">
                        <p className="line-h-7 font-8 color-4 font-normal m-0">{item.name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!user && <div className="width-22 width-21 height-13 bdr-5 padding-24 padding75 box-border custom-bg-8"></div>}
    </>
  );
}

export default RightSectionComp;
