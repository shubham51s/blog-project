import React, { useRef, useState } from "react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";

import { AiTwotoneSafetyCertificate } from "react-icons/ai";

function CommentsComp() {
  const [commentInp, setCommentInp] = useState("");
  const inputRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    name: "",
    profileImg: "https://miro.medium.com/v2/resize:fill:40:40/0*AbhaXOwX9-XpKPtX",
    userName: "shubhams1234",
  });

  const [userComments, setUserComments] = useState([{}]);
  const [isAddComment, setIsAddComment] = useState(false);

  const handleCommentInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value.trim();
    setCommentInp(value);
  };

  const handleEnableAddComment = () => {
    if (isAddComment) return;

    setIsAddComment(true);
    inputRef.current.focus();
  };

  const handleDisableAddComment = () => {
    setCommentInp("");
    setIsAddComment(false);
  };

  return (
    <div className="margin-29" style={{ marginTop: 0, marginInline: 0 }}>
      <div className="margin-27 bdr-5 w-full" style={{ marginTop: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}></div>
      <div className="flex justify-center">
        <div className="max-width-2 margin-2 min-w-0 w-full">
          <div className="flex items-center justify-between">
            <h2 className="letter-spacing-6 line-h-9 font-11 font-medium color-3 m-0 p-0">{`Responses (${userComments.length})`}</h2>
            <div className="flex custom-h-2 aspect-square">
              <AiTwotoneSafetyCertificate className="w-full h-full" />
            </div>
          </div>

          <div className="margin-22 margin-33 bdr-5 padding-14" style={{ marginInline: 0, borderTop: 0, borderInline: 0, paddingTop: 0, paddingInline: 0 }}>
            <div className="color-3 custom-fs-1 line-h-8 font-normal">
              <div className="margin-11" style={{ marginTop: 0 }}>
                <div className="margin-7 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="relative">
                    <img src={userDetails.profileImg} alt={userDetails.name} className="width-11 aspect-square rounded-full align-middle" />
                  </div>
                  <div className="flex flex-col justify-center items-start margin-7" style={{ marginRight: 0, marginBlock: 0 }}>
                    <div className="flex flex-wrap items-baseline">
                      <span className="break-words color-3 custom-fs-1 custom-line-h-1 font-normal">{userDetails.userName}</span>
                    </div>
                  </div>
                </div>
                <div className={`border-radius-3 flex flex-col bg-11 transition-colors duration-400 ease-in ${isAddComment ? "padding-40" : ""}`} style={{ paddingTop: 0, paddingInline: 0 }}>
                  <div className="flex flex-col relative">
                    <div onClick={handleEnableAddComment} className={`transition-all duration-400 ease-in-out ${isAddComment ? "padding-39 height-57" : "custom-px-2 padding-28 height-56 cursor-text"}`}>
                      <div className="relative whitespace-pre-wrap wrap-break-word height-59">
                        <textarea ref={inputRef} value={commentInp} onInput={(e) => handleCommentInputChange(e)} placeholder="What are your thoughts?" className={`w-full border-0 outline-0 ${isAddComment ? "pointer-events-auto" : "height-60 pointer-events-none"}`}></textarea>
                      </div>
                    </div>

                    <div className={`color-4 margin-34 flex justify-between transition-all duration-400 ease-in-out ${isAddComment ? "height-58 opacity-100" : "max-h-0 opacity-0"}`} style={{ marginRight: 0, marginBlock: 0 }}>
                      <span className="custom-fs-1 color-4 custom-line-h-1 font-normal">
                        <div className="flex">
                          <div className="inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center" style={{ marginBlock: 0 }}>
                            <div className="width-38 aspect-square">
                              <FaBold className="h-full w-full" />
                            </div>
                          </div>
                          <div className="inline-flex padding-41 margin-19 border-radius-3 cursor-pointer justify-center" style={{ marginBlock: 0 }}>
                            <div className="width-38 aspect-square">
                              <FaItalic className="h-full w-full" />
                            </div>
                          </div>
                        </div>
                      </span>
                      {isAddComment && (
                        <div className="height-58 padding-40 flex self-end" style={{ paddingBlock: 0 }}>
                          <div>
                            <button onClick={handleDisableAddComment} className="border-0 padding-27 padding-28 border-radius-9 text-center box-border color-3 inline-block font-4 custom-line-h-1 m-0">
                              Cancel
                            </button>
                          </div>
                          <button className={`color-2 padding-27 padding-28 custom-bg-1 border-radius-9 text-center box-border inline-block font-4 custom-line-h-1 font-normal m-0 ${commentInp.length > 0 ? "opacity-100" : "opacity-[0.1]"}`} style={{ cursor: commentInp.length > 0 ? "pointer" : "not-allowed" }}>
                            Respond
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* user comments dynamic */}
          {/* working */}
          <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
        </div>
      </div>
    </div>
  );
}

export default CommentsComp;
