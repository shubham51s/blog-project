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

  const [blogs, setBlogs] = useState([
    { _id: 1, profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*x03RC4xTP5f1EZ6sew_n0w.jpeg", images: "https://miro.medium.com/v2/resize:fill:200:134/1*Rjb2s95x1IljX_vfahIVdg.avif", userName: "Robin Sanah Kai", channelName: "Word Garden", title: "10 “Fresh” Design Trends We Shamelessly Stole From the Past", description: "An unconventional and compassionate guide to becoming an early bird", createtAt: "5d ago", likes: "9", comments: 4 },
    { _id: 2, profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*x03RC4xTP5f1EZ6sew_n0w.jpeg", images: "https://miro.medium.com/v2/da:true/resize:fill:100:66/g:fp:0.45:0.42/1*UeYfTm8_eiAJptIUZabGOQ.gif", userName: "Devon Price", channelName: "Human Parts", title: "Laziness Does Not Exist", description: "Psychological research is clear: when people procrastinate, there's usually a good reason", createtAt: "Mar 24, 2018", likes: "254k", comments: 2585 },
    { _id: 3, profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*x03RC4xTP5f1EZ6sew_n0w.jpeg", images: "https://miro.medium.com/v2/resize:fill:320:214/1*4zC5ohNcmVDb1NXmzCvmNA.jpeg", userName: "Julie Zhuo", channelName: "The Year of the Looking Glass", title: "How to Think About Your Career", description: "If you had asked 22-year-old me what my “career aspirations” were, I would have looked at you blankly and then casually changed the subject…", createtAt: "July 26, 2016", likes: "29K", comments: 490 },
    { _id: 4, isBookmarked: true, profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*x03RC4xTP5f1EZ6sew_n0w.jpeg", images: "https://miro.medium.com/v2/resize:fill:200:134/1*Rjb2s95x1IljX_vfahIVdg.avif", userName: "Scripting Soul", title: "React Component Design: 9 Architecture Patterns That Make Your UI Bulletproof", description: "React gives you incredible freedom. But with freedom comes inconsistency, spaghetti code, and team confusion — unless you use design…", createtAt: "Jun 21", likes: "181", comments: 4 },
    { _id: 5, profileUrl: "	https://miro.medium.com/v2/resize:fill:40:40/1*3qgCwMpj-q4oKW3ngVkyUg.jpeg", images: "https://miro.medium.com/v2/da:true/resize:fill:320:214/0*luPh_V4RH2SnJNqB", userName: "The CS Engineer", title: "Stop Using JSS in React — CSS Modules Are Way Faster", description: "Your CSS choices can kill your performance.", createtAt: "6d ago", likes: "64", comments: 2 },
    { _id: 6, profileUrl: "https://miro.medium.com/v2/resize:fill:40:40/1*e7o4kbk8ofT6eKaLrO0jaw.png", images: "https://miro.medium.com/v2/resize:fill:200:134/1*Rjb2s95x1IljX_vfahIVdg.avif", userName: "Saurav Mandal", title: "How to *really* know you’re in love", description: "Because most of “the signs” they tell you are garbage", createtAt: "Aug 3, 2017", likes: "161k", comments: 1485 },
  ]);

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const handleActiveTabChange = (index) => {
    if (index === activeTopicIndex) return;
    setActiveTopicIndex(index);
  };

  return (
    <main className="width-20 grow flex-shrink basis-auto block">
      <div className="block">
        {/* section-1 */}
        <div className="height-10"></div>

        {/* section-2 */}
        <div className="sticky top-2 z-[499] custom-bg-8">
          <div className="flex justify-center">
            <div className="w-full max-width-2 my-0 margin-12 min-w-0">
              <div className="padding-18 pb-0">
                <div className="box-shadow-2 overflow-hidden relative">
                  <div className="flex padding-18 w-full">
                    <div className="flex items-center scrollbar-none overflow-y-hidden overflow-x-auto bdr-5 w-full" style={{ borderTop: 0, borderInline: 0 }}>
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
        </div>

        {/* section-3 */}
        {/* <div className="height-16"></div> */}

        {/* section-4 */}
        <div>
          {false && <NoContentComp item={recommendedTopics[activeTopicIndex].noData} />}
          {blogs.map((item) => (
            <BlogComp item={item} key={item._id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomeMainContentComp;
