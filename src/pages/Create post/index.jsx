import React from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";

function CreatePostPage() {
  return (
    <div className="min-h-full custom-bg-8 font-normal font-3">
      <WriteBlogHeader />

      <div className="relative top-0 z-[100] w-full height-63"></div>

      <WriteBlogComp />
    </div>
  );
}

export default CreatePostPage;
