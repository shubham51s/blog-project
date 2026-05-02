import React from "react";
import { Link } from "react-router-dom";

function ListItem() {
  return (
    <tr>
      <td className="w-full padding83 padding62">
        <Link className="h-full cursor-pointer m-0 p-0">
          <div className="width103">
            <div className="flex flex-col custom-gap-5">
              <h2 className="height90 font-bold font-10 color-3 line20 m-0 line-clamp-3">The Single Most Prevalent AI Writing Tell (Spoiler Alert — It’s Not Em Dashes)</h2>
              <div className="font-4 color-4 line20 font-normal">
                <div className="flex items-center flex-wrap">
                  <span>1 min read</span>
                  <div className="padding50">
                    <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                  </div>
                  <span>Apr 16, 2026</span>
                  <div className="padding50">
                    <span className="color-4 custom-fs-1 line20 font-normal">•</span>
                  </div>
                  <span className="underline cursor-pointer m-0 p-0">View story</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <Link className="h-full cursor-pointer m-0 p-0">
          <span className="line-h-8 font-10 color-3 font-normal">53</span>
        </Link>
      </td>
      <td className="width101 padding83 padding-24 padding62 text-center">
        <Link className="h-full cursor-pointer m-0 p-0">
          <span className="line-h-8 font-10 color-3 font-normal">7</span>
        </Link>
      </td>
    </tr>
  );
}

export default ListItem;
