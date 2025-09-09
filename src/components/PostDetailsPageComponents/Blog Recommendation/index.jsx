import React, { useState } from "react";
import BlogComp from "../Blog Comp";

function BlogRecommendComp() {
  const [userDetails, setUserDetails] = useState({
    name: "Yana Bostongirl",
    community: {
      name: "ILLUMINATION",
    },
  });

  const [userBlogs, setUserBlogs] = useState([{ _id: 0 }]);

  return (
    <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}>
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-2">
          <div className="custom-margin-b-1 margin-37">
            <h2 className="letter-spacing-8 line-h-9 font-11 font-medium color-3 m-0 p-0">{`More from ${userDetails.name} and ${userDetails.community.name}`}</h2>
          </div>

          <div className="margin-38 width-39 flex flex-wrap items-stretch">
            <BlogComp />
          </div>

          <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>

          <div className="flex"></div>
        </div>
      </div>

      <div className="margin-36 bdr-8 w-full" style={{ marginBottom: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>

      <div className="flex justify-center"></div>

      <div></div>
    </div>
  );
}

export default BlogRecommendComp;
