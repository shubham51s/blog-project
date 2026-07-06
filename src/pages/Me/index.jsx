import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { scrollToTop } from "../../utils/common";

function MePageWrapper() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <Outlet />;
}

export default MePageWrapper;
