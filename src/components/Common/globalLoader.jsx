import React from "react";
import Spinner from "./Spinner";

function GlobalLoaderComp() {
  return (
    <div className="fixed w-full h-screen inset-0 z-[9999] flex items-center justify-center custom-bg-2">
      <Spinner />
    </div>
  );
}

export default GlobalLoaderComp;
