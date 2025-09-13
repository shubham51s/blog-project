import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";

function HomeRightSectionComp() {
  const staffPickedPosts = [
    {
      id: 0,
      name: "Elizabeth Villano",
      img: "https://miro.medium.com/v2/resize:fill:40:40/0*P8MtVUVSdQsZYtfM.",
      title: "This Is What Censorship Looks Like in a National Park: The First Park Sign That Came Down",
      date: "Jul 22",
    },
    {
      id: 1,
      name: "Dr. Cheryl Fogle-Hatch",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*StB59injG6ZBN2B2iksKYg.png",
      title: "Learning About Places Through Touch",
      date: "3d ago",
    },
    {
      id: 2,
      name: "Zach Fernandez",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*N3GI4jUlY2HugYm1EtWdPg.jpeg",
      title: "Message Undelivered",
      date: "May 28",
    },
    {
      id: 3,
      name: "Zach Fernandez",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*N3GI4jUlY2HugYm1EtWdPg.jpeg",
      title: "Message Undelivered",
      date: "May 28",
    },
  ];

  const footerOptions = [
    { id: 0, name: "Help", path: "/" },
    { id: 1, name: "Status", path: "/" },
    { id: 2, name: "About", path: "/" },
    { id: 3, name: "Careers", path: "/" },
    { id: 4, name: "Press", path: "/" },
    { id: 5, name: "Blog", path: "/" },
    { id: 6, name: "Privacy", path: "/" },
    { id: 7, name: "Rules", path: "/" },
    { id: 8, name: "Terms", path: "/" },
    { id: 9, name: "Text to speech", path: "/" },
  ];

  const index = 3;

  const [isShowWritingSection, setIsShowWritingSection] = useState(true);
  const [RecommendedTopics, setRecommendedTopics] = useState([
    {
      id: 0,
      name: "Programming",
      path: "/",
    },
    {
      id: 1,
      name: "Writing",
      path: "/",
    },
    {
      id: 3,
      name: "Self Improvement",
      path: "/",
    },
    {
      id: 4,
      name: "Data Science",
      path: "/",
    },
    {
      id: 5,
      name: "Technology",
      path: "/",
    },
    {
      id: 6,
      name: "Relationships",
      path: "/",
    },
    {
      id: 7,
      name: "Cryptocurrency",
      path: "/",
    },
  ]);

  const [peopleToFollow, showPeopleToFollow] = useState([
    {
      id: 0,
      name: "Xinran Ma",
      profileImg: "https://miro.medium.com/v2/resize:fill:64:64/1*vApbrRD-tGko7Ifvhzc3cg.png",
      path: "/",
    },
    {
      id: 1,
      name: "Personal Growth",
      profileImg: "https://miro.medium.com/v2/resize:fill:64:64/1*vT9qT49CpcgqXBZAh-X3cA.jpeg",
      path: "/",
    },
    {
      id: 2,
      name: "Mark Simmons",
      profileImg: "https://miro.medium.com/v2/resize:fill:64:64/1*uPc0nFQIyN2ZCAuitoZZ2g.jpeg",
      path: "/",
    },
  ]);

  return (
    <div className="width-22 width-21 height-13 bdr-5 padding-3 custom-bg-8 padding-24" style={{ borderRight: 0, borderBlock: 0, paddingBlock: 0 }}>
      <div className="relative inline-block h-full w-full">
        {/* position sticky & scroll need to check */}
        <div className="sticky top-2 mt-0">
          <div className="height-14 flex flex-col">
            <div className="grow shrink-0 basis-auto">
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="margin-17" style={{ marginTop: 0 }}>
                  <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                    <h2 className="font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Staff Picks</h2>
                  </a>
                </div>

                <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
                  {/* staff pick posts */}
                  {staffPickedPosts.splice(0, 3).map((item, index) => (
                    <div key={index} className={index >= 2 ? "p-0" : "padding-14"} style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="h-full w-full">
                        <div className="flex items-center margin-7" style={{ marginTop: 0, marginInline: 0 }}>
                          <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <a href="#" className="no-underline">
                              <div className="relative">
                                {/* dynamic */}
                                <img src={item.img} alt="profile" className="border-radius-5 height-12 aspect-square align-middle" style={{ borderRadius: "50%" }} />
                                <div className="absolute border-radius-5 height-12 aspect-square top-0"></div>
                              </div>
                            </a>
                          </div>
                          {/* need to check */}
                          <div className="padding-23 flex-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                            <a href="#" className="cursor-pointer no-underline p-0 m-0 flex items-center">
                              <p className="break-all text-ellipsis height-6 overflow-hidden color-3 font-4 custom-line-h-1 font-normal m-0 p-0">{item.name}</p>
                            </a>
                          </div>
                        </div>
                        <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                          <div className="margin-7" style={{ marginTop: 0, marginInline: 0 }}>
                            <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0">{item.title}</h2>
                          </div>
                          <div className="flex items-center custom-gap-2">
                            <span className="font-4 color-4 custom-line-h-1 font-normal">{item.date}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="custom-fs-1 color-4 custom-line-h-1 m-0 p-0">
                  <Link to="/" className="cursor-pointer m-0 p-0 no-underline font-medium custom-line-h-1 custom-fs-1">
                    See the full list
                  </Link>
                </p>
              </div>

              <div>
                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0, display: isShowWritingSection ? "block" : "none" }}>
                  <div className="border-radius-3 bg-12">
                    <div className="float-right padding-25">
                      <div className="relative right-0 top-0">
                        <button onClick={(e) => setIsShowWritingSection(false)} className="cursor-pointer m-0 p-0 flex bg-transparent height-12 aspect-square transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
                          <IoClose className="color-46 align-middle w-full h-full" />
                        </button>
                      </div>
                    </div>
                    <div className="padding-26">
                      <div className="">
                        <h2 className="font-bold tracking-normal font-10 color-3 custom-line-h-1 m-0 p-0">Writing on Medium</h2>
                      </div>
                      <div className="margin-10" style={{ marginBottom: 0 }}>
                        <div className="margin-17" style={{ marginBottom: 0 }}>
                          <a href="#" className="cursor-pointer no-underline m-0 p-0">
                            <h2 className="tracking-normal font-10 color-3 color-3 custom-line-h-1 font-medium m-0 p-0">Join our Medium Writing 101 Webinar</h2>
                          </a>
                        </div>
                        <div className="margin-10" style={{ marginBottom: 0 }}>
                          <a href="#" className="cursor-pointer no-underline m-0 p-0">
                            <h2 className="tracking-normal font-10 color-3 color-3 custom-line-h-1 font-medium m-0 p-0">Read Medium tips & tricks</h2>
                          </a>
                        </div>
                        <div className="margin-10" style={{ marginBottom: 0 }}>
                          <a href="#" className="cursor-pointer no-underline m-0 p-0">
                            <h2 className="tracking-normal font-10 color-3 color-3 custom-line-h-1 font-medium m-0 p-0">Read Medium tips & tricks</h2>
                          </a>
                        </div>
                      </div>
                      <div className="margin-17" style={{ marginBottom: 0 }}>
                        <Link to="/create" className="text-center no-underline bdr-6 custom-bg-1 padding-28 padding-27 color-7 font-4 custom-line-h-1 font-normal inline-block box-border transition-all duration-300 ease-in-out opacity-[0.9] hover:opacity-100" style={{ borderRadius: "99em" }}>
                          Start writing
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div>
                    <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
                      <h2 className="tracking-normal font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Recommended topics</h2>
                    </div>
                    <div className="flex items-start flex-wrap">
                      {RecommendedTopics.map((item) => (
                        <div className="margin-10 flex" style={{ marginTop: 0 }} key={item.id}>
                          <Link to={item.path} className="margin-9 cursor-pointer p-0 m-0 no-underline" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <div className="custom-fs-1 color-3 bg-11 border-radius-6 whitespace-nowrap padding-5 font-medium">{item.name}</div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="margin-6" style={{ marginBottom: 0 }}>
                      <p className="custom-fs-1 color-4 custom-line-h-1 font-medium m-0 p-0">
                        <Link to="/" className="cursor-pointer m-0 p-0 no-underline">
                          See more topics
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div>
                    <div className="padding-18" style={{ paddingBottom: 0 }}>
                      <div>
                        <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
                          <h2 className="font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Who to follow</h2>
                        </div>
                      </div>
                      <div>
                        {peopleToFollow.slice(0, 3).map((item) => (
                          <div className="h-full w-full" key={item.id}>
                            <div className="padding-18 flex items-start justify-between w-full" style={{ paddingTop: 0 }}>
                              <div className="flex items-center justify-center">
                                <a href="#" className="no-underline shrink-0">
                                  <div className="relative">
                                    <img src={item.profileImg} alt={item.name} className="width-11 aspect-square align-middle" style={{ borderRadius: "50%" }} />
                                  </div>
                                </a>
                                <div className="margin-16 overflow-hidden text-ellipsis" style={{ marginBlock: 0 }}>
                                  <a href="#" className="cursor-pointer m-0 p-0 no-underline overflow-hidden text-ellipsis">
                                    <h2 className="height-15 font-bold overflow-hidden text-ellipsis font-10 color-3 custom-line-h-1 m-0 p-0">{item.name}</h2>
                                  </a>
                                </div>
                              </div>
                              <div className="width-23">
                                <div className="inline-block">
                                  <button className="flex items-center justify-center bdr-7 padding-20 padding-28 width-24 border-radius-7 bg-transparent cursor-pointer m-0">
                                    <span className="color-3 custom-fs-1 custom-line-h-1 w-full font-normal">
                                      <span className="break-all inline-block">Follow</span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="padding-18" style={{ paddingBottom: 0 }}>
                      <p className="custom-fs-1 color-4 custom-line-h-1 m-0 p-0 font-normal">
                        <Link to="/" className="cursor-pointer m-0 p-0 no-underline">
                          See more suggestions
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div>
                    <h2 className="font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Reading list</h2>
                    <div className="padding-18" style={{ paddingBottom: 0 }}>
                      <div className="custom-fs-1 color-4 custom-line-h-1 m-0 p-0 font-normal">
                        Click the{" "}
                        <div className="inline-block custom-h-2 aspect-square margin-23 align-middle">
                          <CiBookmarkPlus className="w-full h-full" style={{ marginTop: 0, marginInline: 0 }} />
                        </div>{" "}
                        on any story to easily add it to your reading list or a custom list that you can share.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="flex padding-3 flex-wrap" style={{ paddingInline: 0 }}>
              {footerOptions.map((item) => (
                <div className="margin-24" style={{ marginLeft: 0, marginBlock: 0 }} key={item.id}>
                  <a href="#" className="no-underline cursor-pointer m-0 p-0">
                    <p className="font-8 line-h-7 color-4 font-normal m-0 p-0">{item.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSectionComp;
