import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { RiContactsLine, RiContactsFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Following() {
  const { requestHandler } = useRequestHandler();
  const hasMounted = useRef(null);
  const limit = 10;
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchFollowingUsersList = async () => {
    setHasMore(false);
    setIsLoading(true);
    try {
      const response = await requestHandler(`/follow/following?skip=${following.length}&limit=${limit}`);
      const result = await response.json();

      if (response.status === 200 && result?.data?.following) {
        setFollowing((prev) => [...prev, ...result.data.following]);
        setHasMore(result.data.following.length === limit);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    fetchFollowingUsersList();
  }, []);

  return (
    <div className="flex flex-col custom-gap-3">
      <div className="flex items-center justify-between" style={{ paddingBlock: 0 }}>
        <div className={`text-left line-h-8 select-none padding-21 py-0 flex items-center custom-gap-2 font-10 relative cursor-pointer m-0 color-6 font-normal no-underline transition-all duration-300 ease-in-out hover:opacity-100 ${false ? "opacity-100" : "opacity-[0.7]"}`}>
          {true && <RiContactsLine className="width-13 height-10 align-middle" />}
          {false && <RiContactsFill className="width-13 height-10 align-middle" />}
          <span className="shrink grow text-ellipsis overflow-hidden whitespace-nowrap">Following</span>
        </div>
      </div>

      {/* followers list here */}
      {following.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}

      {hasMore > 0 && (
        <button onClick={fetchFollowingUsersList} className="margin-21 flex items-center custom-gap-2 padding-3 cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }} disabled={isLoading}>
          <div className="padding-23 flex-none color-6" style={{ paddingBlock: 0 }}>
            <div className="width-19 aspect-square">
              {!isLoading && <RiArrowDownSLine className="w-full h-full" />}
              {isLoading && <div className="w-full h-full border border-blue-600 border-t-transparent rounded-full animate-spin"></div>}
            </div>
          </div>
          <div className="flex flex-col custom-gap-3 items-start text-start">
            <p className="font-10 color-6 custom-line-h-1 font-normal m-0 p-0">More</p>
          </div>
        </button>
      )}
      <div className=""></div>

      {!hasMore && !isLoading && (
        <div className="margin-21 flex items-start custom-gap-2 padding-3" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }}>
          <div className="padding-23 flex-none color-6 opacity-75" style={{ paddingBlock: 0 }}>
            <div className="width-19 aspect-square">
              <IoMdAdd className="w-full h-full" />
            </div>
          </div>
          <div className="flex flex-col custom-gap-3 items-start text-start">
            <p className="font-10 color-6 opacity-75 custom-line-h-1 font-normal m-0 p-0">Find writers and publications to follow.</p>
            <div className="font-10 color-6 custom-line-h-1 font-normal opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
              <Link to="me/following/suggestions" className="cursor-pointer m-0 p-0 underline">
                See suggestions
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Following;
