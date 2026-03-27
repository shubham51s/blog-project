import React, { useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";
import SubmitBlogModal from "../../components/Common/Modals/SubmitBlog";
import { showToast } from "../../utils/toaster";

function CreatePostPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitModal, setIsShowSubmitModal] = useState(false);
  const [blog, setBlog] = useState({
    heading: "",
    description: "",
    content: "",
    blogId: "",
    isLoading: false,
    publishLoader: false,
    // previewTitle: "",
    // previewSubtitle: "",
    // previewImg: "",
  });

  const handlePublishBlogBtnClick = (tab) => {
    setIsShowSubmitModal(true);
  };

  return (
    <>
      <div className="min-h-full custom-bg-8 font-normal font-3">
        <WriteBlogHeader blog={blog} handlePublishBlogBtnClick={handlePublishBlogBtnClick} />

        <div className="relative top-0 z-[100] w-full height-63"></div>

        <WriteBlogComp blog={blog} setBlog={setBlog} />
      </div>

      {isSubmitModal && <SubmitBlogModal blogId={blog.blogId} setIsShowSubmitModal={setIsShowSubmitModal} tabNo={1} />}
    </>
  );
}

export default CreatePostPage;
