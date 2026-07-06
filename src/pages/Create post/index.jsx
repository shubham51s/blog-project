import React, { useEffect, useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";
import SubmitBlogModal from "../../components/Common/Modals/SubmitBlog";
import Spinner from "../../components/Common/Spinner";
import NotFoundComp from "../../components/Common/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";
import { useImageUpload } from "../../hooks/upload";
import { showToast } from "../../utils/toaster";

function CreatePostPage() {
  const { deleteImages } = useImageUpload();
  const { draftId } = useParams();
  const navigate = useNavigate();
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitModal, setIsShowSubmitModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [images, setImages] = useState({
    pending: [],
    uploaded: [],
    failed: [],
  });
  const [blog, setBlog] = useState({
    heading: "",
    description: "",
    content: "",
    isLoading: false,
    publishLoader: false,
    blog: null,
  });

  const getDraftDetails = async () => {
    setBlog((prev) => ({ ...prev, draftId }));
    try {
      const response = await requestHandler(`/draft/${draftId}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.draft) {
        const blog = result.data.draft;
        setBlog((prev) => ({ ...prev, ...blog }));
        setImages((prev) => ({ ...prev, uploaded: blog.images || [] }));
        setIsDraft(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async (heading, description, content) => {
    setBlog((prev) => ({ ...prev, isLoading: true }));
    try {
      let filteredContent = content;
      const imgToDelete = [];
      const uploadImgArr = [];

      images.uploaded.forEach((img) => {
        if (img?.blobUrl) {
          if (filteredContent.includes(img.blobUrl)) {
            filteredContent = filteredContent.split(img.blobUrl).join(img.url);
            uploadImgArr.push({ url: img.url, public_id: img.public_id });
          } else {
            imgToDelete.push(img.public_id);
          }
        } else {
          uploadImgArr.push({ url: img.url, public_id: img.public_id });
        }
      });

      const params = {
        heading,
        description,
        content: filteredContent,
        draftId: blog.draftId,
        images: uploadImgArr,
      };

      const response = await requestHandler("/draft/save", "POST", params);
      const result = await response.json();

      if (imgToDelete.length) deleteImages(imgToDelete);

      if (response?.status === 200 || response?.status === 201) {
        if (response?.status === 201 && result?.data?.draftId) {
          setBlog((prev) => ({ ...prev, draftId: result.data.draftId }));
          setIsDraft(true);
          navigate(`/p/${result.data.draftId}/edit`, { replace: true });
        }
      }

      return response?.status === 200;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setBlog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const saveAndPublishEditedDraft = async () => {
    try {
      const isDraftSaved = await saveDraft(blog.heading, blog.description, blog.content);
      if (!isDraftSaved) {
        showToast("Some error occured.");
        return;
      }
      setBlog((prev) => ({ ...prev, isLoading: true }));

      const params = {
        draftId: blog.draftId,
      };
      const response = await requestHandler("/blogs/edit", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.blogId && result?.data?.slug) {
        navigate(`/${result.data.slug}`, { replace: true });
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setBlog((prev) => ({ ...prev, isLoading: true }));
    }
  };

  const handlePublishBlogBtnClick = (tab) => {
    if (blog.blog) {
      saveAndPublishEditedDraft();
      return;
    }
    setSelectedTab(tab);
    setIsShowSubmitModal(true);
  };

  useEffect(() => {
    if (draftId) getDraftDetails();
    else setIsLoading(false);
  }, []);

  return (
    <>
      <div className="min-h-full custom-bg-8 font-normal font-3">
        <WriteBlogHeader blog={blog} handlePublishBlogBtnClick={handlePublishBlogBtnClick} images={images} />

        <div className="relative top-0 z-[100] w-full height-63"></div>

        {!isLoading && (!draftId || (draftId && isDraft)) && <WriteBlogComp blog={blog} setBlog={setBlog} saveDraft={saveDraft} images={images} setImages={setImages} />}

        {isLoading && (
          <div className="w-screen h-screen flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {!isLoading && draftId && !isDraft && (
          <div className="min-w-screen min-h-screen flex items-center">
            <NotFoundComp />
          </div>
        )}
      </div>

      {isSubmitModal && <SubmitBlogModal id={blog.draftId} setIsShowSubmitModal={setIsShowSubmitModal} tabNo={selectedTab} edited={true} />}
    </>
  );
}

export default CreatePostPage;
