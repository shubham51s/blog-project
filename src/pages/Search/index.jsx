import React, { useState } from "react";
import HomeRightSectionComp from "../../components/Home/Home components/Home Right Content";
import HomeMainContentComp from "../../components/Home/Home components/Home Main Content";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";

function SearchPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  //   const search = searchParams.get("q");
  const search = "t";

  const recommendedTopics = [
    {
      id: 0,
      name: "Stories",
      path: "posts",
    },
    {
      id: 1,
      name: "People",
      path: "users",
    },
    {
      id: 2,
      name: "Publications",
      path: "publications",
    },
    {
      id: 3,
      name: "Topics",
      path: "tags",
    },
    {
      id: 4,
      name: "Lists",
      path: "lists",
    },
  ];

  const isTabActive = (item) => {
    return pathname.includes(item.path);
  };

  return (
    <div className="width-18 m-auto h-full overflow-hidden flex justify-evenly">
      {/* <Outlet /> */}
      <main className="width-20 h-full overflow-y-auto invisible-scrollbar grow flex-shrink basis-auto block">
        <div className="h-full flex flex-col">
          {/* <div className="height-10"></div> */}
          {/* <div className="sticky top-2 z-[499] custom-bg-8"> */}
          <div className="grow shrink-0 basis-auto">
            <div className="flex justify-center custom-bg-8">
              <div className="w-full max-width-2 my-0 margin-12 min-w-0">
                <div className="margin56 margin54">
                  <div className="margin57">
                    <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-all line-clamp-1 font-medium color-3 m-0">
                      <span className="opacity-[0.6]">Results for </span>
                      {search}
                    </h1>
                  </div>
                  {/* <div className="padding-18 pb-0"> */}
                  <div className="box-shadow-2 overflow-hidden relative">
                    <div className="flex padding-18 w-full">
                      <div className="flex items-center scrollbar-none overflow-y-hidden overflow-x-auto bdr-5 w-full" style={{ borderTop: 0, borderInline: 0 }}>
                        {/* active topic border & all pending */}
                        {recommendedTopics.map((item) => (
                          <div className={`margin-8 min-w-max padding-18 pt-0 bdr-6 first:!ml-0`} key={item.id} title={item.title} style={{ marginBlock: 0, paddingTop: 0, borderTop: 0, borderInline: 0, borderColor: isTabActive(item) ? "" : "transparent" }}>
                            <Link to={`${item.path}`} className="p-0 m-0 cursor-pointer no-underline">
                              <div className={`custom-fs-1 cursor-pointer custom-line-h-1 color-6 font-medium transition-all duration-75 ease hover:opacity-100 ${isTabActive(item) ? "opacity-100" : "opacity-70"}`}>
                                <div className="whitespace-nowrap border-0 p-0 m-0 bg-transparent">{item.name}</div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <Outlet context={search} />
          </div>
        </div>
      </main>
      <HomeRightSectionComp />
    </div>
  );
}

export default SearchPage;
