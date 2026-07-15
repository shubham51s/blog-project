import React, { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/mediumLogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import LoginSignupComp from "../../components/Authentication";

function AboutPage() {
  const footerOptions = [
    {
      id: 1,
      name: "About",
      path: "/about",
    },
    {
      id: 2,
      name: "Terms",
      path: "/about",
    },
    {
      id: 3,
      name: "Privacy",
      path: "/about",
    },
    {
      id: 4,
      name: "Help",
      path: "/about",
    },
    {
      id: 5,
      name: "Teams",
      path: "/about",
    },
    {
      id: 6,
      name: "Press",
      path: "/about",
    },
  ];

  const { isUserLoggedIn, setIsLoginTabActive, isShowLoginPopup, setIsShowLoginPopup } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigationBtnClick = (type) => {
    if (type === "login") {
      setIsLoginTabActive(true);
      setIsShowLoginPopup(true);
    } else if (type === "signup") {
      setIsLoginTabActive(false);
      setIsShowLoginPopup(true);
    }
  };

  return (
    <>
      {!isUserLoggedIn && isShowLoginPopup && <LoginSignupComp />}

      <div className="flex justify-center font-normal">
        <div className="m-0 w-full min-w-0 max-w-full">
          {/* header */}
          <div className="padding-3 custom-bg-3 flex items-center justify-between bdr-2 custom-bdr-4">
            <Link to="/" className="cursor-pointer m-0 p-0 no-underline">
              <img loading="lazy" className="custom-h-2 w-auto align-middle" src={logo} />
            </Link>
            <div className="flex">
              <div className="margin-3">
                <span>
                  <button onClick={() => handleNavigationBtnClick("login")} className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 custom-bdr-6 color-5 text-center no-underline inline-block bdr-1 custom-bdr-4 rounded-full">
                    Sign in
                  </button>
                </span>
              </div>
              <span>
                <button onClick={() => handleNavigationBtnClick("signup")} className="cursor-pointer color-6 padding-5 custom-line-h-1 custom-fs-1 custom-bdr-7 custom-bg-4 text-center inline-block bdr-1 rounded-full m-0 overflow-visible">
                  Sign up
                </button>
              </span>
            </div>
          </div>
          {/* section */}
          <section className="padding-4 custom-bg-position bg-no-repeat custom-bg-3" style={{ backgroundImage: `url(https://miro.medium.com/v2/resize:fit:1400/format:webp/7*3l9Fl9UIQBgkR_Vu2_ihLg.png)` }}>
            <div className="width-3">
              <div className="margin-4">
                <h2 className="letter-spacing-1 line-h-4 font-5 color-7 m-0">Everyone has a story to tell</h2>
              </div>
              <p className="letter-spacing-2 line-h-5 font-6 color-5 m-0">StoryNest is a home for human stories and ideas. Here, anyone can share knowledge and wisdom with the world—without having to build a mailing list or a following first. The internet is noisy and chaotic; StoryNest is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right readers for whatever you have to say.</p>
              <br />
              <br />
              <blockquote className="color-8 letter-spacing-3 line-h-6 font-7 font-light m-0">
                <span className="custom-bg-5 color-2">Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.</span>
              </blockquote>
              <br />
              <br />
              <p className="letter-spacing-2 line-h-5 font-6 color-5 m-0">We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.</p>
              <br />
              <p className="letter-spacing-2 line-h-5 font-6 color-5 m-0">Over 100 million people connect and share their wisdom on StoryNest every month. They’re software developers, amateur novelists, product designers, CEOs, and anyone burning with a story they need to get out into the world. They write about what they’re working on, what’s keeping them up at night, what they’ve lived through, and what they’ve learned that the rest of us might want to know too.</p>
              <br />
              <p className="letter-spacing-2 line-h-5 font-6 color-5 m-0">Instead of selling ads or selling your data, we’re supported by a growing community of over a million StoryNest members who believe in our mission. If you’re new here, start reading . Dive deeper into whatever matters to you. Find a post that helps you learn something new, or reconsider something familiar—and then write your story</p>
            </div>
          </section>
          {/* footer */}
          <div className="flex items-center justify-between padding-3 bdr-1 custom-bdr-5">
            <Link to="/" className="cursor-pointer m-0 p-0">
              <img loading="lazy" className="custom-h-2 w-auto align-middle" src={logo} />
            </Link>
            <div className="flex padding-6">
              {footerOptions.map((item) => (
                <Link to={item.path} className="cursor-pointer m-0 p-0 margin-5 underline" key={item.id}>
                  <p className="line-h-7 font-8 color-3 m-0">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
