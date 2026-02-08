import React from "react";
import { Outlet } from "react-router-dom";

function LibraryPage() {
  return (
    <>
      <div>LibraryPage</div>
      <Outlet />
    </>
  );
}

export default LibraryPage;
