import React, { useEffect, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "../../../components/ProfileComp/HomeSection/BlogComp";
import BlogLoader from "../../../components/ProfileComp/HomeSection/BlogComp/skeleton";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async (skip) => {
    try {
      const response = await requestHandler(`/blogs/user/${user._id}?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200) {
        setBlogs(result.data.blogs);
      }
    } catch (err) {
      console.error(err);
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
          {user && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
          {!user && Array.from({ length: 2 }).map((_, i) => <BlogLoader key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
