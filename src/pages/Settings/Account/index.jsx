import React from "react";
import EmailSection from "../../../components/Settings/EmailSection";
import UsernameSection from "../../../components/Settings/UsernameSection";
import ProfileInfoSection from "../../../components/Settings/ProfileInfoSection";
import RecommendationSection from "../../../components/Settings/RecommendationSection";
import MutedSection from "../../../components/Settings/MutedSection";
import BlockedUserSection from "../../../components/Settings/BlockedUserSection";
import DeleteAccountSection from "../../../components/Settings/DeleteAccountSection";

function Account() {
  return (
    <>
      <EmailSection />
      <UsernameSection />
      <ProfileInfoSection />
      <div className="w-full h-0 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
      <RecommendationSection />
      <MutedSection />
      <BlockedUserSection />
      <div className="w-full h-0 bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
      <DeleteAccountSection />
    </>
  );
}

export default Account;
