import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import { showToast } from "../../../utils/toaster";

function List() {
  const { requestHandler } = useRequestHandler();
  const defaultLoaderTimeout = useRef(null);
  const { user } = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [lists, setLists] = useState([]);

  const fetchUserLists = async () => {
    try {
      const response = await requestHandler(`/list/user/${user._id}`);

      const result = await response.json();

      if (response?.status === 200) {
        setLists(result?.data?.lists);
        console.log("result?.data?.lists: ", result?.data?.lists);
      } else {
        if (response?.status >= 500) {
          showToast("Some error occured");
        } else {
          showToast(result?.message || "Some error occured");
        }
      }
      if (isLoading) setIsLoading(false);
    } catch (err) {
      console.error(err);
      if (isLoading) setIsLoading(false);
      showToast("Some error occured");
    }
  };

  useEffect(() => {
    if (user) fetchUserLists();

    if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);

    defaultLoaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
    }, 500);
  }, [user]);

  return (
    <div className="grow shrink-0 basis-auto">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          <div>{(isLoading || defaultLoader || !user) && Array.from({ length: 2 }).map((_, i) => <ListLoader user={user} key={i} />)}</div>
          <div>{!isLoading && !defaultLoader && user && lists.map((item) => <ListComp user={user} item={item} key={item._id} />)}</div>
        </div>
      </div>
    </div>
  );
}

export default List;
