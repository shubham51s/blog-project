import React, { useContext, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import PublicationListItem from "./PublicationListItem";
import { useRequestHandler } from "../../../../../hooks/requestHandler";
import PublicationListSkeleton from "./PublicationListItem/skeleton";
import { defaultLoaderTime } from "../../../../../constants/constant";
import NoPublicationData from "./NoData";
import { useInfiniteScroll } from "../../../../../hooks/useInfiniteScroll";

function SubmitToPublication({ handlePublicationSelection }) {
  const { requestHandler } = useRequestHandler();
  const limit = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const loaderTimeout = useRef(null);
  const [contributionArr, setContributionArr] = useState([]);
  const [followingArr, setFollowingArr] = useState([]);

  const [contribution, setContribution] = useState({
    hasMore: true,
    loading: true,
    cursor: null,
  });

  const [following, setFollowing] = useState({
    hasMore: true,
    loading: true,
    cursor: null,
  });

  const getContributedPublications = async () => {
    if (!contribution.hasMore) return;
    setContribution((prev) => ({ ...prev, loading: true }));
    try {
      const url = contribution.cursor ? `/publication/my-contributions?cursor=${contribution.cursor}&limit=${limit}` : `/publication/my-contributions?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications) {
        setContributionArr((prev) => [...prev, ...result.data.publications]);
        setContribution((prev) => ({ ...prev, hasMore: result.data.cursor ? true : false, cursor: result.data.cursor || null }));
      } else {
        setContribution((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setContribution((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
      setContribution((prev) => ({ ...prev, loading: false }));
    }
  };

  const getFollowingPublications = async () => {
    if (!following.hasMore) return;
    setFollowing((prev) => ({ ...prev, loading: true }));
    try {
      const url = following.cursor ? `/publication/my-followings?cursor=${following.cursor}&limit=${limit}` : `/publication/my-followings?limit=${limit}`;

      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications) {
        setFollowingArr((prev) => [...prev, ...result.data.publications]);
        setFollowing((prev) => ({ ...prev, hasMore: result.data.cursor ? true : false, cursor: result.data.cursor || null }));
      } else {
        setFollowing((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setFollowing((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
      setFollowing((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);
    setIsLoading(true);
    setFollowingArr([]);
    setContributionArr([]);
    setContribution({ hasMore: true, loading: false, cursor: null });
    setFollowing({ hasMore: true, loading: false, cursor: null });

    if (tabId === 1) getFollowingPublications();
    if (tabId === 0) getContributedPublications();
  };

  const contributionSentinal = useInfiniteScroll({
    loadMore: getContributedPublications,
    hasMore: contribution.hasMore,
    scrollLoader: contribution.loading,
  });

  const followingSentinal = useInfiniteScroll({
    loadMore: getFollowingPublications,
    hasMore: following.hasMore,
    scrollLoader: following.loading,
  });

  useEffect(() => {
    getContributedPublications();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div className="flex justify-center margin74 w-full">
      <div className="w-full min-w-full custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
        <div className="relative min-h-screen w-full flex justify-center">
          <div className="w-full flex flex-col padding93 padding92">
            <div className="flex flex-col items-center gap10 text-center">
              <h2 className="color-3 tracking-tight line-h12 font15 font-normal m-0">Submit to a publication</h2>
              <div className="width91">
                <p className="line20 custom-fs-1 color-4 font-normal m-0">StoryNest publications are shared spaces for stories written around a common theme or topic, usually by multiple writers. You can submit to any publication you follow, as long as it's currently accepting stories.</p>
              </div>
            </div>

            <div className="margin60">
              <div className="boxShadow10 overflow-hidden relative">
                <div className="flex items-center overflow-y-hidden overflow-x-auto">
                  <div className="w-full flex justify-center">
                    <div className="flex gap13 margin-21" style={{ marginBlock: 0, marginLeft: 0 }}>
                      <div className={`min-w-max padding-42 ${activeTab === 0 ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                        <button onClick={() => handleTabChange(0)} disabled={isLoading || defaultLoader} className={`cursor-pointer p-0 m-0 color-3 line20 custom-fs-1 font-normal transition-all duration-75 ease ${activeTab === 0 ? "opacity-100" : "opacity-[0.8] hover:opacity-100"}`}>
                          <span>Contributing</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap13 margin-21" style={{ marginBlock: 0, marginLeft: 0 }}>
                      <div className={`min-w-max padding-42 ${activeTab === 1 ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                        <button onClick={() => handleTabChange(1)} disabled={isLoading || defaultLoader} className={`cursor-pointer p-0 m-0 color-3 line20 custom-fs-1 font-normal transition-all duration-75 ease ${activeTab === 1 ? "opacity-100" : "opacity-[0.8] hover:opacity-100"}`}>
                          <span>Following</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin51">
              {(isLoading || defaultLoader || contributionArr.length > 0 || followingArr.length > 0) && (
                <div>
                  <div className="padding71 flex custom-gap-4" style={{ paddingTop: 0 }}>
                    <div className="w-full grid grid-cols-4 custom-gap-4">
                      {(isLoading || defaultLoader) && Array.from({ length: 4 }).map((_, index) => <PublicationListSkeleton key={index} />)}

                      {activeTab === 0 && !isLoading && !defaultLoader && contributionArr.length > 0 && contributionArr.map((item) => <PublicationListItem isMember={true} handlePublicationSelection={handlePublicationSelection} publication={item.publication} key={item._id} />)}
                      {activeTab === 0 && !isLoading && !defaultLoader && contribution.hasMore && <div ref={contributionSentinal} style={{ height: "1px" }}></div>}
                      {activeTab === 1 && !isLoading && !defaultLoader && followingArr.length > 0 && followingArr.map((item) => <PublicationListItem isMember={false} handlePublicationSelection={handlePublicationSelection} publication={item.followee} key={item._id} />)}
                      {activeTab === 1 && !isLoading && !defaultLoader && following.hasMore && <div ref={followingSentinal} style={{ height: "1px" }}></div>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                {activeTab === 0 && !isLoading && !defaultLoader && contributionArr.length === 0 && <NoPublicationData activeTab={activeTab} />}
                {activeTab === 1 && !isLoading && !defaultLoader && followingArr.length === 0 && <NoPublicationData activeTab={activeTab} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitToPublication;
