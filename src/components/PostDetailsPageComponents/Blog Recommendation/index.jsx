import React, { useEffect, useState } from "react";
import BlogComp from "../Blog Comp";
import { Link } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";

function BlogRecommendComp({ blog }) {
  const footerOptions = [
    {
      id: 0,
      name: "Help",
      path: "/",
    },
    {
      id: 1,
      name: "Status",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/",
    },
    {
      id: 3,
      name: "Careers",
      path: "/",
    },
    {
      id: 4,
      name: "Press",
      path: "/",
    },
    {
      id: 5,
      name: "Blog",
      path: "/",
    },
    {
      id: 6,
      name: "Privacy",
      path: "/",
    },
    {
      id: 7,
      name: "Rules",
      path: "/",
    },
    {
      id: 8,
      name: "Terms",
      path: "/",
    },
    {
      id: 9,
      name: "Text to speech",
      path: "/",
    },
  ];

  const { fetchRequest } = useApi();

  const [currentBlog, setCurrentBlog] = useState({
    name: "Yana Bostongirl",
    community: {
      name: "ILLUMINATION",
    },
  });

  const [moreBlogsFromAuthorAndCommunity, setMoreBlogsFromAuthorAndCommunity] = useState([]);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [communityBlogs, setCommunityBlogs] = useState([]);

  const [moreBlogs, setMoreBlogs] = useState([
    {
      _id: 0,
      title: "How to Tell If Someone Is Actually Smart",
      description: "And 5 things that automatically don’t mean you’re smart",
      date: "Jul 31",
      img: "https://miro.medium.com/v2/resize:fit:849/format:webp/1*kcMrO6kCcd5Zr9WMf5FVyA.jpeg",
      clapsCount: "1.1K",
      commentsCount: "19",
      community: {
        name: "ILLUMINATION",
        profileImg: "https://miro.medium.com/v2/resize:fill:25:25/1*AZxiin1Cvws3J0TwNUP2sQ.png",
      },
      writer: {
        name: "Yana Bostongirl",
      },
    },
    {
      _id: 1,
      title: "Have We Been Tricked by Gödel?",
      description: "According to Kreisel, yes.",
      date: "Jul 31",
      img: "	https://miro.medium.com/v2/resize:fit:849/format:webp/1*qdw8AKBattm1F_BBoLeRdg.jpeg",
      clapsCount: "520",
      commentsCount: "192",
      community: {
        name: "Philosophy Today",
        profileImg: "https://miro.medium.com/v2/resize:fill:25:25/1*PUDx_xvsheMfWyuDj5_Kxg.png",
      },
      writer: {
        name: "Pedro Barbalho",
      },
    },
    {
      _id: 2,
      title: "Have We Been Tricked by Gödel?",
      description: "According to Kreisel, yes.",
      date: "Jul 31",
      img: "	https://miro.medium.com/v2/resize:fit:849/format:webp/1*qdw8AKBattm1F_BBoLeRdg.jpeg",
      clapsCount: "520",
      commentsCount: "192",
      community: {
        name: "Philosophy Today",
        profileImg: "https://miro.medium.com/v2/resize:fill:25:25/1*PUDx_xvsheMfWyuDj5_Kxg.png",
      },
      writer: {
        name: "Pedro Barbalho",
      },
    },
    {
      _id: 3,
      title: "How to Tell If Someone Is Actually Smart",
      description: "And 5 things that automatically don’t mean you’re smart",
      date: "Jul 31",
      img: "https://miro.medium.com/v2/resize:fit:849/format:webp/1*kcMrO6kCcd5Zr9WMf5FVyA.jpeg",
      clapsCount: "1.1K",
      commentsCount: "19",
      community: {
        name: "ILLUMINATION",
        profileImg: "https://miro.medium.com/v2/resize:fill:25:25/1*AZxiin1Cvws3J0TwNUP2sQ.png",
      },
      writer: {
        name: "Yana Bostongirl",
      },
    },
  ]);

  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  const getRecommendedBlogsByAuthor = async (author) => {
    try {
      const response = await fetchRequest(`/blogs/user/${author}?skip=0&limit=6`, "GET");

      if (response.status === 200) {
        const result = await response.json();

        if (result.data.blogs.length > 0) {
          setMoreBlogsFromAuthorAndCommunity(result.data.blogs);
          setAuthorBlogs(result.data.blogs);
        }
      }
    } catch (err) {
      console.log("getRecommendedBlogsByAuthor catch block: ", err);
    }
  };

  const getRecommendedBlogsByCategory = async () => {
    try {
      const categories = blog.categories.map((item) => item._id);
      const params = {
        categories,
      };

      const response = await fetchRequest(`/blogs/categories?skip=0&limit=6`, "POST", params);

      if (response.status === 200) {
        const result = await response.json();
        setRecommendedBlogs(result.data.blogs);
      }
    } catch (err) {
      console.log("getRecommendedBlogsByCategory catch block: ", err);
    }
  };

  useEffect(() => {
    getRecommendedBlogsByAuthor(blog.author._id);
    getRecommendedBlogsByCategory();
  }, []);

  return (
    <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}>
      {moreBlogsFromAuthorAndCommunity.length > 0 && (
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-2">
            <div className="custom-margin-b-1 margin-37">
              <h2 className="letter-spacing-8 line-h-9 font-11 font-medium color-3 m-0 p-0">
                <span>More from </span>
                <span className="capitalize">{blog.author.name}</span>
                {communityBlogs.length > 0 && <span> and </span>}
                {communityBlogs.length > 0 && <span className="capitalize">blog.community.name</span>}
              </h2>
            </div>

            <div className="margin-38 width-39 flex flex-wrap items-stretch">
              {moreBlogsFromAuthorAndCommunity.slice(0, 4).map((blogDetails) => (
                <BlogComp blogDetails={blogDetails} key={blogDetails._id} />
              ))}
            </div>

            <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>

            <div className="flex">
              {authorBlogs.length > 0 && <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-medium opacity-[0.9] transition-all duration-300 ease-out hover:opacity-100 capitalize">{`See all from ${blog.author.name}`}</Link>}

              {communityBlogs.length > 0 && (
                <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
                  <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-medium opacity-[0.9] transition-all duration-300 ease-out hover:opacity-100 capitalize">{`See all from ${blog.community.name}`}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="margin-36 bdr-8 w-full" style={{ marginBottom: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>

      {recommendedBlogs.length > 0 && (
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-2">
            <div className="padding-44 padding-45">
              <div className="custom-margin-b-1 margin-37">
                <h2 className="letter-spacing-8 line-h-9 font-11 font-medium color-3 m-0 p-0">Recommended from Medium</h2>
              </div>

              <div className="margin-38 width-39 flex flex-wrap items-stretch">
                {recommendedBlogs.slice(0, 6).map((blogDetails) => (
                  <BlogComp blogDetails={blogDetails} key={blogDetails._id} />
                ))}
              </div>

              <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>

              {recommendedBlogs.length > 0 && (
                <div className="flex">
                  <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-normal opacity-[0.85] transition-all duration-300 ease-out hover:opacity-100">See more recommendations</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default BlogRecommendComp;
