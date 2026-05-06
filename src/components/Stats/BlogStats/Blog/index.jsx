import React from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { PiHandsClapping } from "react-icons/pi";
import { PiHandsClappingBold } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { getImageUrl } from "../../../../utils/common";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import defaultImg from "../../../../assets/images/noPreviewImage.png";

function BlogDetails({ blog }) {
  return (
    <div>
      <div className="margin-27" style={{ marginInline: 0 }}>
        <Link to="/me/stats" className="cursor-pointer underline m-0 p-0">
          <span className="flex items-center flex-nowrap custom-gap-3">
            <div className="width-13 aspect-square">
              <GoArrowLeft className="w-full h-full" />
            </div>
            <span className="color-3 custom-fs-1 line20 font-normal">Back to Story Stats</span>
          </span>
        </Link>
      </div>

      <div className="mr-auto">
        <div className="flex">
          <Link to={`/${blog.slug}/${blog._id}`} className="cursor-pointer">
            <div className="height92 width106 margin58" style={{ marginLeft: 0, marginBlock: 0 }}>
              <img src={blog.previewImg ? getImageUrl(blog.previewImg) : defaultImg} className="w-full h-full" />
            </div>
          </Link>
          <div className="width105">
            <div className="break-words">
              <Link to={`/${blog.slug}/${blog._id}`} className="cursor-pointer">
                <h2 className="letter-spacing10 height93 line21 font15 line-clamp-3 color-3 m-0 font-semibold">{blog.previewTitle}</h2>
              </Link>
            </div>
            <div className="font-4 color-4 line20 font-normal">
              <div className="padding63 flex items-center">
                <span>{blog.readingTime} min read</span>
                <div className="margin73">
                  <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                </div>
                <span>{formatUTCToLocalDate(blog.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center padding63">
              <Link to={`/${blog.slug}/${blog._id}`} className="flex items-center color-4">
                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                  <div className="width86 aspect-square">
                    <PiHandsClappingBold className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <p className="font-4 color-4 line20 font-normal m-0 p-0">{blog.clapsCount}</p>
                </div>
              </Link>
              <Link to={`/${blog.slug}/${blog._id}`} className="margin-18 flex items-center color-4" style={{ marginRight: 0 }}>
                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                  <div className="width86 aspect-square">
                    <FaRegComment className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <p className="font-4 color-4 line20 font-normal m-0 p-0">{blog.commentCount}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
