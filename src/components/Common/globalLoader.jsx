import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function GlobalLoaderComp() {
  return (
    <div className="w-screen h-screen fixed inset-0 z-[9999] flex items-center justify-center custom-bg-2">
      <div className="width-4 aspect-square flex items-center justify-center">
        <CircularProgress style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export default GlobalLoaderComp;
