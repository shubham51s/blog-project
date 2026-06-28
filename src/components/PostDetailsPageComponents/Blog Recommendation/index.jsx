import React, { useEffect, useState } from "react";
import BlogComp from "../Blog Comp";
import { Link } from "react-router-dom";
import { useRequestHandler } from "../../../hooks/requestHandler";

function BlogRecommendComp({ blog }) {
  const { requestHandler } = useRequestHandler();
  const footerOptions = [];
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [publicationBlogs, setPublicationBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  const getRelatedBlogs = async () => {
    try {
      const params = {
        userId: blog.author._id,
        blogId: blog._id,
      };

      if (blog.publication) params.publicationId = blog.publication._id;
      const response = await requestHandler(`/blogs/top-related`, "POST", params);
      const result = await response.json();
      if (response?.status === 200 && result?.data?.blogs?.length) {
        setRelatedBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRecommendedBlogs = async () => {
    try {
      const response = await requestHandler(`/blogs/recommended/${blog._id}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs?.length) {
        setRecommendedBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRelatedBlogs();
    getRecommendedBlogs();
  }, []);

  return (
    <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}>
      {relatedBlogs.length > 0 && (
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-2">
            <div className="custom-margin-b-1 margin-37">
              <h2 className="letter-spacing-8 line-h-9 font-11 font-semibold color-3 m-0 p-0">
                <span>More from </span>
                <span className="capitalize">{blog.author.name}</span>
                {blog.publication && (
                  <>
                    <span> and </span>
                    <span className="capitalize">{blog.publication.name}</span>
                  </>
                )}
              </h2>
            </div>
            <div className="margin-38 width-39 flex flex-wrap items-stretch">
              {relatedBlogs.slice(0, 4).map((item) => (
                <BlogComp item={item} key={item._id} />
              ))}
            </div>
            <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>
            {relatedBlogs.length >= 4 && (
              <div className="flex">
                <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-medium opacity-[0.9] transition-all duration-75 ease hover:opacity-100 capitalize">{`See all from ${blog.author.name}`}</Link>
                {blog.publication && (
                  <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
                    <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-medium opacity-[0.9] transition-all duration-75 ease hover:opacity-100 capitalize">{`See all from ${blog.publication.name}`}</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="margin-36 bdr-8 w-full" style={{ marginBottom: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>

      {recommendedBlogs.length > 0 && (
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-2">
            <div className="padding-44 padding-45">
              <div className="custom-margin-b-1 margin-37">
                <h2 className="letter-spacing-8 line-h-9 font-11 font-semibold color-3 m-0 p-0">Recommended from Medium</h2>
              </div>
              <div className="margin-38 width-39 flex flex-wrap items-stretch">
                {recommendedBlogs.slice(0, 6).map((item) => (
                  <BlogComp item={item} key={item._id} />
                ))}
              </div>
              <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>
              {/* {recommendedBlogs.length >= 6 && (
                <div className="flex">
                  <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-normal opacity-[0.85] transition-all duration-75 ease hover:opacity-100">See more recommendations</Link>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}

      {false && (
        <div>
          <div className="margin-39 bdr-8 w-full" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}></div>
          <div className="flex justify-center">
            <div className="max-width-2 margin-2 min-w-0 w-full">
              <div className="padding-3 flex flex-wrap" style={{ paddingInline: 0 }}>
                {footerOptions.map((item) => (
                  <div className="margin-3" key={item.id}>
                    <Link to={item.path} className="m-0 p-0 cursor-pointer">
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">{item.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogRecommendComp;
