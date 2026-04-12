import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ManagePublicationBtn from "../../../components/PublicationDetails/MangePublicationBtn";
import Skeleton from "react-loading-skeleton";
import Spinner from "../../../components/Common/Spinner";
import NotFoundComp from "../../../components/Common/NotFound";
import Submissions from "../../../components/PublicationInbox/Submissions";
import Published from "../../../components/PublicationInbox/Published";

function PublicationInbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { requestHandler } = useRequestHandler();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { slug } = useParams();
  const tab = searchParams.get("tab");
  const [publication, setPublication] = useState(null);

  const handleActiveTabChange = (tab) => {
    tab ? setSearchParams({ tab }) : setSearchParams({});
  };

  const isTabActive = (id) => {
    if (id === 0) return tab !== "published-posts";
    if (id === 1) return tab === "published-posts";
  };

  const fetchPublicationDetails = async () => {
    try {
      const response = await requestHandler(`/publication/member/${slug}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publication) {
        setPublication(result.data.publication);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicationDetails();
  }, []);

  return (
    <>
      {!isInitialLoading && publication && (
        <>
          <div className="w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
            <div className="custom-bg-8 w-full height-55"></div>
            <div className="flex justify-center">
              <div className="min-w-0 w-full custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
                <div className="flex items-center gap12 height-3">
                  <div className="width-32">
                    <Link to={`/publication/${publication.slug}`} className="cursor-pointer m-0 p-0">
                      <h2 className="line-h-8 font-3 font-semibold color-3 m-0">
                        <div className="max-w-full truncate">{publication.name}</div>
                      </h2>
                    </Link>
                  </div>
                  <div className="grow shrink basis-auto min-w-0 relative h-full flex justify-end items-end">
                    <ManagePublicationBtn publication={publication} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-center overflow-x-hidden overflow-y-auto max-h-full"> */}
          <div className="flex justify-center max-h-full">
            <div className="min-w-0 w-full custom-max-w-1 margin-27" style={{ marginBlock: 0 }}>
              {/* top section */}
              <div className="margin54 margin56">
                <div className="margin57">
                  <div className="w-full flex items-center justify-between flex-wrap">
                    <div className="grow shrink basis-auto flex flex-col">
                      <h1 className="letter-spacing-7 height-53 line-h-10 font-12 font-semibold color-3 overflow-hidden m-0 p-0 break-words text-ellipsis">Inbox</h1>
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
                            <span>Submissions</span>
                          </div>
                        </button>
                      </div>

                      <div className={`min-w-max margin52 padding-42  ${isTabActive(1) ? "bdr-7" : "bdr-5"}`} style={{ borderTop: 0, borderInline: 0 }}>
                        <button onClick={() => handleActiveTabChange("published-posts")} className="p-0 cursor-pointer" disabled={isInitialLoading}>
                          <div className={`custom-fs-1 custom-line-h-1 font-medium flex cursor-pointer custom-gap-3 color-3 transition-all duration-200 linear hover:opacity-100 ${isTabActive(1) ? "opacity-100" : "opacity-[0.9]"}`}>
                            <span>Published</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Submissions section */}
              {isTabActive(0) && <Submissions isInitialLoading={isInitialLoading} publication={publication} />}

              {/* 2. Published section */}
              {isTabActive(1) && <Published isInitialLoading={isInitialLoading} publication={publication} />}
            </div>
          </div>
        </>
      )}

      {isInitialLoading && (
        <div className="w-full height-11 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isInitialLoading && !publication && (
        <div className="w-full margin-39 flex items-center justify-center">
          <NotFoundComp />
        </div>
      )}
    </>
  );
}

export default PublicationInbox;
