import React, { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import PublicationListItem from "./PublicationListItem";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function SubmitToPublicationModal() {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [contributions, setContributions] = useState({
    isFetched: false,
    arr: [],
  });
  const [followings, setFollowings] = useState({
    isFetched: false,
    arr: [],
  });

  const getContributedPublications = async (skip) => {
    try {
      const response = await requestHandler(`/publication/my-contributions?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications?.length > 0) {
        setContributions((prev) => ({ ...prev, arr: result.data.publications }));

        if (isLoading) setIsLoading(false);
      } else {
        setContributions((prev) => ({ ...prev, isFetched: true }));
        if (skip === 0) {
          setActiveTab(1);
          getFollowingPublications(0);
        }
      }
    } catch (err) {
      console.error(err);
      setContributions((prev) => ({ ...prev, isFetched: true }));
      if (skip === 0) {
        setActiveTab(1);
        getFollowingPublications(0);
      }
    }
  };

  const getFollowingPublications = async (skip) => {
    try {
      const response = await requestHandler(`/publication/my-followings?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications?.length > 0) {
        setFollowings((prev) => ({ ...prev, arr: result.data.publications }));
      } else {
        setFollowings((prev) => ({ ...prev, isFetched: true }));
      }
    } catch (err) {
      console.error(err);
      setFollowings((prev) => ({ ...prev, isFetched: true }));
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);
    if (tabId === 1) {
      if (followings.arr.length === 0 && !followings.isFetched) {
        getFollowingPublications(0);
      }
    }
  };

  useEffect(() => {
    getContributedPublications(0);
  }, []);

  return (
    <div className="flex justify-center margin74">
      <div className="w-full min-w-full custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
        <div className="relative min-h-screen w-full flex justify-center">
          <div className="absolute right-0 top8">
            <button className="cursor-pointer m-0 p-0">
              <div className="width-13 aspect-square">
                <IoCloseOutline className="w-full h-full" />
              </div>
            </button>
          </div>

          <div className="w-full flex flex-col padding93 padding92">
            <div className="flex flex-col items-center gap10 text-center">
              <h2 className="color-3 tracking-tight line-h12 font15 font-normal m-0">Submit to a publication</h2>
              <div className="width91">
                <p className="line20 custom-fs-1 color-4 font-normal m-0">Medium publications are shared spaces for stories written around a common theme or topic, usually by multiple writers. You can submit to any publication you follow, as long as it's currently accepting stories.</p>
              </div>
            </div>

            <div className="margin60">
              <div className="boxShadow10 overflow-hidden relative">
                <div className="flex items-center overflow-y-hidden overflow-x-auto">
                  <div className="w-full flex justify-center">
                    {/* map */}
                    <div className="flex gap13 margin-21" style={{ marginBlock: 0, marginLeft: 0 }}>
                      <div className={`min-w-max padding-42 ${activeTab === 0 ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                        <button onClick={() => handleTabChange(0)} disabled={isLoading} className={`cursor-pointer p-0 m-0 color-3 line20 custom-fs-1 font-normal transition-all duration-75 ease ${activeTab === 0 ? "opacity-100" : "opacity-[0.8] hover:opacity-100"}`}>
                          <span>Contributing</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap13 margin-21" style={{ marginBlock: 0, marginLeft: 0 }}>
                      <div className={`min-w-max padding-42 ${activeTab === 1 ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                        <button onClick={() => handleTabChange(1)} disabled={isLoading} className={`cursor-pointer p-0 m-0 color-3 line20 custom-fs-1 font-normal transition-all duration-75 ease ${activeTab === 1 ? "opacity-100" : "opacity-[0.8] hover:opacity-100"}`}>
                          <span>Following</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin51">
              <div>
                <div className="padding71 flex custom-gap-4" style={{ paddingTop: 0 }}>
                  <div className="w-full grid grid-cols-4 custom-gap-4">
                    {activeTab === 0 && contributions.arr.map((item) => <PublicationListItem key={item._id} publication={item.publication} />)}
                    {activeTab === 1 && followings.arr.map((item) => <PublicationListItem key={item._id} publication={item.followee} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitToPublicationModal;
