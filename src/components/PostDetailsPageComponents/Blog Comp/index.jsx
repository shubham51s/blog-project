import { Description } from "@mui/icons-material";
import React, { useState } from "react";

function BlogComp() {
  const [blogDetails, setBlogDetails] = useState({
    title: "How to Tell If Someone Is Actually Smart",
    description: "And 5 things that automatically don’t mean you’re smart",
    date: "Jul 31",
    img: "https://miro.medium.com/v2/resize:fit:849/format:webp/1*kcMrO6kCcd5Zr9WMf5FVyA.jpeg",
    community: {
      name: "ILLUMINATION",
      profileImg: "https://miro.medium.com/v2/resize:fill:25:25/1*AZxiin1Cvws3J0TwNUP2sQ.png",
    },
    writer: {
      name: "Yana Bostongirl",
    },
  });

  return (
    <div className="padding-39 grow-0" style={{ maxWidth: "50%", flexBasis: "50%", paddingBlock: 0 }}>
      <div className="padding-43 h-full" style={{ paddingTop: 0, paddingInline: 0 }}>
        <article className="h-full">
          <div className="h-full box-border">
            <div className="h-full w-full">
              <div className="grid relative h-full custom-gap-8 grid-rows-[auto_1fr] grid-cols-12 grid-area-1">
                <div className="[grid-area:image]">
                  <div>
                    <img src={blogDetails.img} alt={blogDetails.title} className="object-cover object-center aspect-[2/1] w-full align-middle" />
                  </div>
                </div>
                <div className="[grid-area:content] flex flex-col justify-center">
                  <div className="grow flex flex-col w-full">
                    <div className="margin-21 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                      <div className="margin-16" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <img src={blogDetails.community.profileImg} alt={blogDetails.community.name} className="height-12 aspect-square border-radius-5" />
                      </div>
                      <div className="padding-23 whitespace-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                        <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">In</p>
                      </div>
                      <div className="">
                        <p className="break-all text-ellipsis height-6 color-3 overflow-hidden font-4 custom-line-h-1 font-normal m-0 p-0">{blogDetails.community.name}</p>
                      </div>
                      <div className="padding-23" style={{ paddingBlock: 0 }}>
                        <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">by</p>
                      </div>
                      <div className="">
                        <p className="break-all text-ellipsis height-6 color-3 overflow-hidden font-4 custom-line-h-1 font-normal m-0 p-0">{blogDetails.writer.name}</p>
                      </div>
                    </div>

                    <div className="grow shrink-0 basis-auto padding-33 break-words" style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="">
                        <h2 className="height-61 line-h-8 font-3 font-bold text-ellipsis color-3 overflow-hidden m-0">{blogDetails.title}</h2>
                      </div>
                      <div className="padding-6" style={{ paddingBottom: 0, paddingInline: 0 }}>
                        <h3 className="height-15 text-ellipsis font-10 overflow-hidden color-4 custom-line-h-1 font-normal m-0">{blogDetails.description}</h3>
                      </div>
                    </div>

                    <span className="font-4 color-4 custom-line-h-1 font-normal">
                      <div className="height-50 flex justify-between">
                        <div className="flex custom-gap-2 items-center">
                          <span className="">{blogDetails.date}</span>
                          <div className="width-28 height-51 relative flex items-center">
                            {/* pending from here claps and comments icon with value */}
                            <a href="" className=""></a>
                          </div>
                        </div>
                        <div className="grow-0 shrink-0 basis-0 flex items-center justify-end"></div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogComp;
