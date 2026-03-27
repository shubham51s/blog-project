import React, { useEffect, useState } from "react";
import SubmitToPublication from "./SubmitToPublication";
import Spinner from "../../Spinner";
import ConfirmBlogSubmission from "./ConfirmSubmission";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { IoCloseOutline } from "react-icons/io5";

function SubmitBlogModal({ blogId, setIsShowSubmitModal, tabNo }) {
  const [tab, setTab] = useState(tabNo);
  const { requestHandler } = useRequestHandler();
  const [blog, setBlog] = useState(null);
  const [blogLoader, setBlogLoader] = useState(true);
  const [allTopics, setAllTopics] = useState([]);

  const getBlogDetails = async () => {
    setBlogLoader(true);
    try {
      const response = await requestHandler(`/blogs/before-publish/${blogId}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blog) {
        setBlog({ ...result.data.blog });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBlogLoader(false);
    }
  };

  const getAllTopics = async () => {
    try {
      const response = await requestHandler("/topic");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.topics) {
        setAllTopics(result.data.topics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublicationSelection = (publication) => {
    setBlog((prev) => ({ ...prev, publication: { ...publication } }));
    setTab(1);
  };

  useEffect(() => {
    getBlogDetails();
    getAllTopics();
  }, []);

  return (
    <div className="custom-bg-8 fixed overflow-x-hidden overflow-y-auto text-center top-0 left-0 right-0 min-h-screen flex z-[900]">
      {/* select publication */}
      {((blogLoader && !blog) || (!blogLoader && blog)) && tab === 0 && <SubmitToPublication handlePublicationSelection={handlePublicationSelection} />}
      {/* confirm submit */}
      {!blogLoader && blog && tab === 1 && <ConfirmBlogSubmission allTopics={allTopics} blog={blog} setBlog={setBlog} setTab={setTab} />}

      {/* laoder */}
      {blogLoader && tab === 1 && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* error  */}
      {!blogLoader && !blog && <div className="w-full flex items-center justify-center margin69 font-9 color-4 font-medium">Something went wrong !</div>}

      <div className="absolute right-0 top-0 padding-13">
        <button onClick={() => setIsShowSubmitModal(false)} className="cursor-pointer m-0 p-0">
          <div className="width-13 aspect-square">
            <IoCloseOutline className="w-full h-full" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SubmitBlogModal;
