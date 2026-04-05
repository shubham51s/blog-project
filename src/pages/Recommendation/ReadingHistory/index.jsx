import React, { useRef, useState, useEffect } from "react";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import DeleteReadingHistoryModal from "../../../components/Common/Modals/DeleteReadingHistory";
import ReadingHistoryItem from "../../../components/LibraryComp/ReadingHistory/ReadingHistoryItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import Spinner from "../../../components/Common/Spinner";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function MyReadingHistory() {
  const { requestHandler } = useRequestHandler();
  const limit = 8;
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [defautlLoader, setDefaultLoader] = useState(true);
  const defaultLoaderTimeout = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [scrollLoader, setScrollLoader] = useState(true);
  const [cursor, setCursor] = useState(null);

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const showDeleteHistoryModal = (e) => {
    e.currentTarget.blur();
    setIsDeleteModal(true);
  };

  const clearReadingHistory = async (setIsLoading) => {
    setIsLoading(true);

    try {
      const response = await requestHandler("/blog/read/user/clear-all", "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        setDeletedCount(0);
        setBlogs([]);
        handleCloseDeleteModal();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyBlogHistory = async () => {
    if (!hasMore) return;

    setScrollLoader(true);
    try {
      const url = cursor ? `/blog/read/user/all-history?cursor=${cursor}&limit=${limit}` : `/blog/read/user/all-history?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setHasMore(result.data.cursor ? true : false);
        setCursor(result.data.cursor || null);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setScrollLoader(false);
    }
  };

  const removeBlogFromHistory = async (params) => {
    try {
      const response = await requestHandler(`/blog/read/user/remove/${params.blogId}`, "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        setDeletedCount((prev) => prev + 1);
      } else showToast(result?.message || "Some error occured.");

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
      return false;
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchMyBlogHistory,
    hasMore,
    scrollLoader,
  });

  useEffect(() => {
    fetchMyBlogHistory();

    if (!defaultLoaderTimeout.current) {
      defaultLoaderTimeout.current = setTimeout(() => {
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

                {/* reading history section */}
                <div>
                  {/* loader */}
                  {(defautlLoader || isLoading) && (
                    <div className="w-full overflow-hidden flex justify-center items-end height85">
                      <Spinner />
                    </div>
                  )}

                  {/* clear all history */}
                  {!defautlLoader && !isLoading && blogs.length > 0 && (
                    <div className="flex justify-between items-center bg-10 padding-3 margin57">
                      <p className="color-3 custom-fs-1 line20 font-normal m-0">You can clear your reading history for a fresh start.</p>
                      <div className="margin-18" style={{ marginRight: 0 }}>
                        <div>
                          <button onClick={(e) => showDeleteHistoryModal(e)} className="bdr-3 border-[#c94a4a] bg-[#c94a4a] padding-27 padding-28 text-white text-center border-radius-9 font-4 line20 font-normal m-0 transition-all duration-75 ease cursor-pointer hover:border-[#b63636] hover:bg-[#b63636]">
                            Clear history
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* no data */}
                  {!defautlLoader && !isLoading && blogs.length === 0 && (
                    <div className="text-center padding-42">
                      <div className="padding-42 padding89">
                        <h2 className="font-10 font-medium color-3 line20 m-0">You haven't read any stories yet</h2>
                      </div>
                      <p className="color-4 custom-fs-1 line20 font-normal m-0">Stories you've read on Medium will appear here.</p>
                    </div>
                  )}

                  {/* list */}
                  {!defautlLoader && !isLoading && blogs.length > 0 && blogs.map((item) => <ReadingHistoryItem removeBlogFromHistory={removeBlogFromHistory} key={item._id} item={item} />)}
                  {!defautlLoader && !isLoading && hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="width-22 width-21 padding-24 padding75 height-13 bdr-5 custom-bg-8" style={{ borderRight: 0, borderBlock: 0 }}>
          <RightSection />
        </div>
      </div>

      {/* Modals */}
      <DeleteReadingHistoryModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} clearReadingHistory={clearReadingHistory} />
    </>
  );
}

export default MyReadingHistory;
