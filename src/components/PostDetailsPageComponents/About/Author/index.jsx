import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { FollowingContext } from "../../../../context/followingContext";
import { useToggleUserFollow } from "../../../../hooks/toggleUserFollow";

function AuthorSection({ author }) {
  const { followingUsers, isFetchUserLoader } = useContext(FollowingContext);
  const { userInfo } = useContext(UserContext);
  const { followUser, unfollowUser } = useToggleUserFollow();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: author._id,
        name: author.name,
      };
      await followUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        _id: author._id,
        name: author.name,
      };
      await unfollowUser(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start">
      <div className="margin-18 flex justify-between" style={{ marginLeft: 0 }}>
        <div className="">
          <Link to={`/profile/${author.username}`} className="no-underline">
            <div className="relative">
              <img src={author.profileImg} className="width-15 aspect-square rounded-full" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col grow shrink-0 basis-auto">
        <div className="width-37">
          <Link to={`/profile/${author.username}`} className="m-0 p-0 cursor-pointer flex items-center no-underline">
            <h2 className="tracking-normal line-h-8 font-3 font-semibold color-3 m-0 p-0">
              <span className="break-words padding-23" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                Written by <span className="capitalize">{author.name}</span>
              </span>
            </h2>
          </Link>
          <div className="flex items-baseline margin-16" style={{ marginBottom: 0, marginInline: 0 }}>
            <div className="grow-0 shrink-0 basis-auto">
              <span className="custom-fs-1 custom-fs-1 color-4 custom-line-h-1">
                <Link to={`/profile/${author.username}/followers`} className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">{`${author.followersCount} followers`}</Link>
              </span>
            </div>
            <div className="whitespace-pre-wrap custom-fs-1 color-4 custom-line-h-1 flex font-normal">
              <span className="margin-16" style={{ marginBlock: 0 }}>
                <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">·</span>
              </span>
              <Link to={`/profile/${author.username}/following`} className="cursor-pointer m-0 p-0 no-underline font-medium hover:underline">
                {`${author.followingCount} following`}
              </Link>
            </div>
          </div>
          {author.bio && (
            <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}>
              <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                <span className="break-words">{author.bio}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="">
        {userInfo?._id !== author._id && !isFetchUserLoader && (
          <div className="flex">
            {followingUsers[author._id] && (
              <button onClick={handleUnfollowUser} disabled={isLoading} className="bdr17-hover padding-37 padding-38 border-radius-8 flex items-center justify-center m-0 cursor-pointer transition-all duration-700 ease">
                <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Following</span>
              </button>
            )}
            {!followingUsers[author._id] && (
              <button onClick={handleFollowUser} disabled={isLoading} className="bdr-7 padding-37 padding-38 border-radius-8 flex items-center justify-center m-0 cursor-pointer">
                <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-medium break-keep">Follow</span>
              </button>
            )}
          </div>
        )}
        {userInfo?._id === author._id && (
          <div className="flex">
            <Link to="/me/settings#profileInformation" className="text-center no-underline rounded-full bdr-6 custom-bg-1 custom-px-2 custom-py-2 color-2 box-border inline-block custom-fs-1 custom-line-h-1 font-normal opacity-[0.95] transition-all duration-200 linear hover:opacity-100">
              <div className="whitespace-nowrap">Edit profile</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorSection;
