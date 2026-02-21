import React, { useEffect, useRef, useState } from "react";
import DeleteReadingHistoryModal from "../../../components/Common/Modals/DeleteReadingHistory";
import ReadingHistoryItem from "../../../components/LibraryComp/ReadingHistoryItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";

function ReadingHistory() {
  const { requestHandler } = useRequestHandler();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const isMounted = useRef(null);
  const loaderTimeout = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [deletedCount, setDeletedCount] = useState(true);
  const [loaders, setLoaders] = useState({
    default: true,
    fetchHistory: true,
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyBlogHistory = async (skip) => {
    try {
      const response = await requestHandler(`/blog/read/user/all-history?skip=${skip}`);
      const result = await response.json();

      console.log("all history result ", result);

      if (response?.status === 200 && result?.data?.blogs) {
        setBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (loaders.fetchHistory) setLoaders((prev) => ({ ...prev, fetchHistory: false }));
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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchMyBlogHistory(0);
    }

    if (loaderTimeout.current) clearTimeout(loaderTimeout.current);

    loaderTimeout.current = setTimeout(() => {
      setLoaders((prev) => ({ ...prev, default: false }));
    }, 500);
  }, []);

  return (
    <>
      <div className="margin56">
        <div>
          {/* clear all history */}
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

          {/* list */}
          {!loaders.default && !loaders.fetchHistory && blogs.length > 0 && blogs.map((item) => <ReadingHistoryItem removeBlogFromHistory={removeBlogFromHistory} key={item._id} item={item} />)}
        </div>
      </div>

      {/* Modals */}
      <DeleteReadingHistoryModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} clearReadingHistory={clearReadingHistory} />
    </>
  );
}

export default ReadingHistory;
