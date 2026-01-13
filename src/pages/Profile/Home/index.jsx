import React, { useEffect, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "../../../components/ProfileComp/HomeSection/BlogComp";
import BlogLoader from "../../../components/ProfileComp/HomeSection/BlogComp/skeleton";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async (skip) => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/blogs/user/${user._id}?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200) {
        setBlogs(result.data.blogs);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBlogs(0);
    }
  }, [user]);
  return (
    <div className="grow-1 shrink-0 basis-auto">
      <div className="custom-px-2">
        <div>
          {(!user || isLoading) && Array.from({ length: 2 }).map((_, i) => <BlogLoader key={i} />)}
          {user && !isLoading && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
          {user && !isLoading && <div className="padding71 padding-19">No content</div>}
        </div>
      </div>
    </div>
  );
}

export default Home;
