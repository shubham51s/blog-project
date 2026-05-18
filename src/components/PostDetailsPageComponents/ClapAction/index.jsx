import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { showToast } from "../../../utils/toaster";
import { UserContext } from "../../../context/userContext";
import { PiHandsClapping } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6";
import ClappedUserListModal from "../ClappedUserListModal";

function ClapAction({ clapDetails, setClapDetails, blog, myPrevClapsCount }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const clapsClickedCount = useRef(0);
  const clapsTimeout = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const addClaps = async () => {
    setIsLoading(true);
    const remaining = 50 - clapDetails.myClaps;
    const clapsToAdd = Math.min(remaining, clapsClickedCount.current);
    try {
      const params = {
        clapsCount: clapsToAdd,
        blog: blog._id,
      };

      const response = await requestHandler(`/claps`, "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        const updatedClaps = result.clapsCount;
        setClapDetails((prev) => ({ ...prev, myClaps: updatedClaps, totalClaps: blog.clapsCount - myPrevClapsCount + updatedClaps }));
      } else {
        showToast(result?.message || "Some error occured");
        setClapDetails((prev) => ({ ...prev, totalClaps: prev.totalClaps - clapsToAdd }));
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setClapDetails((prev) => ({ ...prev, totalClaps: prev.totalClaps - clapsToAdd }));
    } finally {
      clapsClickedCount.current = 0;
      setIsLoading(false);
    }
  };

  const handleAddClapsBtnClick = () => {
    if (clapDetails.myClaps >= 50) return;

    clapsClickedCount.current++;

    setClapDetails((prev) => {
      const newTotal = blog.clapsCount - myPrevClapsCount + Math.min(prev.myClaps + clapsClickedCount.current, 50);
      return {
        ...prev,
        totalClaps: newTotal,
      };
    });

    if (clapsTimeout.current) clearTimeout(clapsTimeout.current);
    clapsTimeout.current = setTimeout(() => {
      addClaps();
    }, 2000);
  };

  const handleShowClapsUi = () => {
    if (clapDetails.totalClaps <= 0) return;
    setIsShowModal(true);
  };

  useEffect(() => {
    return () => {
      if (clapsTimeout.current) clearTimeout(clapsTimeout.current);
    };
  }, []);

  return (
    <>
      <div className="flex items-center">
        <div className="select-none margin-19 relative flex items-center" style={{ marginLeft: 0, marginBlock: 0 }}>
          <button onClick={handleAddClapsBtnClick} disabled={userInfo?._id === blog.author._id || isLoading} className={`select-none p-0 m-0 width-13 aspect-square opacity-[0.8] transition-all duration-75 ease ${userInfo?._id === blog.author._id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`}>
            <Tooltip arrow placement="top" enterDelay={300} title={`${userInfo?._id === blog.author._id ? "You cannot applaud your own story" : "Clap"}`}>
              {clapDetails.myClaps <= 0 && <PiHandsClapping className="w-full h-full" />}
              {clapDetails.myClaps > 0 && <FaHandsClapping className="w-full h-full" />}
            </Tooltip>
          </button>
        </div>
        {clapDetails.totalClaps > 0 && (
          <div className="flex items-center text-center margin-19 opacity-[0.65] transition-all duration-75 ease cursor-pointer hover:opacity-100" style={{ marginRight: 0, marginBlock: 0 }}>
            <Tooltip arrow placement="top" enterDelay={300} title="View Claps">
              <p onClick={() => handleShowClapsUi()} className="font-4 color-6 custom-line-h-1 font-normal m-0 p-0 select-none">
                {clapDetails.totalClaps}
              </p>
            </Tooltip>
          </div>
        )}
      </div>

      {/* clapped users list modal */}
      {isShowModal && <ClappedUserListModal clapDetails={clapDetails} setClapDetails={setClapDetails} blog={blog} />}
    </>
  );
}

export default ClapAction;
