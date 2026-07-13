import React, { useEffect, useRef, useState } from "react";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import UserListItem from "../../../components/Recommendation/Common/UserListItem";
import TopicListItem from "../../../components/Recommendation/Common/TopicListItem";
import PublicationListItem from "../../../components/Recommendation/Common/PublicationListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Spinner from "../../../components/Common/Spinner";
import ViewAllFollowingUsers from "../../../components/Recommendation/Following/ViewAllFollowingModal";
import ViewAllFollowingTopics from "../../../components/Recommendation/Following/ViewFollowingTopicsModal";
import { defaultLoaderTime } from "../../../constants/constant";
import ViewAllFollowingPublications from "../../../components/Recommendation/Following/AllFollowingPublicationsModal";
import { Link } from "react-router-dom";

function MyFollowing() {
  const { requestHandler } = useRequestHandler();
  const [usersCount, setUsersCount] = useState(0);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [topicsCount, setTopicsCount] = useState(0);
  const [followingTopics, setFollowingTopics] = useState([]);
  const [publicationsCount, setPublicationsCount] = useState(0);
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowTopicModal, setIsShowTopicModal] = useState(false);
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  const [isShowPublicationModal, setIsShowPublicationModal] = useState(false);
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
        if (result.data.publication) {
          setPublicationsCount(result.data.publication.count);
          setPublications(result.data.publication.publications);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPublicationFollowStatusChange = (isFollow) => {
    if (isFollow) setPublicationsCount((prev) => prev + 1);
    if (!isFollow) setPublicationsCount((prev) => prev - 1);
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

  const handleClosePublicationModal = () => {
    setIsShowPublicationModal(false);
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

                {!defautlLoader && !isLoading && followingTopics.length === 0 && followingUsers.length === 0 && publications.length === 0 && (
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

                {!defautlLoader && !isLoading && (followingTopics.length > 0 || followingUsers.length > 0 || publications.length > 0) && (
                  <div>
                    {/* writer */}
                    {followingUsers.length > 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">{usersCount} writers</h2>
                        <div className="margin60 custom-margin-b-1">
                          {followingUsers.map((item) => (
                            <UserListItem key={item._id} user={item.followee} onFollowStatusChange={onFollowStatusChange} />
                          ))}

                          {followingUsers.length >= 5 && (
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
                    )}
                    {followingUsers.length === 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">Writers</h2>
                        <div className="margin60 custom-margin-b-1">
                          <div className="padding-42 w-full flex flex-col items-center">
                            <p className="color-4 custom-fs-1 line20 font-normal m-0">You haven't followed any writers yet.</p>
                            <div className="padding80">
                              <p className="color-4 custom-fs-1 line20 font-normal m-0">
                                <Link to="suggestions" className="cursor-pointer m-0 p-0">
                                  See suggestions
                                </Link>
                              </p>
                            </div>
                          </div>
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}

                    {/* publication */}
                    {publications.length > 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">{publicationsCount} publications</h2>
                        <div className="margin60 custom-margin-b-1">
                          {publications.map((item) => (
                            <PublicationListItem key={item._id} item={item.followee} onPublicationFollowStatusChange={onPublicationFollowStatusChange} />
                          ))}
                          {publications.length >= 5 && (
                            <div className="margin60">
                              <p className="custom-fs-1 color-4 line20 font-normal m-0">
                                <button onClick={() => setIsShowPublicationModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                                  See all {`(${publicationsCount})`}
                                </button>
                              </p>
                            </div>
                          )}
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}
                    {publications.length === 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">Publications</h2>
                        <div className="margin60 custom-margin-b-1">
                          <div className="padding-42 w-full flex flex-col items-center">
                            <p className="color-4 custom-fs-1 line20 font-normal m-0">You haven't followed any publications yet.</p>
                            <div className="padding80">
                              <p className="color-4 custom-fs-1 line20 font-normal m-0">
                                <Link to="suggestions" className="cursor-pointer m-0 p-0">
                                  See suggestions
                                </Link>
                              </p>
                            </div>
                          </div>
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}

                    {/* topics */}
                    {followingTopics.length > 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">{topicsCount} topics</h2>
                        <div className="margin60 custom-margin-b-1">
                          {followingTopics.map((item) => (
                            <TopicListItem key={item._id} item={item} onToggleInterest={onToggleInterest} />
                          ))}
                          {followingTopics.length >= 5 && (
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
                    )}
                    {followingTopics.length === 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">Topics</h2>
                        <div className="margin60 custom-margin-b-1">
                          <div className="padding-42 w-full flex flex-col items-center">
                            <p className="color-4 custom-fs-1 line20 font-normal m-0">You haven't followed any topics yet.</p>
                            <div className="padding80">
                              <p className="color-4 custom-fs-1 line20 font-normal m-0">
                                <Link to="suggestions" className="cursor-pointer m-0 p-0">
                                  See suggestions
                                </Link>
                              </p>
                            </div>
                          </div>
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}
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
      {isShowPublicationModal && <ViewAllFollowingPublications count={publicationsCount} handleClosePublicationModal={handleClosePublicationModal} onPublicationFollowStatusChange={onPublicationFollowStatusChange} />}
    </>
  );
}

export default MyFollowing;
