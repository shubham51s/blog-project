import React, { useEffect, useState } from "react";
import BlogComp from "../Blog Comp";
import { Link } from "react-router-dom";

function BlogRecommendComp({ moreBlogsFromAuthorAndCommunity }) {
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

  const [currentBlog, setCurrentBlog] = useState({
    name: "Yana Bostongirl",
    community: {
      name: "ILLUMINATION",
    },
  });

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
  const [recommendedBlog1s, setRecommendedBlogs1] = useState([
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
    {
      _id: 4,
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
      _id: 5,
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
      _id: 6,
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

  const [userBlogs, setUserBlogs] = useState([{ _id: 0 }]);

  return (
    <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}>
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-2">
          <div className="custom-margin-b-1 margin-37">
            <h2 className="letter-spacing-8 line-h-9 font-11 font-medium color-3 m-0 p-0">{`More from ${currentBlog.name} and ${currentBlog.community.name}`}</h2>
          </div>

          <div className="margin-38 width-39 flex flex-wrap items-stretch">
            {moreBlogsFromAuthorAndCommunity.slice(0, 4).map((blogDetails) => (
              <BlogComp blogDetails={blogDetails} key={blogDetails._id} />
            ))}
          </div>

          <div className="margin-17 bdr-8 w-full" style={{ marginTop: 0, borderTop: 0, borderInline: 0 }}></div>

          <div className="flex">
            <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-normal opacity-[0.85] transition-all duration-300 ease-out hover:opacity-100">{`See all from ${currentBlog.name}`}</Link>

            <div className="margin-21" style={{ marginRight: 0, marginBlock: 0 }}>
              <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-normal opacity-[0.85] transition-all duration-300 ease-out hover:opacity-100">{`See all from ${currentBlog.community?.name}`}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="margin-36 bdr-8 w-full" style={{ marginBottom: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>

      {/* working */}
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

            <div className="flex">
              <Link className="no-underline border-radius-9 bdr-7 text-center padding-5 box-border color-6 custom-fs-1 inline-block custom-line-h-1 font-normal opacity-[0.85] transition-all duration-300 ease-out hover:opacity-100">See more recommendations</Link>
            </div>
          </div>
        </div>
      </div>

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
