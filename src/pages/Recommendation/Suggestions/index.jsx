import React, { useEffect, useRef, useState } from "react";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import UserListItem from "../../../components/Recommendation/Common/UserListItem";
import PublicationListItem from "../../../components/Recommendation/Common/PublicationListItem";
import TopicListItem from "../../../components/Recommendation/Common/TopicListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Spinner from "../../../components/Common/Spinner";
import { defaultLoaderTime } from "../../../constants/constant";
import ViewAllUserSuggestion from "../../../components/Recommendation/Suggestion/ViewAllUserSuggestionModal";
import ViewTopicSuggestion from "../../../components/Recommendation/Suggestion/ViewAllTopicsSuggestionModal";

function Suggestions() {
  const { requestHandler } = useRequestHandler();
  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defautlLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  const [isShowTopicModal, setIsShowTopicModal] = useState(false);

  const getTopRecommendation = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/users/top-recommendations");
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (result.data.users) {
          setUsers(result.data.users);
        }
        if (result.data.topics) {
          setTopics(result.data.topics);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseUserModal = () => {
    setIsShowUserModal(false);
  };

  const handleCloseTopicModal = () => {
    setIsShowTopicModal(false);
  };

  useEffect(() => {
    getTopRecommendation();

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

                {!defautlLoader && !isLoading && (
                  <div>
                    {/* writer */}
                    <div>
                      <h2 className="font-10 font-medium color-3 line20 m-0">Writers to follow</h2>
                      <div className="margin60 custom-margin-b-1">
                        {users.map((item) => (
                          <UserListItem key={item._id} user={item} />
                        ))}
                        <div className="margin60">
                          <p className="custom-fs-1 color-4 line20 font-normal m-0">
                            <button onClick={() => setIsShowUserModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                              See more suggestions
                            </button>
                          </p>
                        </div>
                        <hr className="margin51 bg-11 height86 border-0" />
                      </div>
                    </div>

                    {/* publication */}
                    {false && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">Publications to follow</h2>
                        <div className="margin60 custom-margin-b-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <PublicationListItem key={index} />
                          ))}
                          <div className="margin60">
                            <p className="custom-fs-1 color-4 line20 font-normal m-0">
                              <button className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">See more suggestions</button>
                            </p>
                          </div>
                          <hr className="margin51 bg-11 height86 border-0" />
                        </div>
                      </div>
                    )}

                    {/* topics */}
                    <div>
                      <h2 className="font-10 font-medium color-3 line20 m-0">Topics to follow</h2>
                      <div className="margin60 custom-margin-b-1">
                        {topics.map((item) => (
                          <TopicListItem key={item._id} item={item} />
                        ))}
                        <div className="margin60">
                          <p className="custom-fs-1 color-4 line20 font-normal m-0">
                            <button onClick={() => setIsShowTopicModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                              See more suggestions
                            </button>
                          </p>
                        </div>
                        <hr className="margin51 bg-11 height86 border-0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <div className="width-22 width-21 padding-24 padding75 height-13 bdr-5 custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}></div>
      </div>
      {isShowTopicModal && <ViewTopicSuggestion handleCloseTopicModal={handleCloseTopicModal} />}
      {isShowUserModal && <ViewAllUserSuggestion handleCloseUserModal={handleCloseUserModal} />}
    </>
  );
}

export default Suggestions;
