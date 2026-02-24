import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import Skeleton from "react-loading-skeleton";
import { formatNumberCompact } from "../../../../utils/common";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";
import { UserContext } from "../../../../context/userContext";
import { FollowingContext } from "../../../../context/followingContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function FollowingComp({ item, user, setUser }) {
  const { followUser, unfollowUser } = useToggleUserFollow();
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const initialLoadingTimeout = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState(item);

  const toggleInitialLoader = () => {
    if (isInitialLoading) {
      if (!initialLoadingTimeout.current) {
        initialLoadingTimeout.current = setTimeout(() => {
          setIsInitialLoading(false);
        }, 500);
      }
    }
  };

  const handleFollowUser = async () => {
    setIsLoading(true);
    try {
      const isSuccess = await followUser(author.followee._id);

      if (isSuccess) {
        showToast(`Success! You're now following ${author.followee.name}.`);
        if (userInfo._id === user._id) {
          setUser((prev) => ({ ...prev, followingCount: prev.followingCount + 1 }));
        }
      } else {
        showToast("Some error occcured.");
      }
    } catch (err) {
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setIsLoading(true);
    try {
      const isSuccess = await unfollowUser(author.followee._id);

      if (isSuccess) {
        showToast(`You unfollowed ${author.followee.name}.`);

        if (userInfo._id === user._id) {
          setUser((prev) => ({ ...prev, followingCount: prev.followingCount > 0 ? prev.followingCount - 1 : 0 }));
        }
      } else {
        showToast("Some error occcured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occcured.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialLoadingTimeout.current) clearTimeout(initialLoadingTimeout.current);

    return () => {
      if (initialLoadingTimeout.current) clearTimeout(initialLoadingTimeout.current);
    };
  }, []);

  return (
    <li className="flex items-center justify-between">
      <Link to={`/profile/${author.followee.username}`} className="cursor-pointer m-0 p-0 no-underline">
        <div className="flex padding57">
          <div className="padding-15">
            <div className="relative">
              <img src={author.followee.profileImg} alt={author.followee.name} className="height-12 aspect-square rounded-full" />
              <div className="absolute top-0 height-12 aspect-square rounded-full boxShadow7"></div>
            </div>
          </div>
          <p className="height-6 overflow-hidden font-4 custom-line-h-1 font-normal m-0 text-ellipsis line-clamp-1 break-words color-3 opacity-[0.8] transition-all duration-75 ease-in-out hover:underline hover:opacity-[0.95]" title={author.followee.name}>
            {author.followee.name}
          </p>
        </div>
      </Link>
      <div className="inline-block">
        <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popover.Trigger onClick={toggleInitialLoader} className="border-radius-1 color-3 opacity-[0.75] padding-23 cursor-pointer m-0 transition-all duration-75 linear hover:bg-[#f2f2f2] hover:opacity-100">
            <div className="width-13 aspect-square">
              <MdOutlineMoreHoriz className="w-full h-full" />
            </div>
          </Popover.Trigger>
          <Popover.Content side="bottom" className="z-[700] mr-3" align="middle" sideOffset={1}>
            {!isInitialLoading && (
              <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                <div className="border-radius-4 overflow-hidden custom-bg-8">
                  <div className="boxShadow12 width75 padding-3 border-radius-3 flex flex-col">
                    <div className="flex items-end justify-between">
                      <Link to="" className="no-underline cursor-pointer">
                        <div className="relative">
                          <img src={author.followee.profileImg} alt={author.followee.name} className="width76 aspect-square box-border rounded-full" />
                          <div className="absolute top-0 width76 aspect-square rounded-full boxShadow7"></div>
                        </div>
                      </Link>
                      {!isFetchUserLoader && followingUsers[author.followee._id] && (
                        <button onClick={() => handleUnfollowUser()} disabled={isLoading} title={`Following ${author.followee.name}`} className={`flex items-center justify-center bdr17-hover padding-20 padding-28 border-radius-7 m-0 color-3 custom-fs-1 custom-line-h-1 font-medium transition-all duration-500 ease-in ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}>
                          Following
                        </button>
                      )}
                      {!isFetchUserLoader && !followingUsers[author.followee._id] && (
                        <button onClick={() => handleFollowUser()} disabled={isLoading} title={`Follow ${author.followee.name}`} className={`flex items-center justify-center bdr17-hover padding-20 padding-28 border-radius-7 m-0 color-3 custom-fs-1 custom-line-h-1 font-medium transition-all duration-500 ease-in ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}>
                          Follow
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
                      <Link to="" className="no-underline cursor-pointer">
                        <div className="flex flex-wrap items-baseline">
                          <span className="break-words line-clamp-2 height-15 padding-23 text-ellipsis font-10 font-semibold color-3 overflow-hidden line20" style={{ paddingLeft: 0, paddingBlock: 0 }} title={author.followee.name}>
                            {author.followee.name}
                          </span>
                        </div>
                      </Link>
                      <div className="margin44">
                        <Link to="" className="cursor-pointer m-0 p-0 no-underline group">
                          <span className="color-3 font-4 line20 font-normal">{formatNumberCompact(author.followee.followersCount)}</span>
                          <span className="color-3 font-4 line20 font-normal opacity-[0.8] group-hover:opacity-100"> followers</span>
                        </Link>
                      </div>
                    </div>

                    {author.followee.bio && (
                      <div className="padding-33" style={{ paddingBottom: 0, paddingInline: 0 }}>
                        <p className="line-clamp-4 height76 text-ellipsis color-3 overflow-hidden font-4 line20 font-normal m-0">
                          <span className="break-words" title={author.followee.bio}>
                            {author.followee.bio}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {isInitialLoading && (
              <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                <div className="border-radius-4 overflow-hidden custom-bg-8">
                  <div className="boxShadow12 width75 padding-3 border-radius-3 flex flex-col">
                    <div className="flex items-end justify-between">
                      <Link to="" className="no-underline cursor-pointer">
                        <div className="relative">
                          <div className="width76 aspect-square rounded-full">
                            <Skeleton circle className="w-full h-full" />
                          </div>
                        </div>
                      </Link>
                      <button className="flex items-center justify-center border-radius-7 cursor-pointer m-0 color-3 custom-fs-1 custom-line-h-1 font-medium transition-all duration-500 ease-in w-[55%] overflow-hidden">
                        <Skeleton height={35} width={34343} />
                      </button>
                    </div>

                    <div className="flex flex-col margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
                      <div className="flex flex-wrap items-baseline w-[60%] overflow-hidden">
                        <Skeleton height={22} width={34343} />
                      </div>
                      <div className="margin44 w-[44%] overflow-hidden">
                        <Skeleton height={12} width={34343} />
                      </div>
                    </div>

                    <div className="padding-33 w-[100%] overflow-hidden" style={{ paddingBottom: 0, paddingInline: 0 }}>
                      <Skeleton height={12} width={34343} />
                      <Skeleton height={12} width={34343} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Popover.Content>
        </Popover.Root>
      </div>
    </li>
  );
}

export default FollowingComp;
