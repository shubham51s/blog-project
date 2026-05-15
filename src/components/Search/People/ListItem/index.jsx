import React from "react";
import { Link } from "react-router-dom";

function ListItem() {
  const isFollowing = true;

  return (
    <div className="w-full margin77" style={{ marginTop: 0 }}>
      <Link>
        <div className="padding87">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative shrink-0">
                <img src="https://miro.medium.com/v2/resize:fill:96:96/1*O1R3VltjWmd7QU0lptRUtg.png" className="width-15 aspect-square rounded-full" />
                <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
              </div>
              <div className="padding95 padding96">
                <div className="flex items-center">
                  <h2 className="font-10 font-semibold color-3 line20 m-0">
                    <span className="truncate">Shubham Gautam</span>
                  </h2>
                </div>
                <div className="margin44">
                  <p className="height-15 color-4 custom-fs-1 line20 font-normal m-0 line-clamp-2">Founder enjoyalgorithms.com | IIT | Super 30 | Educator | A learner who enjoys computer science, programming, algorithms, and problem-solving.</p>
                </div>
              </div>
            </div>
            <div className="width108">
              <button className={`custom-px-2 padding-38 border-radius-8 cursor-pointer m-0 transition-all duration-500 ease ${isFollowing ? "bdr-7" : "bdr17-hover"}`}>
                <span className="color-3 custom-fs-1 line20 font-normal break-keep">Follow</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
