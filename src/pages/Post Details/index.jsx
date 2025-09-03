import React, { useState } from "react";
import HeaderComp from "../../components/Home/Home components/Header";
import HomeLeftMenuComp from "../../components/Home/Home components/Left Menu";

function PostDetailsPage() {
  const [blogDetails, setBlogDetails] = useState({
    id: 1,
    name: "",
    community: {
      name: "Philosophy Today",
      image: "https://miro.medium.com/v2/resize:fill:48:48/1*PUDx_xvsheMfWyuDj5_Kxg.png",
      description: "Philosophy Today is dedicated to current philosophy, logic, and thought.",
    },
    heading: "Why the Middle Class Suffers the Most: The Paradox of Choice",
    description: "How Trying to Optimize Your Life is Part of the Problem",
  });

  return (
    <div className="custom-bg-8">
      <HeaderComp />
      {/* home content */}
      <div className="flex">
        <HomeLeftMenuComp />
        {/* width need to check later given different width than original */}
        <div className="width-17 grow-1 shrink-1 basis-auto">
          <div>
            <div className="bdr-5 w-full">
              <div className="height-55 w-full"></div>
              <div className="flex justify-center">
                <div className="margin-27 w-full min-w-0 custom-max-w-1" style={{ marginBlock: 0 }}>
                  <div className="height-3 flex items-center">
                    <div className="width-32">
                      <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                        <h2 className="line-h-8 font-3 font-medium color-3 p-0 m-0">
                          <div className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden">{blogDetails.community.name}</div>
                        </h2>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=""></div>

            <div className="absolute translateY-1 top-0 width-17 transition-all duration-300 ease-out opacity-100 pointer-none">
              <div className="flex justify-center">
                <div className="margin-27 min-w-0 w-full custom-max-w-1" style={{ marginBlock: 0 }}>
                  <div className="width-30 flex items-start flex-col">
                    <a href="#" className="no-underline p-0 m-0">
                      <div className="relative">
                        <img src={blogDetails.community.image} alt={blogDetails.community.name} className="width-31 aspect-square border-radius-5 block align-middle" />
                      </div>
                    </a>
                    <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                    <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0">
                      <span>{blogDetails.community?.description}</span>
                    </p>
                    <div className="margin-21" style={{ marginBottom: 0, marginInline: 0 }}></div>
                    <p className="color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">
                      <button className="underline cursor-pointer m-0 p-0">Follow publication</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-28" style={{ marginTop: 0, marginInline: 0 }}>
              <div className="flex justify-center">
                <div className="w-full min-w-0 max-width-2 margin-12"></div>
              </div>

              <article>
                <div className="break-words">
                  <div className="flex justify-center">
                    <div className="w-full min-w-0 max-width-2 margin-12">
                      <div>
                        <h1 className="letter-spacing-7 line-h-10 font-12 margin-30 mt-0 font-bold color-3">{blogDetails.heading}</h1>
                      </div>
                      <div>
                        <h2 className="line-h-3 margin-31 font-2 margin-17 color-4 font-normal">{blogDetails.description}</h2>
                      </div>
                      {/* working */}
                      <figure className=""></figure>
                      <p className=""></p>
                      <p className=""></p>
                      <p className=""></p>
                    </div>
                  </div>
                </div>
              </article>

              <div className="flex justify-center"></div>
            </div>

            <div className=""></div>

            <footer className="margin-28 static height-54 height-53 border-t-0 box-content flex items-center custom-bg-8" style={{ marginTop: 0, marginInline: 0 }}></footer>

            <div className="margin-27" style={{ marginTop: 0, marginInline: 0 }}></div>

            <div className="margin-29" style={{ marginTop: 0, marginInline: 0 }}></div>

            <div className="padding-34 bg-10" style={{ paddingBottom: 0, paddingInline: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
