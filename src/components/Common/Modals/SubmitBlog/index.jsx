import React, { useEffect, useState } from "react";
import SubmitToPublication from "./SubmitToPublication";
import Spinner from "../../Spinner";
import ConfirmBlogSubmission from "./ConfirmSubmission";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { IoCloseOutline } from "react-icons/io5";
import { showToast } from "../../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

function SubmitBlogModal({ id, setIsShowSubmitModal, tabNo = 0, edited = true }) {
  const portalRoot = document.getElementById("portal-root");
  const navigate = useNavigate();
  const { requestHandler } = useRequestHandler();
  const [tab, setTab] = useState(tabNo);
  const [blog, setBlog] = useState(null);
  const [blogLoader, setBlogLoader] = useState(true);
  const [allTopics, setAllTopics] = useState([]);

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  const getDraftDetails = async () => {
    setBlogLoader(true);
    try {
      const response = await requestHandler(`/draft/before-publish/${id}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.draft) {
        const draft = result.data.draft;
        const blog = {
          previewTitle: draft.previewTitle,
          previewSubtitle: draft.previewSubtitle,
          previewImg: draft.previewImg,
          images: draft.images,
          selectedTopic: [],
          edited,
        };

        setBlog(blog);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBlogLoader(false);
    }
  };

  const getBlogDetails = async () => {
    setBlogLoader(true);
    try {
      const response = await requestHandler(`/blogs/blog-preview-details/${id}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blog) {
        const data = result.data.blog;

        if (data.publication) {
          showToast("Blog is already published");
          return;
        }

        const blog = {
          previewTitle: data.previewTitle,
          previewSubtitle: data.previewSubtitle,
          previewImg: data.previewImg,
          images: data.images,
          selectedTopic: data.categories,
          edited,
        };

        setBlog(blog);
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
    handleTabChange(1);
  };

  const publishNew = async () => {
    try {
      const params = {
        previewTitle: blog.previewTitle,
        previewSubtitle: blog.previewSubtitle,
        previewImg: blog.previewImg,
        topics: blog.selectedTopic.map((item) => item._id),
        draftId: id,
      };

      if (blog.publication) params.publicationId = blog.publication._id;

      const response = await requestHandler("/blogs/publish", "POST", params);
      const result = await response.json();

      if (response.status === 200 && result?.data?.blog) {
        const blog = result.data.blog;
        navigate(`/${blog.slug}/${blog._id}`, { replace: true });
      } else {
        showToast(result?.message || "Some error occured");
      }

      return true;
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      return false;
    }
  };

  const submitBlogToPublication = async () => {
    try {
      const params = {
        previewTitle: blog.previewTitle,
        previewSubtitle: blog.previewSubtitle,
        previewImg: blog.previewImg,
        topics: blog.selectedTopic.map((item) => item._id),
        publicationId: blog.publication._id,
        blogId: id,
      };

      const response = await requestHandler("/blogs/submit-to-publication", "POST", params);
      const result = await response.json();

      if (response.status === 200 && result?.data?.blogId && result?.data?.slug) {
        showToast("Blog submitted successfully.");
        navigate(`/${result.data.slug}/${result.data.blogId}`);
        setIsShowSubmitModal(false);
      } else {
        showToast(result?.message || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
    }
  };

  const publishBlog = () => {
    edited ? publishNew() : submitBlogToPublication();
  };

  useEffect(() => {
    edited ? getDraftDetails() : getBlogDetails();

    getAllTopics();
  }, []);

  return createPortal(
    <div className="custom-bg-8 fixed overflow-x-hidden overflow-y-auto text-center top-0 left-0 right-0 min-h-screen flex z-[999]">
      {/* select publication */}
      {((blogLoader && !blog) || (!blogLoader && blog)) && tab === 0 && <SubmitToPublication handlePublicationSelection={handlePublicationSelection} />}
      {/* confirm submit */}
      {!blogLoader && blog && tab === 1 && <ConfirmBlogSubmission allTopics={allTopics} blog={blog} setBlog={setBlog} handleTabChange={handleTabChange} publishBlog={publishBlog} edited={edited} />}

      {/* laoder */}
      {blogLoader && tab === 1 && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* error  */}
      {!blogLoader && !blog && <div className="w-full flex items-center justify-center margin69 font-9 color-4 font-medium">Blog not found.</div>}

      <div className="absolute right-0 top-0 padding-13">
        <button onClick={() => setIsShowSubmitModal(false)} className="cursor-pointer m-0 p-0">
          <div className="width-13 aspect-square">
            <IoCloseOutline className="w-full h-full" />
          </div>
        </button>
      </div>
    </div>,
    portalRoot,
  );
}

export default SubmitBlogModal;
