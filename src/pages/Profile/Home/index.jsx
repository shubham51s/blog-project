import React, { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import BlogComp from "../../../components/ProfileComp/HomeSection/BlogComp";
import BlogLoader from "../../../components/ProfileComp/HomeSection/BlogComp/skeleton";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";

function Home() {
  const { user } = useOutletContext();
  const { requestHandler } = useRequestHandler();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const defaultLoader = useRef(null);
  const [isDefaultLoader, setIsDefaultLoader] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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
    if (user && !user.isNoBlogPublished && !isMounted) {
      fetchBlogs(0);
      setIsMounted(true);
    }
  }, [user]);

  useEffect(() => {
    if (defaultLoader.current) clearTimeout(defaultLoader.current);

    defaultLoader.current = setTimeout(() => {
      setIsDefaultLoader(false);
    }, 150);
  }, []);

  return (
    <div className="grow-1 shrink-0 basis-auto">
      <div className="custom-px-2">
        <div>
          {(!user || isLoading || isDefaultLoader) && Array.from({ length: 2 }).map((_, i) => <BlogLoader key={i} />)}
          {!isLoading && !isDefaultLoader && user && !user.isNoBlogPublished && blogs.map((item) => <BlogComp key={item._id} item={item} />)}
        </div>
      </div>
      {/* show lists components in home section when user has not published a single blog */}
      {!isLoading && !isDefaultLoader && user && user.isNoBlogPublished && (
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-12">
            <div>{user && Array.from({ length: 2 }).map((_, i) => <ListComp user={user} key={i} />)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
