import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog2Comp from "../../components/PostDetailsPageComponents/BlogComp2";
import { useApi } from "../../hooks/useApi";

function BlogDetailsErrorComp() {
  const { fetchRequest } = useApi();
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetchRequest("/blogs/recommended?skip=0&limit=4", "GET");
      const result = await response.json();

      if (response.status === 200) {
        setRecommendedBlogs(result.data.blogs);
      }
    } catch (err) {
      console.log("fetchBlogs catch block: ", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="width-17 grow shrink basis-auto flex justify-center">
      <div className="w-full max-width-2 margin-12 min-w-0">
        {/* top section */}
        <div className="text-center">
          <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
            <div className="font-light font-4">PAGE NOT FOUND</div>
          </div>
          <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
            <h2 className="color-6 line-h-4 font-5 font-normal m-0">
              <span className="color15">404</span>
            </h2>
          </div>
          <div className="margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
            <h2 className="line-h12 font15 color-6 font-normal m-0">Out of nothing, something.</h2>
          </div>
          <div className="margin-37" style={{ marginBottom: 0, marginInline: 0 }}>
            <div className="font-10 font-light">You can find (just about) anything on Medium — apparently even a page that doesn’t exist. Maybe these stories will take you somewhere new?</div>
          </div>
          <div className="margin-37" style={{ marginBottom: 0, marginInline: 0 }}>
            <div className="font-10 font-light">
              <Link to="/" className="underline cursor-pointer m-0 p-0">
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* bottom section */}
        <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
          <div className="mx-0 flex flex-wrap w-full items-center gap-[2%]">
            {recommendedBlogs.map((item) => (
              <Blog2Comp blog={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailsErrorComp;
