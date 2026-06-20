import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection/ListComp";
import ListLoader from "../../../components/ProfileComp/ListSection/ListComp/skeleton";
import { defaultLoaderTime } from "../../../constants/constant";

function List() {
  const loaderTimeout = useRef(null);
  const { user, setUser } = useOutletContext();
  const [defaultLoader, setDefaultLoader] = useState(true);

  const filterOutDeletedList = (listId) => {
    const updatedList = user.lists.filter((item) => item._id !== listId);
    const publicOnlyLists = user.publicLists.filter((item) => item._id !== listId);
    setUser((prev) => ({ ...prev, lists: updatedList, publicLists: publicOnlyLists }));
  };

  useEffect(() => {
    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div className="grow shrink-0 basis-auto">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          <div>{(defaultLoader || !user) && Array.from({ length: 2 }).map((_, i) => <ListLoader key={i} />)}</div>
          {!defaultLoader && user && (
            <>
              <div>{user?.lists?.length > 0 && user.lists.map((item) => <ListComp user={user} setUser={setUser} item={item} key={item._id} filterOutDeletedList={filterOutDeletedList} />)}</div>
              {user?.lists?.length === 0 && <div className="flex items-center justify-center margin-39 color-4 font-10">No public lists found</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
