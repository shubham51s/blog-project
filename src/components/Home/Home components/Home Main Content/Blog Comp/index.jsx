import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BlogComp() {
  const handleUserProfileClick = () => {
    useNavigate("/");
  };

  const blog = {
    profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*x03RC4xTP5f1EZ6sew_n0w.jpeg",
    userName: "Robin Sanah Kai",
    channelName: "Word Garden",
  };

  return (
    <div className="height-18 overflow-hidden">
      <div className="flex justify-center">
        <div className="w-full max-width-2 margin-2 min-w-0">
          <div className="w-full">
            <article>
              <div className="box-content">
                <div className="w-full h-full">
                  <div className="flex relative">
                    <div className="w-full">
                      {/* writer section */}
                      <div className="flex w-full">
                        <div className="margin-21 flex items-center w-full" style={{ marginTop: 0, marginInline: 0 }}>
                          <div className="margin-9 shrink-0" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <div onClick={() => handleUserProfileClick()} className="relative z-[2] no-underline cursor-pointer">
                              <div className="relative">
                                <img className="height-12 aspect-square box-border rounded-full align-middle" src={blog.profileUrl} alt={blog.name} />
                                <div className="height-12 aspect-square absolute top-0 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div onClick={() => handleUserProfileClick()} className="z-[2] relative cursor-pointer flex items-center grow min-w-0">
                            <div className="truncate w-[60%] text-ellipsis whitespace-nowrap color-3 height-6 font-4 custom-line-h-1">
                              {blog.channelName && <span className="font-light">In </span>}
                              <span className="font-normal no-underline hover:underline">{blog.userName}</span>
                              {blog.channelName && <span className="font-light"> by </span>}
                              {blog.channelName && <span className="font-normal no-underline hover:underline">{blog.channelName}</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* blog section */}
                      <div className="flex"></div>
                    </div>
                  </div>
                  <div className="margin-11 h-0 bdr-5 w-full" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComp;
