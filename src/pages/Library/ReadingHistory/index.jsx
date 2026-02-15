import React, { useState } from "react";
import DeleteReadingHistoryModal from "../../../components/Common/Modals/DeleteReadingHistory";
import ReadingHistoryItem from "../../../components/LibraryComp/ReadingHistoryItem";

function ReadingHistory({}) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

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

          {/* map */}
          <ReadingHistoryItem />
        </div>
      </div>

      {/* Modals */}
      <DeleteReadingHistoryModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} clearReadingHistory={clearReadingHistory} />
    </>
  );
}

export default ReadingHistory;
