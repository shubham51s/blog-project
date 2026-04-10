import React, { useEffect, useState } from "react";
import DraftContainer from "../../components/StoriesPageComp/DraftsContent";
import PublishContainer from "../../components/StoriesPageComp/PublishedContent";
import SubmissionContainer from "../../components/StoriesPageComp/SubmissionContent";
import { useRequestHandler } from "../../hooks/requestHandler";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "../../utils/toaster";

function StoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { requestHandler } = useRequestHandler();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [draftsCount, setDraftsCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const tab = searchParams.get("tab");

  const handleActiveTabChange = (tab) => {
    tab ? setSearchParams({ tab }) : setSearchParams({});
  };

  const getAllStoriesCount = async () => {
    try {
      const response = await requestHandler("/stories/getAllStoriesCount");
      const result = await response.json();

      if (response.status === 200 && result?.data) {
        const { drafts, published, submissions } = result.data;
        setDraftsCount(drafts);
        setPublishedCount(published);
        setSubmissionsCount(submissions);
      } else {
        if (response?.status >= 500) {
          showToast("Some error occured", "error");
        } else {
          showToast(result?.message || "Some error occured", "error");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const isTabActive = (id) => {
    if (id === 0) return tab !== "posts-published" && tab !== "submissions-outbox" && tab !== "posts-unlisted";
    if (id === 1) return tab === "posts-published";
    if (id === 2) return tab === "submissions-outbox";
  };

  useEffect(() => {
    getAllStoriesCount();
  }, []);

  return (
    <div className="flex justify-center overflow-x-hidden overflow-y-auto max-h-full">
      <div className="min-w-0 w-full custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
        {/* top section */}
        <div className="margin54 margin56">
          <div className="margin57">
            <div className="w-full flex items-center justify-between flex-wrap">
              <div className="grow shrink basis-auto flex flex-col">
                <h1 className="letter-spacing-7 height-53 line-h-10 font-12 font-semibold color-3 overflow-hidden m-0 p-0 break-words text-ellipsis">Stories</h1>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="boxShadow10 overflow-hidden relative">
            <div className="overflow-y-hidden overflow-x-scroll flex items-center scrollbar-none">
              <div className="w-full flex justify-start select-none">
                <div className={`min-w-max margin52 padding-42  ${isTabActive(0) ? "bdr-7" : "bdr-5"}`} style={{ borderTop: 0, borderInline: 0, marginLeft: 0 }}>
                  <button onClick={() => handleActiveTabChange()} className="p-0 cursor-pointer" disabled={isInitialLoading}>
                    <div className={`custom-fs-1 custom-line-h-1 font-medium flex cursor-pointer custom-gap-3 color-3 transition-all duration-200 linear hover:opacity-100 ${isTabActive(0) ? "opacity-100" : "opacity-[0.9]"}`}>
                      <span>Drafts</span>
                      {!isInitialLoading && draftsCount > 0 && <span>{draftsCount}</span>}
                    </div>
                  </button>
                </div>

                <div className={`min-w-max margin52 padding-42  ${isTabActive(1) ? "bdr-7" : "bdr-5"}`} style={{ borderTop: 0, borderInline: 0 }}>
                  <button onClick={() => handleActiveTabChange("posts-published")} className="p-0 cursor-pointer" disabled={isInitialLoading}>
                    <div className={`custom-fs-1 custom-line-h-1 font-medium flex cursor-pointer custom-gap-3 color-3 transition-all duration-200 linear hover:opacity-100 ${isTabActive(1) ? "opacity-100" : "opacity-[0.9]"}`}>
                      <span>Published</span>
                      {!isInitialLoading && publishedCount > 0 && <span>{publishedCount}</span>}
                    </div>
                  </button>
                </div>

                <div className={`min-w-max margin52 padding-42  ${isTabActive(2) ? "bdr-7" : "bdr-5"}`} style={{ borderTop: 0, borderInline: 0 }}>
                  <button onClick={() => handleActiveTabChange("submissions-outbox")} className="p-0 cursor-pointer" disabled={isInitialLoading}>
                    <div className={`custom-fs-1 custom-line-h-1 font-medium flex cursor-pointer custom-gap-3 color-3 transition-all duration-200 linear hover:opacity-100 ${isTabActive(2) ? "opacity-100" : "opacity-[0.9]"}`}>
                      <span>Submissions</span>
                      {!isInitialLoading && submissionsCount > 0 && <span>{submissionsCount}</span>}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Drafts section */}
        {isTabActive(0) && <DraftContainer isInitialLoading={isInitialLoading} draftsCount={draftsCount} />}

        {/* 2. Published section */}
        {isTabActive(1) && <PublishContainer isInitialLoading={isInitialLoading} publishedCount={publishedCount} setPublishedCount={setPublishedCount} />}

        {/* 3. Submission section */}
        {isTabActive(2) && <SubmissionContainer isInitialLoading={isInitialLoading} submissionsCount={submissionsCount} setSubmissionsCount={setSubmissionsCount} />}
      </div>
    </div>
  );
}

export default StoriesPage;
