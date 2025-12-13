import React, { useContext, useEffect, useRef } from "react";
import logo from "../../../assets/images/mediumLogo.png";
import brandImage from "../../../assets/images/brandLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

function UnauthenticatedHome() {
  const { setIsLoginTabActive, setIsShowLoginPopup } = useContext(UserContext);
  const footerOptions = ["Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Rules", "Terms", "Text to speech"];
  const navOptions = [
    { id: 1, name: "Our Story", path: "/about" },
    { id: 2, name: "Membership", path: "/" },
    { id: 3, name: "Write", path: "/create" },
    { id: 4, name: "Sign", path: "/login" },
  ];

  const navigate = useNavigate();
  const loginRef = useRef();
  const signupRef = useRef();
  const writePostRef = useRef();

  const handleShowSignupBtnClick = () => {
    setIsLoginTabActive(false);
    setIsShowLoginPopup(true);
  };

  const handleLoginBtnClick = (path) => {
    if (path === "login") {
      setIsLoginTabActive(true);
      setIsShowLoginPopup(true);
    } else if (path === "create") {
      setIsLoginTabActive(false);
      setIsShowLoginPopup(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col font-normal custom-bg-2">
      <div className="grow shrink-0 basis-auto overflow-hidden custom-min-h-1 flex flex-col">
        <div className="transition-colors duration-300 ease-linear bdr-1 custom-bdr-3 w-full">
          <div className="flex justify-center">
            <div className="my-0 custom-m-x-1 w-full">
              <div className="flex custom-h-1 custom-p-y-1 px-0 items-center">
                <div>
                  <span className="cursor-pointer m-0 p-0" onClick={() => navigate("/")}>
                    <img className="custom-h-2 w-auto" src={logo} />
                  </span>
                </div>
                <div className="grow shrink-0 basis-auto"></div>
                <div className="flex items-center font-medium">
                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="color-3 custom-fs-1 font-sans">
                        <a onClick={() => navigate("/about")} className="cursor-pointer m-0 p-0 ">
                          Our Story
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="color-3 custom-fs-1 font-sans">
                        <a className="cursor-pointer m-0 p-0 ">Membership</a>
                      </p>
                    </div>
                  </div>

                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="color-3 custom-fs-1 font-sans">
                        <a onClick={() => handleLoginBtnClick("create")} ref={writePostRef} className="cursor-pointer m-0 p-0 ">
                          Write
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="inline-block">
                    <div className="custom-m-r">
                      <p className="color-3 custom-fs-1 font-sans">
                        <a onClick={() => handleLoginBtnClick("login")} ref={loginRef} className="cursor-pointer m-0 p-0 ">
                          Sign
                        </a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <span>
                      <a className="cursor-pointer m-0 p-0" onClick={handleShowSignupBtnClick} ref={signupRef}>
                        <button id="SignupBtn" className="cursor-pointer transition-colors color-2 duration-300 ease-linear text-center no-underline inline-block bdr-1 rounded-full custom-bdr-1 custom-bg-1 fill-white custom-px-2 custom-py-2 custom-line-h-1 custom-fs-1">
                          Get started
                        </button>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow w-full flex overflow-hidden justify-center items-center">
          <div className="custom-margin-1 w-full min-w-0 custom-max-w-1 font-normal">
            <div>
              <div className="left-unset right-0 transform -translate-y-1/2 top-[54%] absolute">
                <img src="	https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="brand image" className="align-middle custom-img-1" />
              </div>
            </div>
            <div className="custom-margin-b-1 custom-max-width-1">
              <span>
                <h2 className="letter-spacing-1 line-h-2 font-size-1 bg-3 color-3 m-0">
                  Human <br></br>stories & ideas
                </h2>
              </span>
            </div>
            <div className="custom-margin-b-1">
              <h3 className="line-h-3 font-2 color-3 m-0 font-normal">A place to read, write, and deepen your understanding</h3>
            </div>
            <div>
              <button className="line-h-3 font-3 width-2 padding-1 text-center no-underline inline-block box-border bdr-1 rounded-full custom-bdr-2 custom-bg-1 color-2 font-normal m-0 overflow-visible">Start reading</button>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="custom-bg-2">
        <div>
          <div>
            <div className="h-0 bdr-1 custom-bdr-3 w-full"></div>
            <div className="flex justify-center">
              <div className="w-full max-width-2 margin-2 min-w-0">
                <div className="flex flex-wrap padding-2">
                  {footerOptions.map((item, index) => (
                    <div className="margin-3 mb-0" key={index}>
                      <a className="cursor-pointer m-0 p-0 no-underline">
                        <p className="color-4 font-4 custom-line-h-1 font-normal m-0">{item}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthenticatedHome;
