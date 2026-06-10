import React, { useContext, useEffect, useRef, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { GoMute } from "react-icons/go";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { showToast } from "../../../../../../utils/toaster";
import { useRequestHandler } from "../../../../../../hooks/requestHandler";
import { useToggleMute } from "../../../../../../hooks/toggleMute";
import { MuteContext } from "../../../../../../context/mute";
import ReportBlogModal from "../../../../../Common/Modals/ReportBlog";

function ShowLessComp({ setIsHideBlog, blog, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const { muteUser, unmuteUser, mutePublication, unmutePublication } = useToggleMute();
  const { mutedUsers, mutedPublications } = useContext(MuteContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const showModalTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const [loaders, setLoaders] = useState({
    user: false,
    publication: false,
  });

  const addNotInterested = async () => {
    setIsLoading(true);
    try {
      const params = { blogId: blog._id };
      const response = await requestHandler("/blog/not-interested/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
      } else {
        if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
        setIsShowModal(false);
        setIsHideBlog(false);
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
      setIsShowModal(false);
      setIsHideBlog(false);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const undoNotInterested = async () => {
    setIsLoading(true);
    try {
      const params = { blogId: blog._id };
      const response = await requestHandler("/blog/not-interested/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast("Ok, we will start showing more stories like this again.");
        if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
        setIsHideBlog(false);
        setIsShowModal(false);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowLessLikeThisBtnClick = (e) => {
    e.stopPropagation();
    setIsHideBlog(true);

    if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
    showModalTimeout.current = setTimeout(() => {
      setIsShowModal(true);
    }, 400);

    addNotInterested();
  };

  const closeMuteModal = (e) => {
    e.stopPropagation();
    setIsShowModal(false);
  };

  const handleMutePublication = async () => {
    setLoaders((prev) => ({ ...prev, publication: true }));
    try {
      await mutePublication(blog.publication);
    } finally {
      setLoaders((prev) => ({ ...prev, publication: false }));
    }
  };

  const handleUnmutePublication = async () => {
    setLoaders((prev) => ({ ...prev, publication: true }));
    try {
      const isSuccess = await unmutePublication(blog.publication);
      if (isSuccess) setBlog((prev) => ({ ...prev, publication: { ...prev.publication, isMuted: false } }));
    } finally {
      setLoaders((prev) => ({ ...prev, publication: false }));
    }
  };

  const handleMuteUser = async () => {
    setLoaders((prev) => ({ ...prev, user: true }));
    try {
      await muteUser(blog.author);
    } finally {
      setLoaders((prev) => ({ ...prev, user: false }));
    }
  };

  const handleUnmuteUser = async () => {
    setLoaders((prev) => ({ ...prev, user: true }));
    try {
      const isSuccess = await unmuteUser(blog.author);
      if (isSuccess) setBlog((prev) => ({ ...prev, author: { ...prev.author, isMuted: false } }));
    } finally {
      setLoaders((prev) => ({ ...prev, user: false }));
    }
  };

  const handleToggleMuteAction = (type) => {
    if (type === "user") mutedUsers[blog.author._id] || blog.author.isMuted ? handleUnmuteUser() : handleMuteUser();
    if (type === "publication") mutedPublications[blog.publication._id] || blog.publication.isMuted ? handleUnmutePublication() : handleMutePublication();
  };

  const handleCloseReportModal = () => {
    setIsReportModal(false);
  };

  const handleReportBtnClick = () => {
    if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
    setIsShowModal(false);
    setIsReportModal(true);
  };

  useEffect(() => {
    return () => {
      if (showModalTimeout.current) clearTimeout(showModalTimeout.current);
    };
  }, []);

  return (
    <>
      <div>
        <div className="inline-block">
          <button onClick={(e) => handleShowLessLikeThisBtnClick(e)} className="z-[2] relative padding-33 cursor-pointer m-0 transition-all duration-75 ease opacity-[0.7] hover:opacity-100" title="Show less like this">
            <div className="width-13 aspect-square">
              <CiCircleMinus className="w-full h-full align-middle" />
            </div>
          </button>
        </div>
      </div>
      {/* show less like this confirmation modal */}
      {isShowModal && (
        <div onClick={(e) => closeMuteModal(e)} className="fixed inset-0 z-[800] padding-2 flex items-center justify-center bg17">
          <div className="my-auto p-0" onClick={(e) => e.stopPropagation()}>
            <div className="width60 boxShadow6 padding62 padding61 padding60 border-radius-3 relative custom-bg-8">
              <div className="text-center">
                <h2 className="font-3 line-h-8 font-medium color-3 m-0 p-0">Got it, we'll recommend fewer like this</h2>
              </div>

              <div className="text-center margin-37">
                <p className="color-3 custom-fs-1 custom-line-h-1 font-normal m-0 p-0">You can additionally take any of the actions below.</p>
              </div>

              <div className="margin51">
                <div className="margin-14 flex justify-center" style={{ marginTop: 0, marginInline: 0 }}>
                  <div className="border-radius10 bdr-5 flex flex-col w-full width61">
                    <button onClick={() => handleToggleMuteAction("user")} disabled={loaders.user} className={`bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-75 ease opacity-[0.9] hover:opacity-100 ${mutedUsers[blog.author._id] || blog.author.isMuted ? "bg-[#f9f9f9]" : "bg-transparent"}`} style={{ borderInline: 0, borderTop: 0 }}>
                      <div className="width-13 aspect-square">
                        <GoMute className="w-full h-full color-3" />
                      </div>
                      <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                        <p className="break-words line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Mute author</p>
                        <p className="break-words line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                      </div>
                    </button>
                    {blog.publication && (
                      <button onClick={() => handleToggleMuteAction("publication")} disabled={loaders.publication} className={`bdr-5 padding-19 padding-42 padding63 cursor-pointer m-0 flex transition-all duration-75 ease opacity-[0.9] hover:opacity-100 ${mutedPublications[blog.publication._id] || blog.publication.isMuted ? "bg-[#f9f9f9]" : "bg-transparent"}`} style={{ borderInline: 0, borderTop: 0 }}>
                        <div className="width-13 aspect-square">
                          <GoMute className="w-full h-full color-3" />
                        </div>
                        <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                          <p className="break-words line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Mute publication</p>
                          <p className="break-words line-clamp-1 text-ellipsis height-6 color-3 custom-fs-1 overflow-hidden custom-line-h-1 font-normal m-0 p-0">Thomas Oppong</p>
                        </div>
                      </button>
                    )}
                    <button onClick={() => handleReportBtnClick()} className="padding-19 padding-42 padding63 cursor-pointer m-0 flex color-9 transition-all duration-75 ease opacity-[0.9] hover:opacity-100">
                      <div className="width-13 aspect-square">
                        <MdOutlineReportGmailerrorred className="w-full h-full" />
                      </div>
                      <div className="flex flex-col custom-gap-1 text-left margin-12" style={{ marginRight: 0 }}>
                        <p className="break-words line-clamp-1 text-ellipsis height-6 color-9 custom-fs-1 overflow-hidden custom-line-h-1 font-medium m-0 p-0">Report story...</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="margin51">
                <div className="flex justify-end custom-gap-2">
                  <button onClick={() => undoNotInterested()} disabled={isLoading} className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 bdr-7 border-radius-9 text-center box-border color-6 font-medium m-0 transition-all duration-75 ease opacity-[0.9] hover:opacity-100">
                    Undo
                  </button>
                  <button onClick={(e) => closeMuteModal(e)} disabled={isLoading} className="cursor-pointer padding-5 custom-line-h-1 custom-fs-1 border-radius-9 text-center box-border font-normal m-0 bdr-6 custom-bg-1 color-2 transition-all duration-75 ease opacity-[0.95] hover:opacity-100">
                    Done
                  </button>
                </div>
              </div>

              <div className="absolute right5 top6">
                <button onClick={(e) => closeMuteModal(e)} className="cursor-pointer m-0 p-0 width-13 aspect-square color-6 transition-all duration-75 ease opacity-75 hover:opacity-100">
                  <IoMdClose className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReportModal && <ReportBlogModal isReportModal={isReportModal} handleCloseReportModal={handleCloseReportModal} blog={blog} />}
    </>
  );
}

export default ShowLessComp;
