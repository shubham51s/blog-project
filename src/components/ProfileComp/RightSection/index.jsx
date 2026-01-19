import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import FollowingComp from "./FollowingComp";
import ListComp from "./ListComp";
import { footerOptions } from "../../../constants/constant";
import { UserContext } from "../../../context/userContext";
import Skeleton from "react-loading-skeleton";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";

function RightSectionComp({ user, setUser }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(true);
  const [followingArr, setFollowingArr] = useState([]);
  const [loaders, setLoaders] = useState({
    toggleFollowLoader: false,
    followingListLoader: true,
  });

  const followUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));
    try {
      const params = {
        userToFollow: user._id,
      };
      const response = await requestHandler("/follow/follow-user", "POST", params);

      if (response?.status === 200) {
        setUser((prev) => ({ ...prev, isFollowing: true }));
        showToast(`Success! You're now following ${user.name}.`);
      } else {
        showToast("Some error occcured.");
      }

      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    } catch (err) {
      console.error(err);
      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
      showToast("Some error occured.");
    }
  };

  const unfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));
    try {
      const params = {
        userToUnfollow: user._id,
      };
      const response = await requestHandler("/follow/unfollow-user", "POST", params);

      if (response?.status === 200) {
        setUser((prev) => ({ ...prev, isFollowing: false }));

        showToast(`You unfollowed ${user.name}.`);
      } else {
        showToast("Some error occcured.");
      }

      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occcured.");
      setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
    }
  };

  const fetchFollowingList = async () => {
    if (user.followingCount <= 0) {
      setLoaders((prev) => ({ ...prev, followingListLoader: false }));
      return;
    }
    try {
      const response = await requestHandler(`/follow/following/${user._id}?skip=0&limit=5`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.following) {
        setFollowingArr(result.data.following);
      }

      setLoaders((prev) => ({ ...prev, followingListLoader: false }));
    } catch (err) {
      console.error(err);
      setLoaders((prev) => ({ ...prev, followingListLoader: false }));
    }
  };

  useEffect(() => {
    if (user && loaders.followingListLoader) fetchFollowingList();
  }, [user]);

  return (
    <div className="width-22 width-21 height-13 bdr-5 padding-24 padding75 box-border custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}>
      <div className="relative h-full inline-block w-full">
        <div className="sticky top-2">
          <div className="flex flex-col height-14">
            <div className="grow shrink-0 basis-auto">
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                {user && (
                  <div className="relative">
                    <img src={user.profileImg} alt={user.name} className="width74 aspect-square rounded-full" />
                    <div className="absolute top-0 width74 aspect-square rounded-full boxShadow9"></div>
                  </div>
                )}
                {!user && <Skeleton className="width74 aspect-square" circle />}
                <div className="flex items-baseline flex-wrap margin-37">
                  {user && (
                    <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">
                      <span className="padding50 break-all" style={{ paddingLeft: 0 }} title={user.name}>
                        {user.name}
                      </span>
                    </h2>
                  )}
                  {!user && <Skeleton width={120} height={20} />}
                </div>
                <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                  {user && (
                    <span className="line-h-8 font-10 color-3 font-medium">
                      <Link to="followers" className="cursor-pointer m-0 p-0 no-underline color-3 opacity-[0.8] transition-all duration-75 ease-in-out hover:opacity-100">
                        {user.followersCount} followers
                      </Link>
                    </span>
                  )}
                  {!user && <Skeleton width={60} height={14} />}
                </div>

                {user && user.bio && (
                  <div className="margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
                    <p className="color-4 custom-fs-1 line20 font-normal m-0">
                      <span className="break-all">{user.bio}</span>
                    </p>
                  </div>
                )}

                {/* if logged user is same as current user */}
                {user && user._id === userInfo._id && (
                  <div className="margin59 margin60">
                    <p className="text-[#1A8917] font-4 custom-line-h-1 font-medium m-0 p-0">
                      <Link to="/me/settings/account" className="cursor-pointer m-0 p-0 no-underline">
                        Edit profile
                      </Link>
                    </p>
                  </div>
                )}

                {/* if logged user and current user are not same */}
                {user && user._id !== userInfo._id && (
                  <div className="margin60 margin57 flex">
                    {user.isFollowing && (
                      <button onClick={unfollowUser} disabled={loaders.toggleFollowLoader} className={`bdr-7 padding-37 padding-38 border-radius-8 flex justify-center items-center custom-bg-3 ${loaders.toggleFollowLoader ? "cursor-default opacity-75" : "cursor-pointer opacity-100"}`}>
                        <span className="color-2 custom-fs-1 line20 font-normal flex items-center">Following</span>
                      </button>
                    )}
                    {!user.isFollowing && (
                      <button onClick={followUser} disabled={loaders.toggleFollowLoader} className={`bdr-7 padding-37 padding-38 border-radius-8 flex justify-center items-center custom-bg-3 ${loaders.toggleFollowLoader ? "cursor-default opacity-75" : "cursor-pointer opacity-100"}`}>
                        <span className="color-2 custom-fs-1 line20 font-normal flex items-center">Follow</span>
                      </button>
                    )}
                  </div>
                )}

                {followingArr.length > 0 && (
                  <div className="relative">
                    <span className="font-10 font-medium color-3 custom-line-h-1">Following</span>
                    <ul className="margin-21 p-0 list-none" style={{ marginInline: 0 }}>
                      {followingArr.map((item) => (
                        <FollowingComp item={item} key={item._id} />
                      ))}
                    </ul>
                    <p className="font-4 color-3 custom-line-h-1 font-normal m-0 opacity-[0.8] transition-all duration-75 ease-in-out hover:opacity-100">
                      <Link to="following" className="cursor-pointer m-0 p-0 no-underline">
                        {`See all (${user.followingCount})`}
                      </Link>
                    </p>
                  </div>
                )}
              </div>
              {/* reading list */}
              {user && user.publicLists?.length > 0 && (
                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <span className="font-10 font-medium color-3 line20">Lists</span>
                  <div className="margin-37"></div>

                  {user.publicLists.slice(0, 3).map((item) => (
                    <ListComp list={item} key={item._id} />
                  ))}
                  <p className="font-4 color-3 opacity-[0.85] line20 font-normal transition-all duration-75 ease-in-out hover:opacity-100">
                    <Link to="lists" className="cursor-pointer m-0 p-0 no-underline">
                      View All
                    </Link>
                  </p>
                </div>
              )}
            </div>
            {/* footer */}
            <div className="flex flex-wrap padding-3" style={{ paddingInline: 0 }}>
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
  );
}

export default RightSectionComp;
