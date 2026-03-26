import React, { useEffect, useState } from "react";
import SubmitToPublication from "./SubmitToPublication";
import Spinner from "../../Spinner";
import ConfirmBlogSubmission from "./ConfirmSubmission";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { IoCloseOutline } from "react-icons/io5";

function SubmitBlogModal({ blogId, setIsShowSubmitModal, tabNo = 1 }) {
  const [tab, setTab] = useState(tabNo);
  const { requestHandler } = useRequestHandler();
  const [blog, setBlog] = useState(null);
  const [blogLoader, setBlogLoader] = useState(true);

  const handlePublicationSelection = (publication) => {
    console.log("publication: ", publication);
  };

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

  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <div className="custom-bg-8 fixed overflow-x-hidden overflow-y-auto text-center top-0 left-0 right-0 min-h-screen flex z-[900]">
      {/* select publication */}
      {((blogLoader && !blog) || (!blogLoader && blog)) && tab === 0 && <SubmitToPublication handlePublicationSelection={handlePublicationSelection} />}
      {/* confirm submit */}
      {!blogLoader && blog && tab === 1 && <ConfirmBlogSubmission blog={blog} setBlog={setBlog} />}

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
