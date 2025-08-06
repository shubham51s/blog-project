import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

function HomeMainContentComp() {
  const [recommendedTopics, setRecommendedTopics] = useState([
    {
      id: 0,
      name: "For you",
      title: "Recommended stories based on your reading history",
    },
    {
      id: 1,
      name: "Java",
      title: "Recommended stories about Java",
    },
    {
      id: 2,
      name: "Freelancing",
      title: "Recommended stories about Freelancing",
    },
    {
      id: 3,
      name: "DevOps",
      title: "Recommended stories about DevOps",
    },
    {
      id: 4,
      name: "World",
      title: "Recommended stories about World",
    },
    {
      id: 5,
      name: "Economics",
      title: "Recommended stories about Economics",
    },
    {
      id: 6,
      name: "NLP",
      title: "Recommended stories about NLP",
    },
    {
      id: 7,
      name: "Philosophy",
      title: "Recommended stories about Philosophy",
    },
    {
      id: 8,
      name: "Defi",
      title: "Recommended stories about Defi",
    },
    {
      id: 9,
      name: "UI",
      title: "Recommended stories about ",
    },
    {
      id: 10,
      name: "Nodejs",
      title: "Recommended stories about Nodejs",
    },
    {
      id: 11,
      name: "Creativity",
      title: "Recommended stories about Creativity",
    },
    {
      id: 12,
      name: "UX Design",
      title: "Recommended stories about UX Design",
    },
    {
      id: 13,
      name: "Flutter",
      title: "Recommended stories about Flutter",
    },
    {
      id: 14,
      name: "AWS",
      title: "Recommended stories about AWS",
    },
  ]);

  const topicContainerRef = useRef();

  const handlePrevNextBtnClick = (type) => {
    if (type === "next") {
    } else {
    }
  };

  return (
    <main className="width-20 flex-grow flex-shrink basis-auto block">
      <div className="block">
        {/* section-1 */}
        <div className="height-10"></div>

        {/* section-2 working */}
        <div className="sticky top-2 z-[499] custom-bg-8">
          <div className="flex justify-center">
            <div className="w-full max-width-2 my-0 margin-12 min-w-0">
              <div className="padding-18 pb-0">
                <div className="box-shadow-2 overflow-hidden relative">
                  <div className="flex padding-18 items-center scrollbar-none overflow-y-hidden overflow-x-auto">
                    <div className="min-w-max bdr-5 margin-7 padding-31" style={{ marginLeft: 0, marginBlock: 0, borderTop: 0, borderInline: 0, paddingInline: 0, paddingTop: 0 }}>
                      <div>
                        <div className="inline-block">
                          <div className="outline-none">
                            <Link to="/" className="p-0 m-0 no-underline cursor-pointer">
                              <div className="custom-fs-1 color-6 custom-line-h-1 font-normal transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                                <div className="padding-30 inline-block rounded-full" style={{ paddingBlock: 0 }}>
                                  <IoMdAdd className="height-17 width-25 align-middle" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* active topic border & all pending */}
                    {recommendedTopics.map((item) => (
                      <div className={`margin-21 min-w-max padding-18 pt-0 bdr-5`} key={item.id} title={item.title} style={{ marginBlock: 0, paddingTop: 0, borderTop: 0, borderInline: 0 }}>
                        <div className="inline-block outline-none">
                          <div className="p-0 m-0 cursor-pointer no-underline transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                            <div className="custom-fs-1 cursor-pointer custom-line-h-1 color-6 font-normal">
                              <button className="whitespace-nowrap border-0 p-0 m-0 bg-transparent cursor-pointer">{item.name}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* right arrow */}
                  <div onClick={() => handlePrevNextBtnClick("next")} className="absolute bg-gradient-1 padding-29 top-0 bottom-1 right-0 flex items-center pointer-events-none opacity-100" style={{ paddingRight: 0, paddingBlock: 0 }}>
                    <button className="pointer-events-auto margin-23 cursor-pointer p-0 bg-transparent">
                      <div className="width-26 aspect-square align-middle">
                        <MdNavigateNext className="w-full h-full" />
                      </div>
                    </button>
                  </div>
                  {/* left arrow */}
                  <div onClick={() => handlePrevNextBtnClick("prev")} className="absolute bg-gradient-2 padding-29 left-0 top-0 bottom-1 flex items-center pointer-events-none opacity-100" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                    <button className="pointer-events-auto margin-23 cursor-pointer p-0 bg-transparent">
                      <div className="width-26 aspect-square align-middle">
                        <GrFormPrevious className="w-full h-full" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section-3 */}
        <div className="height-16"></div>

        {/* section-4 */}
        <div className=""></div>
      </div>
    </main>
  );
}

export default HomeMainContentComp;
