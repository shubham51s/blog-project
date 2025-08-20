import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import NoContentComp from "./No Content";
import BlogComp from "./Blog Comp";

function HomeMainContentComp() {
  const [recommendedTopics, setRecommendedTopics] = useState([
    {
      id: 0,
      name: "For you",
      title: "Recommended stories based on your reading history",
      noData: {
        title: "No recommended stories",
        description: "Recommended stories for you will appear here.",
        action: "View recommended publications",
        path: "/",
      },
    },
    {
      id: 1,
      name: "Featured",
      title: "Featured stories from publications you follow",
      noData: {
        title: "No featured stories",
        description: "Featured stories from the publications you follow will appear here.",
        action: "View recommended publications",
        path: "/",
      },
    },
  ]);

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const handleActiveTabChange = (index) => {
    if (index === activeTopicIndex) return;
    setActiveTopicIndex(index);
  };

  return (
    <main className="width-20 flex-grow flex-shrink basis-auto block">
      <div className="block">
        {/* section-1 */}
        <div className="height-10"></div>

        {/* section-2 */}
        <div className="sticky top-2 z-[499] custom-bg-8">
          <div className="flex justify-center">
            <div className="w-full max-width-2 my-0 margin-12 min-w-0">
              <div className="padding-18 pb-0">
                <div className="box-shadow-2 overflow-hidden relative">
                  <div className="flex padding-18 items-center scrollbar-none overflow-y-hidden overflow-x-auto">
                    {/* active topic border & all pending */}
                    {recommendedTopics.map((item) => (
                      <div className={`margin-21 min-w-max padding-18 pt-0 bdr-6`} key={item.id} title={item.title} style={{ marginBlock: 0, paddingTop: 0, borderTop: 0, borderInline: 0, borderColor: activeTopicIndex == item.id ? "" : "transparent" }}>
                        <div className="inline-block outline-none">
                          <div className="p-0 m-0 cursor-pointer no-underline">
                            <div onClick={() => handleActiveTabChange(item.id)} className={`custom-fs-1 cursor-pointer custom-line-h-1 color-6 font-medium transition-all duration-300 ease-in-out hover:opacity-100 ${activeTopicIndex == item.id ? "opacity-100" : "opacity-75"}`}>
                              <button className="whitespace-nowrap border-0 p-0 m-0 bg-transparent cursor-pointer">{item.name}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section-3 */}
        <div className="height-16"></div>

        {/* section-4 */}
        <div>
          {false && <NoContentComp item={recommendedTopics[activeTopicIndex].noData} />}
          <BlogComp />
        </div>
      </div>
    </main>
  );
}

export default HomeMainContentComp;
