import React, { useState } from "react";
import WriteBlogHeader from "../../components/CreateNewBlogComp/Header";
import WriteBlogComp from "../../components/CreateNewBlogComp/WriteBlogComp";

function CreatePostPage() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createNewBlog = () => {
    setIsLoading(true);
    try {
      console.log("createNewBlog");
    } catch (err) {
      setIsLoading(false);
      console.log("createNewBlog catch blog: ", err);
    }
  };

  return (
    <div className="min-h-full custom-bg-8 font-normal font-3">
      <WriteBlogHeader heading={heading} description={description} createNewBlog={createNewBlog} isLoading={isLoading} />

      <div className="relative top-0 z-[100] w-full height-63"></div>

      <WriteBlogComp setHeading={setHeading} heading={heading} setContent={setContent} setDescription={setDescription} />
    </div>
  );
}

export default CreatePostPage;
