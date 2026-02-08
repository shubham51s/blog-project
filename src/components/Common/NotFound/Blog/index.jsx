import React from "react";
import { useNavigate } from "react-router-dom";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";
import defaultImg from "../../../../assets/images/noPreviewImage.png";

function Blog({ blog }) {
  const navigate = useNavigate();

  const handleShowDetailedBlog = () => {
    navigate(`/${blog.slug}/${blog._id}`);
  };

  return (
    <div className="max-w-[48%] basis-1/2 grow-0 px-0 boxShadow8 border-radius12 bdr-5 mb-4 overflow-hidden margin-9" style={{ marginInline: 0 }}>
      <div className="height72 flex flex-col">
        <div
          onClick={handleShowDetailedBlog}
          className="width66 height73 bg-center bg-cover bg-origin-border cursor-pointer"
          style={{
            backgroundImage: `url('${blog.previewImg ? blog.previewImg : defaultImg}')`,
          }}
        ></div>
        <div className="margin-21 grow shrink-0 basis-auto cursor-pointer" style={{ marginBottom: 0 }}>
          <h4 onClick={handleShowDetailedBlog} className="line-clamp1 tracking-normal font-bold select-none">
            {blog.previewTitle}
          </h4>
        </div>
        <div className="margin-11 margin52 flex items-center">
          <div className="relative cursor-pointer">
            <img src={blog.author.profileImg} alt="name" className="box-border height-2 aspect-square rounded-full align-middle" />
            <div className="boxShadow9 absolute height-2 aspect-square rounded-full top-0"></div>
          </div>
          <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
            <div className="font-4 custom-line-h-1 font-normal cursor-pointer select-none">
              <span className="capitalize">{blog.author.name}</span>
              {blog.community && (
                <span>
                  in <span className="capitalize">{blog.community.name}</span>
                </span>
              )}
            </div>
            <div className="flex-wrap flex items-center">
              <div className="font-4 color-4 custom-line-h-1 font-normal flex flex-wrap">{formatMonthAndDayLong(blog.updatedAt)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
