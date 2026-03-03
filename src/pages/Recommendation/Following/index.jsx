import React, { useEffect, useRef, useState } from "react";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import UserListItem from "../../../components/Recommendation/Common/UserListItem";
import PublicationListItem from "../../../components/Recommendation/Common/PublicationListItem";
import TopicListItem from "../../../components/Recommendation/Common/TopicListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Spinner from "../../../components/Common/Spinner";
import ViewAllFollowingUsers from "../../../components/Recommendation/Following/ViewAllFollowingModal";
import ViewAllFollowingTopics from "../../../components/Recommendation/Following/ViewFollowingTopicsModal";
import { defaultLoaderTime } from "../../../constants/constant";

function MyFollowing() {
  const { requestHandler } = useRequestHandler();
  const [usersCount, setUsersCount] = useState(0);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [topicsCount, setTopicsCount] = useState(0);
  const [followingTopics, setFollowingTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowTopicModal, setIsShowTopicModal] = useState(false);
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  const [defautlLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);

  const getMyFollowings = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/follow/top-followings");
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (result.data.user) {
          setUsersCount(result.data.user.count);
          setFollowingUsers(result.data.user.following);
        }
        if (result.data.topics) {
          setTopicsCount(result.data.topics.count);
          setFollowingTopics(result.data.topics.topics);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onFollowStatusChange = (isFollow) => {
    if (isFollow) setUsersCount((prev) => prev + 1);
    if (!isFollow) setUsersCount((prev) => prev - 1);
  };

  const onToggleInterest = (isAdd, topicId) => {
    if (isAdd) {
      setTopicsCount((prev) => prev + 1);
      const updatedTopics = followingTopics.map((item) => (item._id === topicId ? { ...item, isFollowing: true } : { ...item }));
      setFollowingTopics(updatedTopics);
    }
    if (!isAdd) {
      setTopicsCount((prev) => prev - 1);
      const updatedTopics = followingTopics.map((item) => (item._id === topicId ? { ...item, isFollowing: false } : { ...item }));
      setFollowingTopics(updatedTopics);
    }
  };

  const handleCloseTopicModal = () => {
    setIsShowTopicModal(false);
  };

  const handleCloseUserModal = () => {
    setIsShowUserModal(false);
  };

  useEffect(() => {
    getMyFollowings();

    if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);
    defaultLoaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
      defaultLoaderTimeout.current = null;
    }, defaultLoaderTime);
  }, []);

  return (
    <>
      <div className="flex m-auto justify-evenly width-18">
        <main className="grow shrink basis-auto width-20">
          <div className="flex justify-center">
            <div className="min-w-0 w-full max-width-2 margin-12">
              <div className="padding61">
                <NavSection />

                {(defautlLoader || isLoading) && (
                  <div className="w-full overflow-hidden flex justify-center items-end height85">
                    <Spinner />
                  </div>
                )}

                {!defautlLoader && !isLoading && followingTopics.length === 0 && followingUsers.length === 0 && (
                  <div>
                    {/* no data */}
                    <div className="text-center padding-42">
                      <div className="padding-42 padding89">
                        <h2 className="font-10 font-medium color-3 line20 m-0">You haven't followed anything</h2>
                      </div>
                      <p className="color-4 custom-fs-1 line20 font-normal m-0">Writers, publications and topics you've followed will appear here.</p>
                    </div>
                  </div>
                )}

                {!defautlLoader && !isLoading && (followingTopics.length > 0 || followingUsers.length > 0) && (
                  <div>
                    {/* writer */}
                    <div>
                      <h2 className="font-10 font-medium color-3 line20 m-0">{usersCount} writers</h2>
                      <div className="margin60 custom-margin-b-1">
                        {followingUsers.map((item) => (
                          <UserListItem key={item._id} user={item.followee} onFollowStatusChange={onFollowStatusChange} />
                        ))}

                        {usersCount > 5 && (
                          <div className="margin60">
                            <p className="custom-fs-1 color-4 line20 font-normal m-0">
                              <button onClick={() => setIsShowUserModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                                See all {`(${usersCount})`}
                              </button>
                            </p>
                          </div>
                        )}
                        <hr className="margin51 bg-11 height86 border-0" />
                      </div>
                    </div>

                    {/* publication */}
                    {false && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">4 publications</h2>
                        <div className="margin60 custom-margin-b-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <PublicationListItem key={index} />
                          ))}
                          <div className="margin60">
                            <p className="custom-fs-1 color-4 line20 font-normal m-0">
                              <button className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">See all (33)</button>
                            </p>
                          </div>
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}

                    {/* topics */}
                    <div>
                      <h2 className="font-10 font-medium color-3 line20 m-0">{topicsCount} topics</h2>
                      <div className="margin60 custom-margin-b-1">
                        {followingTopics.map((item) => (
                          <TopicListItem key={item._id} item={item} onToggleInterest={onToggleInterest} />
                        ))}
                        {topicsCount > 5 && (
                          <div className="margin60">
                            <p className="custom-fs-1 color-4 line20 font-normal m-0">
                              <button onClick={() => setIsShowTopicModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                                See all {`(${topicsCount})`}
                              </button>
                            </p>
                          </div>
                        )}
                        <hr className="margin51 bg-11 height86 border-0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <div className="width-22 width-21 padding-24 padding75 height-13 bdr-5 custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}>
          <RightSection />
        </div>
      </div>
      {isShowTopicModal && <ViewAllFollowingTopics handleCloseTopicModal={handleCloseTopicModal} topicsCount={topicsCount} onToggleInterest={onToggleInterest} />}
      {isShowUserModal && <ViewAllFollowingUsers usersCount={usersCount} handleCloseUserModal={handleCloseUserModal} onFollowStatusChange={onFollowStatusChange} />}
    </>
  );
}

export default MyFollowing;
