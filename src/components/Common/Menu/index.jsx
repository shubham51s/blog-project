import React, { useContext, useEffect, useRef, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { UserContext } from "../../../context/userContext";
import { GoPersonFill } from "react-icons/go";
import { RiContactsLine, RiContactsFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useApi } from "../../../hooks/useApi";
import { RiArrowDownSLine } from "react-icons/ri";

function MenuComp() {
  const { isShowMenu } = useContext(UserContext);
  const { fetchRequest } = useApi();
  const isMounted = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const limit = 10;
  const menuOptions = [
    {
      id: 0,
      name: "Home",
      path: "/",
      IconInactive: IoHomeOutline,
      IconActive: IoHomeSharp,
    },
    {
      id: 1,
      name: "Library",
      path: "/me/saved",
      IconInactive: BsBookmarks,
      IconActive: BsBookmarksFill,
    },
    {
      id: 2,
      name: "Profile",
      path: "/profile",
      IconInactive: GoPerson,
      IconActive: GoPersonFill,
    },
    {
      id: 3,
      name: "Stories",
      path: "/me/stories",
      IconInactive: FaRegFile,
      IconActive: FaRegFileAlt,
    },
  ];

  const [following, setFollowing] = useState([]);
  const [fetchDetails, setFetchDetails] = useState({
    isLoading: false,
    skip: 0,
  });

  const handleMenuTabButtonClick = (item) => {
    navigate(item.path);
  };

  const fetchFollowingList = async () => {
    setFetchDetails((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetchRequest(`/follow/following?skip=${fetchDetails.skip}&limit=${limit}`, "GET");
      const result = await response.json();

      if (response.status === 200) {
        const isDataRemained = result?.data?.following.length === limit;

        // update skip
        setFetchDetails((prev) => ({ ...prev, isLoading: false, skip: isDataRemained ? prev.skip + limit : -1 }));
        if (result?.data?.following.length > 0) {
          setFollowing((prev) => [...prev, ...result.data.following]);
        }
      } else {
        setFetchDetails((prev) => ({ ...prev, isLoading: false, skip: -1 }));
      }
    } catch (err) {
      console.error(err);
      setFetchDetails((prev) => ({ ...prev, isLoading: false, skip: -1 }));
    }
  };

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    fetchFollowingList();
  }, []);

  return (
    <div className={`flex-none transition-all h-full overflow-y-auto duration-300 ease-in-out overflow-x-hidden ${isShowMenu ? "width-16 visible" : "w-0 invisible"}`}>
      <div className="bdr-5 w-full custom-bg-8" style={{ borderLeft: 0, borderBlock: 0 }}>
        <div className="h-full w-full max-h-full flex-shrink basis-auto flex">
          <div className="flex flex-col custom-gap-4 overflow-auto padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
            <div className="flex flex-col custom-gap-4">
              <div className="height-12"></div>

              {menuOptions.map((item) => (
                <div key={item.id}>
                  <div onClick={() => handleMenuTabButtonClick(item)} className={`text-left line-h-8 select-none padding-21 py-0 flex items-center custom-gap-2 font-10 relative cursor-pointer m-0 color-6 font-normal no-underline transition-all duration-300 ease-in-out hover:opacity-100 ${location.pathname === item.path ? "opacity-100" : "opacity-[0.7]"}`}>
                    {location.pathname === item.path && <item.IconActive className="width-13 height-10 align-middle" />}
                    {location.pathname !== item.path && <item.IconInactive className="width-13 height-10 align-middle" />}
                    <span className="shrink grow text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="margin-20 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>

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
                <div key={item._id} className="margin-21 flex items-center custom-gap-2 padding-3 cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }} title={item.follower.name}>
                  <div className="padding-23 flex-none color-6" style={{ paddingBlock: 0 }}>
                    <img className="width-19 aspect-square rounded-full" src={item.follower.profileImg} />
                  </div>
                  <div className="flex flex-col custom-gap-3 items-start text-start max-w-full flex-nowrap truncate">
                    <p className="font-10 color-6 custom-line-h-1 font-normal m-0 p-0">{item.follower.name}</p>
                  </div>
                </div>
              ))}

              {fetchDetails.skip > 0 && (
                <button onClick={fetchFollowingList} className="margin-21 flex items-center custom-gap-2 padding-3 cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }} disabled={fetchDetails.isLoading}>
                  <div className="padding-23 flex-none color-6" style={{ paddingBlock: 0 }}>
                    <div className="width-19 aspect-square">
                      {!fetchDetails.isLoading && <RiArrowDownSLine className="w-full h-full" />}
                      {fetchDetails.isLoading && <div className="w-full h-full border border-blue-600 border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                  </div>
                  <div className="flex flex-col custom-gap-3 items-start text-start">
                    <p className="font-10 color-6 custom-line-h-1 font-normal m-0 p-0">More</p>
                  </div>
                </button>
              )}
              <div className=""></div>

              {fetchDetails.skip === -1 && (
                <div className="margin-21 flex items-start custom-gap-2 padding-3" style={{ marginBottom: 0, marginInline: 0, paddingBlock: 0 }}>
                  <div className="padding-23 flex-none color-6 opacity-75" style={{ paddingBlock: 0 }}>
                    <div className="width-19 aspect-square">
                      <IoMdAdd className="w-full h-full" />
                    </div>
                  </div>
                  <div className="flex flex-col custom-gap-3 items-start text-start">
                    <p className="font-10 color-6 opacity-75 custom-line-h-1 font-normal m-0 p-0">Find writers and publications to follow.</p>
                    <div className="font-10 color-6 custom-line-h-1 font-normal opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
                      <a href="#" className="cursor-pointer m-0 p-0 underline">
                        See suggestions
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuComp;
