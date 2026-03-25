import React, { useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";
import SubmitBlogModal from "../../components/Common/Modals/SubmitBlog";

function CreatePostPage() {
  const [blog, setBlog] = useState({
    heading: "",
    description: "",
    content: "",
    isShowPreview: false,
    isSync: false,
    // previewTitle: "",
    // previewSubtitle: "",
    // previewImg: "",
  });

  const handlePublishBlogBtnClick = () => {
    if (!blog.isShowPreview) setBlog((prev) => ({ ...prev, isShowPreview: true }));
  };

  return (
    <>
      {true && (
        <div className="min-h-full custom-bg-8 font-normal font-3">
          <WriteBlogHeader blog={blog} handlePublishBlogBtnClick={handlePublishBlogBtnClick} />

          <div className="relative top-0 z-[100] w-full height-63"></div>

          <WriteBlogComp blog={blog} setBlog={setBlog} />
        </div>
      )}
      {/* <SubmitBlogModal /> */}
    </>
  );
}

export default CreatePostPage;
