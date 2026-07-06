import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";
import defaultImg from "../../../../assets/images/noPreviewImage.png";
import { formatUTCToLocalDate } from "../../../../utils/dates";
import { getImageUrl } from "../../../../utils/common";

function Blog({ blog }) {
  return (
    <div className="max-w-[48%] basis-1/2 grow-0 px-0 boxShadow8 border-radius12 bdr-5 mb-4 overflow-hidden margin-9" style={{ marginInline: 0 }}>
      <div className="height72 flex flex-col">
        <Link
          to={`/${blog.slug}`}
          className="width66 height73 bg-center bg-cover bg-origin-border cursor-pointer"
          style={{
            backgroundImage: `url('${blog.previewImg ? getImageUrl(blog.previewImg) : defaultImg}')`,
          }}
        ></Link>
        <Link to={`/${blog.slug}`} className="margin-21 grow shrink-0 basis-auto cursor-pointer" style={{ marginBottom: 0 }}>
          <h4 className="line-clamp1 tracking-normal font-bold select-none">{blog.previewTitle}</h4>
        </Link>
        <div className="margin-11 margin52 flex items-center">
          <Link to={`/profile/${blog.author.username}`} className="relative cursor-pointer">
            <img loading="lazy" src={blog.author.profileImg} className="box-border height-2 aspect-square rounded-full align-middle" />
            <div className="boxShadow9 absolute height-2 aspect-square rounded-full top-0"></div>
          </Link>
          <Link to={`/profile/${blog.author.username}`} className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="font-4 custom-line-h-1 font-normal cursor-pointer select-none">
              <span className="capitalize">{blog.author.name}</span>
            </div>
            <div className="flex-wrap flex items-center">
              <span className="font-4 color-4 custom-line-h-1 font-normal flex flex-wrap">{formatUTCToLocalDate(blog.createdAt)}</span>
              <div className="padding-23 flex items-center" style={{ paddingBlock: 0 }}>
                <span className="font19 color-4 custom-line-h-1 font-normal flex flex-wrap">•</span>
              </div>
              <span className="font-4 color-4 custom-line-h-1 font-normal flex flex-wrap">{blog.readingTime} min read</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;
