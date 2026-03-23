import React, { useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";
import SubmitToPublicationModal from "../../components/Common/Modals/SubmitToPublication";

function CreatePostPage() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const [blog, setBlog] = useState({
    heading: "",
    description: "",
    previewTitle: "",
    previewSubtitle: "",
    previewImg: "",
    content: "",
    isShowPreview: false,
  });

  return (
    <>
      {false && (
        <div className="min-h-full custom-bg-8 font-normal font-3">
          <WriteBlogHeader blog={blog} setBlog={setBlog} heading={heading} description={description} />

          <div className="relative top-0 z-[100] w-full height-63"></div>

          <WriteBlogComp blog={blog} setBlog={setBlog} setHeading={setHeading} heading={heading} setContent={setContent} setDescription={setDescription} />
        </div>
      )}
      <SubmitToPublicationModal />
    </>
  );
}

export default CreatePostPage;
