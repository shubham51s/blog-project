import React, { useEffect, useRef, useState } from "react";
import DeleteReadingHistoryModal from "../../../components/Common/Modals/DeleteReadingHistory";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";
import ReadingHistoryItem from "../../../components/LibraryComp/ReadingHistory/ReadingHistoryItem";
import Loader from "../../../components/LibraryComp/ReadingHistory/Loader";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function ReadingHistory() {
  const { requestHandler } = useRequestHandler();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const isMounted = useRef(null);
  const loaderTimeout = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loaders, setLoaders] = useState({
    default: true,
    fetchHistory: true,
  });
  const limit = 20;
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

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
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));
    try {
      const url = scroll.cursor ? `/blog/read/user/all-history?cursor=${scroll.cursor}&limit=${limit}` : `/blog/read/user/all-history?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs((prev) => [...prev, ...result.data.blogs]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setLoaders((prev) => ({ ...prev, fetchHistory: false }));
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: fetchMyBlogHistory,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    fetchMyBlogHistory();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setLoaders((prev) => ({ ...prev, default: false }));
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <>
      <div className="margin56">
        <div>
          {/* loader */}
          {(loaders.default || loaders.fetchHistory) && Array.from({ length: 4 }).map((_, index) => <Loader key={index} />)}

          {/* clear all history */}
          {!loaders.default && !loaders.fetchHistory && blogs.length > 0 && (
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
          {!loaders.default && !loaders.fetchHistory && blogs.length === 0 && (
            <div className="text-center padding-42">
              <div className="padding-42 padding89">
                <h2 className="font-10 font-medium color-3 line20 m-0">You haven't read any stories yet</h2>
              </div>
              <p className="color-4 custom-fs-1 line20 font-normal m-0">Stories you've read on Medium will appear here.</p>
            </div>
          )}

          {/* list */}
          {!loaders.default && !loaders.fetchHistory && blogs.length > 0 && (
            <>
              {blogs.map((item) => (
                <ReadingHistoryItem key={item._id} item={item} />
              ))}
              {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteReadingHistoryModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} clearReadingHistory={clearReadingHistory} />
    </>
  );
}

export default ReadingHistory;
