import { Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import CommentDrawer from "../CommentDrawer";

function CommentAction({ blog, setBlog, setIsShowDrawer }) {
  const drawerTimeout = useRef(null);

  const handleToggleDrawerOpen = (e) => {
    e.stopPropagation();

    if (!drawerTimeout.current) {
      setIsShowDrawer((prev) => !prev);
      drawerTimeout.current = setTimeout(() => {
        drawerTimeout.current = null;
      }, 300);
      return;
    }

    clearTimeout(drawerTimeout.current);
    drawerTimeout.current = setTimeout(() => {
      setIsShowDrawer((prev) => !prev);
      drawerTimeout.current = null;
    }, 300);
  };

  return (
    <>
      {blog.allowComments ? (
        <div className="margin-12 flex items-center" style={{ marginRight: 0 }}>
          <Tooltip arrow placement="top" enterDelay={300} title="Respond">
            <button onClick={(e) => handleToggleDrawerOpen(e)} className="listCommentBtn flex items-center color-6 opacity-[0.7] transition-all duration-75 ease cursor-pointer hover:opacity-[0.9]">
              <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                <div className="width-13 aspect-square">
                  <FiMessageCircle className="w-full h-full opacity-[0.9]" />
                </div>
              </div>
              {blog.commentCount > 0 && (
                <div>
                  <p className="font-4 color-6 custom-line-h-1 font-medium m-0 p-0 text-center">{blog.commentCount}</p>
                </div>
              )}
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="margin-12 flex items-center" style={{ marginRight: 0 }}>
          <Tooltip arrow placement="top" enterDelay={300} title="Responses hidden">
            <button className="listCommentBtn flex items-center color-6 opacity-[0.4] transition-all duration-75 ease cursor-not-allowed">
              <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                <div className="width-13 aspect-square">
                  <FiMessageCircle className="w-full h-full opacity-[0.9]" />
                </div>
              </div>
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default CommentAction;
