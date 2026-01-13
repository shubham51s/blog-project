import React from "react";
import { useOutletContext } from "react-router-dom";
import ListComp from "../../../components/ProfileComp/ListSection";

function List() {
  const { user } = useOutletContext();

  return (
    <div className="grow shrink-0 basis-auto">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          <div>{user && Array.from({ length: 2 }).map((_, i) => <ListComp user={user} key={i} />)}</div>
        </div>
      </div>
    </div>
  );
}

export default List;
