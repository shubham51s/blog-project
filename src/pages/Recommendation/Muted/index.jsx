import React, { useEffect, useRef, useState } from "react";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import { defaultLoaderTime } from "../../../constants/constant";
import Spinner from "../../../components/Common/Spinner";
import { useRequestHandler } from "../../../hooks/requestHandler";
import UserListItem from "../../../components/Recommendation/Mute/UserListItem";
import ViewAllMutedUsers from "../../../components/Recommendation/Mute/ViewAllMutedUsersModal";
import PublicationListItem from "../../../components/Recommendation/Mute/PublicationListItem";
import ViewAllMutedPublications from "../../../components/Recommendation/Mute/ViewAllMutedPublicationsModal";

function Muted() {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [defautlLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [usersCount, setUsersCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [publicationCount, setPublicationsCount] = useState(0);
  const [publications, setPublications] = useState([]);
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  const [isPublicationModal, setIsPublicationModal] = useState(false);

  const getMutedData = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/mute/latest");
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (result?.data?.users) {
          setUsersCount(result.data.users.count);
          setUsers(result.data.users.users);
        }
        if (result?.data?.publications) {
          setPublicationsCount(result.data.publications.count);
          setPublications(result.data.publications.publications);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onMuteStatusChange = (type, isMuted, id) => {
    if (type === "user") {
      setUsersCount((prev) => (isMuted ? prev + 1 : prev - 1));
    } else if (type === "publication") {
      setPublicationsCount((prev) => (isMuted ? prev + 1 : prev - 1));
    }
  };

  const handleCloseUserModal = () => {
    setIsShowUserModal(false);
  };

  const closePublicationModal = () => {
    setIsPublicationModal(false);
  };

  useEffect(() => {
    getMutedData();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);
  return (
    <>
      <div className="flex m-auto justify-evenly width-18">
        <main className="grow shrink basis-auto width-20">
          <div className="flex justify-center">
            <div className="min-w-0 w-full max-width-2 margin-12">
              <div className="padding61">
                <NavSection />

                {/* loader */}
                {(defautlLoader || isLoading) && (
                  <div className="w-full overflow-hidden flex justify-center items-end height85">
                    <Spinner />
                  </div>
                )}

                {!defautlLoader && !isLoading && users.length === 0 && publications.length === 0 && (
                  <div>
                    {/* no data */}
                    <div className="text-center padding-42">
                      <div className="padding-42 padding89">
                        <h2 className="font-10 font-medium color-3 line20 m-0">You haven't muted anything</h2>
                      </div>
                      <p className="color-4 custom-fs-1 line20 font-normal m-0">Writers and publications you've muted will appear here.</p>
                    </div>
                  </div>
                )}

                {!defautlLoader && !isLoading && (users.length > 0 || publications.length > 0) && (
                  <div>
                    {/* writer */}
                    {users.length > 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">{usersCount} writers</h2>
                        <div className="margin60 custom-margin-b-1">
                          {users.map((item) => (
                            <UserListItem key={item._id} user={item.target} onMuteStatusChange={onMuteStatusChange} />
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
                    )}

                    {/* publication */}
                    {publications.length > 0 && (
                      <div>
                        <h2 className="font-10 font-medium color-3 line20 m-0">{publicationCount} publications</h2>
                        <div className="margin60 custom-margin-b-1">
                          {publications.map((item) => (
                            <PublicationListItem publication={item.target} onMuteStatusChange={onMuteStatusChange} key={item._id} />
                          ))}

                          {publicationCount > 5 && (
                            <div className="margin60">
                              <p className="custom-fs-1 color-4 line20 font-normal m-0">
                                <button onClick={() => setIsPublicationModal(true)} className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">
                                  See all {`(${publicationCount})`}
                                </button>
                              </p>
                            </div>
                          )}
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
      {isShowUserModal && <ViewAllMutedUsers usersCount={usersCount} handleCloseUserModal={handleCloseUserModal} onMuteStatusChange={onMuteStatusChange} />}
      {isPublicationModal && <ViewAllMutedPublications publicationCount={publicationCount} closePublicationModal={closePublicationModal} onMuteStatusChange={onMuteStatusChange} />}
    </>
  );
}

export default Muted;
