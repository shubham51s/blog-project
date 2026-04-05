import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Spinner from "../Spinner";

function NotFoundComp() {
  const { requestHandler } = useRequestHandler();
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/blogs/recommended?limit=4");
      const result = await response.json();

      if (response.status === 200 && result?.data?.blogs) {
        setRecommendedBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchBlogs();
    }
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
          {!isLoading && (
            <div className="mx-0 flex flex-wrap w-full items-center gap-[2%]">
              {recommendedBlogs.map((item) => (
                <Blog blog={item} key={item._id} />
              ))}
            </div>
          )}
          {isLoading && (
            <div className="w-full flex items-center justify-center margin-39">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFoundComp;
