import React from "react";
import { useParams } from "react-router-dom";
import PostDetailsPage from "./index";

function PostDetailsPageWrapper() {
  const { id } = useParams();

  return <PostDetailsPage key={id} />;
}

export default PostDetailsPageWrapper;
