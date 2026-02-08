import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "../../../components/ProfileComp/HomeSection/BlogComp";
import BlogLoader from "../../../components/ProfileComp/HomeSection/BlogComp/skeleton";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import List from "../List";

function Home() {
  const { user } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(null);

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
    if (user && !user.isNoBlogPublished && !isMounted.current) {
      fetchBlogs(0);
      isMounted.current = true;
    }
  }, [user]);

  return (
    <>
      {(!user || (user && !user.isNoBlogPublished)) && (
        <div className="grow shrink-0 basis-auto">
          <div className="custom-px-2">
            <div>
              {(!user || isLoading) && Array.from({ length: 2 }).map((_, i) => <BlogLoader key={i} />)}
              {!isLoading && user && !user.isNoBlogPublished && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
            </div>
          </div>
        </div>
      )}

      {/* show lists components in home section when user has not published a single blog */}
      {user && user.isNoBlogPublished && <List />}
    </>
  );
}

export default Home;
