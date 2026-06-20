import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import MoreButton from "./MoreButton";
import SaveList from "./Save";
import { UserContext } from "../../../../context/userContext";
import { getImageUrl } from "../../../../utils/common";

function ListComp({ user, setUser, item, filterOutDeletedList }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [list, setList] = useState(item);
  const preview = {
    first: list.previewImages[0] ? getImageUrl(list.previewImages[0]) : null,
    second: list.previewImages[1] ? getImageUrl(list.previewImages[1]) : null,
    third: list.previewImages[2] ? getImageUrl(list.previewImages[2]) : null,
  };

  const handleNavigateToLink = () => {
    navigate(`/profile/${user.username}/list/${list.slug}/${list._id}`);
  };

  return (
    <div className="relative w-full width55 z-0 flex justify-between margin57 bdr-5 border-radius-3 bg-10 cursor-pointer">
      <div className="grow shrink-0 basis-0 padding-3 padding76 flex flex-col break-words justify-between">
        <Link to={`/profile/${user.username}`} onClick={(e) => e.stopPropagation()} className="no-underline">
          <div className="flex opacity-[0.95] transition-all duration-75 linear hover:opacity-100">
            <div className="relative">
              <img loading="lazy" src={user.profileImg} className="height-12 aspect-square rounded-full" />
              <div className="absolute top-0 height-12 aspect-square rounded-full boxShadow7"></div>
            </div>
            <div className="flex items-center z-[1] padding50" style={{ paddingRight: 0 }}>
              <p className="height-6 break-words overflow-hidden line-clamp-1 text-ellipsis color-3 custom-fs-1 line20 font-normal m-0" title={user.name}>
                {user.name}
              </p>
            </div>
          </div>
        </Link>
        <Link to={`/profile/${user.username}/list/${list.slug}/${list._id}`} className="block margin-7" style={{ marginBottom: 0, marginInline: 0 }}>
          <h2 className="height-61 line-h-8 font-3 overflow-hidden line-clamp-2 font-bold text-ellipsis color-3 m-0">{list.name}</h2>
        </Link>
        <div className="flex items-center justify-between">
          <Link to={`/profile/${user.username}/list/${list.slug}/${list._id}`} className="flex margin-6 items-center">
            <p className="font-4 color-4 line20 font-normal m-0">{list.savedCount > 0 ? list.savedCount + " stories" : "No stories"}</p>
            {list.isPrivate && (
              <div className="padding50" style={{ paddingRight: 0 }}>
                <div className="width68 aspect-square opacity-[0.80]">
                  <IoLockClosed className="w-full h-full" />
                </div>
              </div>
            )}
          </Link>
          <div className="flex items-center">
            {userInfo._id !== user._id && <SaveList user={user} setUser={setUser} list={list} />}
            <MoreButton user={user} setUser={setUser} list={list} setList={setList} filterOutDeletedList={filterOutDeletedList} />
          </div>
        </div>
      </div>

      <Link to={`/profile/${user.username}/list/${list.slug}/${list._id}`} className="block">
        <div className="relative h-full flex overflow-hidden justify-end">
          <div className="relative bg-10 z-[3] bdr18" style={{ borderLeft: 0, borderBlock: 0 }}>
            <div className="h-full">
              {preview.first && <img loading="lazy" src={`${preview.first}`} className="height78 width79 bg-10" />}
              {!preview.first && <div className="height78 width79 bg-11"></div>}
            </div>
          </div>
          <div className="relative z-[2] bg-10 margin63 padding-23 bdr18" style={{ paddingRight: 0, paddingBlock: 0, borderLeft: 0, borderBlock: 0 }}>
            <div className="h-full">
              {preview.second && <img loading="lazy" src={`${preview.second}`} className="height78 width79 bg-10" />}
              {!preview.second && <div className="height78 width79 bg-11"></div>}
            </div>
          </div>
          <div className="relative z-[1] bg-10 margin64 padding-23" style={{ paddingRight: 0, paddingBlock: 0 }}>
            <div className="h-full">
              {preview.third && <img loading="lazy" src={`${preview.third}`} className="height78 width79 bg-10" />}
              {!preview.third && <div className="height78 width79 bg-11"></div>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListComp;
