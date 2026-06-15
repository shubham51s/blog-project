import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import StaffListItem from "./StaffListItem";
import FollowListItem from "./FollowListItem";
import StaffListItemLoader from "./StaffListItem/skeleton";
import { CommonContext } from "../../../../context/commonContext";
import TopicListItem from "./TopicListItem";
import TopicListLoader from "./TopicListItem/skeleton";
import FollowListItemLoader from "./FollowListItem/skeleton";

function HomeRightSectionComp() {
  const { sidebarData, isLoading } = useContext(CommonContext);

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
    <div className="width-22 width-21 h-full overflow-y-auto bdr-5 padding-3 custom-bg-8 padding-24" style={{ borderRight: 0, borderBlock: 0, paddingBlock: 0 }}>
      <div className="relative inline-block h-full w-full">
        {/* position sticky & scroll need to check */}
        <div className="sticky top-2 mt-0">
          <div className="height-14 flex flex-col">
            <div className="grow shrink-0 basis-auto">
              {(isLoading || (!isLoading && sidebarData?.blogs?.length > 0)) && (
                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div className="margin-17" style={{ marginTop: 0 }}>
                    <div className="cursor-pointer m-0 p-0 no-underline">
                      <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">Staff Picks</h2>
                    </div>
                  </div>
                  <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
                    {/* staff pick posts */}
                    {!isLoading && sidebarData.blogs.slice(0, 3).map((item) => <StaffListItem item={item.blog} key={item._id} />)}
                    {isLoading && Array.from({ length: 3 }).map((_, i) => <StaffListItemLoader key={i} />)}
                  </div>
                  {/* <p className="custom-fs-1 color-4 custom-line-h-1 m-0 p-0">
                  <Link className="cursor-pointer m-0 p-0 no-underline font-medium custom-line-h-1 custom-fs-1">See the full list</Link>
                </p> */}
                </div>
              )}

              <div>
                {(isLoading || (!isLoading && sidebarData?.topics?.length > 0)) && (
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div>
                      <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
                        <h2 className="tracking-normal font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">Recommended topics</h2>
                      </div>
                      <div className="flex items-start flex-wrap">
                        {!isLoading && sidebarData.topics.map((item) => <TopicListItem item={item} key={item._id} />)}
                        {isLoading && Array.from({ length: 8 }).map((_, i) => <TopicListLoader key={i} />)}
                      </div>
                      <div className={`margin-6 ${!isLoading && sidebarData?.topics?.length >= 8 ? "visible" : "invisible"}`} style={{ marginBottom: 0 }}>
                        <p className="custom-fs-1 color-4 custom-line-h-1 font-medium m-0 p-0">
                          <Link to="/me/following/suggestions" className="cursor-pointer m-0 p-0 hover:underline transition-all duration-75 ease">
                            See more topics
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(isLoading || (!isLoading && sidebarData?.users?.length > 0)) && (
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div>
                      <div className="padding-18" style={{ paddingBottom: 0 }}>
                        <div>
                          <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
                            <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">Who to follow</h2>
                          </div>
                        </div>
                        <div>
                          {!isLoading && peopleToFollow.slice(0, 3).map((item) => <FollowListItem item={item} key={item.id} />)}
                          {isLoading && Array.from({ length: 6 }).map((_, i) => <FollowListItemLoader key={i} />)}
                        </div>
                      </div>
                      <div className={`padding-18 ${!isLoading && sidebarData?.users?.length >= 9 ? "visible" : "invisible"}`} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <p className="custom-fs-1 color-4 custom-line-h-1 m-0 p-0 font-medium">
                          <Link to="/me/following/suggestions" className="cursor-pointer m-0 p-0 hover:underline transition-all duration-75 ease">
                            See more suggestions
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {false && (
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div>
                      <h2 className="font-10 font-semibold color-3 custom-line-h-1 m-0 p-0">Reading list</h2>
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
                )}
              </div>
            </div>
            {/* footer */}
            <div className="flex padding-3 flex-wrap" style={{ paddingInline: 0, paddingTop: 0 }}>
              {/* {footerOptions.map((item) => (
                <div className="margin-24" style={{ marginLeft: 0, marginBlock: 0 }} key={item.id}>
                  <a href="#" className="no-underline cursor-pointer m-0 p-0">
                    <p className="font-8 line-h-7 color-4 font-normal m-0 p-0">{item.name}</p>
                  </a>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSectionComp;
