import React from "react";
import { useParams } from "react-router-dom";
import ProfileCommonLayout from "./CommonLayout";

function ProfilePage() {
  const { username } = useParams();

  return <ProfileCommonLayout key={username} />;
}

export default ProfilePage;
