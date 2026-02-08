import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";

function List() {
  const defaultLoaderTimeout = useRef(null);
  const { user, setUser } = useOutletContext();
  const [defaultLoader, setDefaultLoader] = useState(true);

  const filterOutDeletedList = (listId) => {
    const updatedList = user.lists.filter((item) => item._id !== listId);
    const publicOnlyLists = user.publicLists.filter((item) => item._id !== listId);
    setUser((prev) => ({ ...prev, lists: updatedList, publicLists: publicOnlyLists }));
  };

  useEffect(() => {
    if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);

    defaultLoaderTimeout.current = setTimeout(() => {
      setDefaultLoader(false);
    }, 500);

    return () => {
      if (defaultLoaderTimeout.current) clearTimeout(defaultLoaderTimeout.current);
    };
  }, []);

  return (
    <div className="grow shrink-0 basis-auto">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          <div>{(defaultLoader || !user) && Array.from({ length: 2 }).map((_, i) => <ListLoader user={user} key={i} />)}</div>
          <div>{!defaultLoader && user && user.lists?.length > 0 && user.lists.map((item) => <ListComp user={user} setUser={setUser} item={item} key={item._id} filterOutDeletedList={filterOutDeletedList} />)}</div>
          {!defaultLoader && user && user.lists.length === 0 && <div className="flex items-center justify-center margin-39 color-4 font-10">No public lists found.</div>}
        </div>
      </div>
    </div>
  );
}

export default List;
