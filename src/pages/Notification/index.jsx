import React, { useEffect } from "react";
import HomeRightSectionComp from "../../components/Home/Home components/Home Right Content";
import NotificationSection from "../../components/Notification/NotificationSection";

function NotificationPage() {
  return (
    <div className="width-18 m-auto flex justify-evenly h-full">
      <NotificationSection />
      <HomeRightSectionComp />
    </div>
  );
}

export default NotificationPage;
