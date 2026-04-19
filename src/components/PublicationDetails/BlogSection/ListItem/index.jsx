import React from "react";
import { Link } from "react-router-dom";
import noPreview from "../../../../assets/images/noPreviewImage.png";
import { getImageUrl } from "../../../../utils/common";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";

function ListItem({ item }) {
  return (
    <div className="col-span-2">
      <article className="h-full">
        <div className="box-content h-full">
          <div className="h-full w-full">
            <div className="relative h-full flex flex-col custom-gap-2">
              <Link to={`/${item.slug}/${item._id}`} className="block">
                <img src={item.previewImg ? getImageUrl(item.previewImg) : noPreview} className="w-full border-radius-5 bg-10 object-cover aspect-[2/1] object-center" />
              </Link>
              <div>
                <div className="w-full flex flex-col">
                  <div className="box-border break-words">
                    <div>
                      <Link to={`/${item.slug}/${item._id}`} className="flex flex-col cursor-pointer m-0 p-0">
                        <h2 className="height84 line-clamp-4 font-3 line-h-8 font-semibold color-3 m-0">{item.previewTitle}</h2>
                        <div className="padding72" style={{ paddingBottom: 0 }}>
                          <h3 className="height-15 line20 font-10 line-clamp-2 color-3 font-normal m-0">{item.previewSubtitle}</h3>
                        </div>
                      </Link>
                    </div>

                    <div className="font-4 color-4 line20 font-normal">
                      <div className="margin-7 flex items-center" style={{ marginBottom: 0, marginInline: 0 }}>
                        <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <Link to={`/profile/${item.author.username}`} className="cursor-pointer m-0 p-0">
                            <div className="relative">
                              <img src={item.author.profileImg} className="width86 aspect-square rounded-full" />
                              <div className="absolute top-0 width86 aspect-square rounded-full boxShadow7"></div>
                            </div>
                          </Link>
                        </div>
                        <div>
                          <Link to={`/profile/${item.author.username}`} className="cursor-pointer m-0 p-0 flex items-center">
                            <p className="break-all height-6 font-4 color-4 line20 font-normal m-0 transition-all duration-75 ease hover:underline">{item.author.name}</p>
                          </Link>
                        </div>
                        <Link to={`/${item.slug}/${item._id}`} className="flex items-center">
                          <span className="margin-19" style={{ marginBlock: 0 }}>
                            <span className="custom-fs-1 color-4 line20 font-normal">•</span>
                          </span>
                          <span className="whitespace-nowrap">{formatMonthAndDayShort(item.createdAt)}</span>
                          <span className="margin-19" style={{ marginBlock: 0 }}>
                            <span className="custom-fs-1 color-4 line20 font-normal">•</span>
                          </span>
                          <span className="whitespace-nowrap color-4">{item.readingTime} min read</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ListItem;
