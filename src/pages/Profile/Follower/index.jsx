import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { Link, useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { formatNumberCompact } from "../../../utils/common";
import FollowersList from "../../../components/ProfileComp/FollowersSection";

function Follower() {
  const { user, setUser } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [followersArr, setFollowersArr] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowersList = async (skip) => {
    try {
      const response = await requestHandler(`/follow/followers/${user._id}?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.follower) {
        if (skip === 0) setFollowersArr(result.data.follower);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && isLoading) fetchFollowersList(0);
  }, [user]);

  useEffect(() => {
    if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);
    defaultLoaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
    }, 500);

    return () => {
      if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="margin-12 min-w-0 w-full max-width-2">
        <div className="margin56">
          {user && (
            <div className="flex items-center">
              <div className="inline-block max-w-[50%] padding50 truncate" style={{ paddingLeft: 0 }}>
                <span className="font-4 color-3 line20 font-normal opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                  {user && (
                    <Link to={`/profile/${user.username}`} className="no-underline cursor-pointer m-0 p-0">
                      {user.name}
                    </Link>
                  )}
                </span>
              </div>
              <div className="max-w-[50%] padding50 truncate flex items-center" style={{ paddingLeft: 0 }}>
                <div className="inline-block width84 aspect-square color-3">
                  <MdOutlineKeyboardArrowRight className="w-full h-full" />
                </div>
                <span className="font-4 color-3 line20 font-normal">Followers</span>
              </div>
            </div>
          )}
          {!user && <Skeleton height={25} width={100} />}
          <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}></div>
          {user && <h2 className="letter-spacing-7 line-h-10 font-12 font-semibold color-3 m-0">{formatNumberCompact(user.followersCount)} Followers</h2>}
          {!user && <Skeleton width={200} height={50} />}
        </div>

        <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>

        <div>
          <div className="p-0 m-0">
            {followersArr.map((item) => (
              <FollowersList item={item} user={user} setUser={setUser} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Follower;
