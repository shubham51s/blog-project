import React from "react";
import { useParams } from "react-router-dom";
import PostDetailsPage from "./index";

function PostDetailsPageWrapper() {
  const { slug } = useParams();

  return <PostDetailsPage key={slug} />;
}

export default PostDetailsPageWrapper;
