import React, { useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";

function CreatePostPage() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const createNewBlog = () => {
    try {
      console.log("createNewBlog");
    } catch (err) {
      console.log("createNewBlog catch blog: ", err);
    }
  };

  return (
    <div className="min-h-full custom-bg-8 font-normal font-3">
      <WriteBlogHeader heading={heading} description={description} createNewBlog={createNewBlog} />

      <div className="relative top-0 z-[100] w-full height-63"></div>

      <WriteBlogComp setHeading={setHeading} heading={heading} setContent={setContent} setDescription={setDescription} />
    </div>
  );
}

export default CreatePostPage;
