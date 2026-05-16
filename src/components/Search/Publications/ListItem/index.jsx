import React from "react";
import { Link } from "react-router-dom";

function ListItem({ item }) {
  const isFollowing = true;

  return (
    <div className="w-full margin77" style={{ marginTop: 0 }}>
      <div>
        <div className="padding87">
          <div className="flex items-center justify-between">
            <Link to={`/publication/${item.slug}`} className="flex items-center">
              <div className="relative shrink-0">
                <img src={item.profileImg} className="width-15 aspect-square border-radius-5" />
                <div className="absolute top-0 width-15 aspect-square border-radius-5 boxShadow7"></div>
              </div>
              <div className="padding95 padding96">
                <div className="flex items-center">
                  <h2 className="font-10 font-semibold color-3 line20 m-0">
                    <span className="truncate">{item.name}</span>
                  </h2>
                </div>
                <div className="margin44">
                  <p className="height-15 color-4 custom-fs-1 line20 font-normal m-0 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </Link>
            <div className="width108">
              <button className={`padding-20 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-500 ease ${isFollowing ? "bdr-7" : "bdr17-hover"}`}>
                <span className="color-3 custom-fs-1 line20 font-normal break-keep">Follow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
