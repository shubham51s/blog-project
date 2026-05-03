import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/Create post";
import NotFoundPage from "./pages/Not found";
import AboutPage from "./pages/About";
import GlobalLoaderComp from "./components/Common/globalLoader";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import MainComp from "./pages/Common";
import HomePageProtected from "./pages/Home/Home Protected";
import StoriesPage from "./pages/Stories";
import Home from "./pages/Profile/Home";
import About from "./pages/Profile/About";
import List from "./pages/Profile/List";
import Follower from "./pages/Profile/Follower";
import Following from "./pages/Profile/Following";
import ProfilePage from "./pages/Profile";
import ListDetailsPage from "./pages/ListDetails";
import PostDetailsPageWrapper from "./pages/Post Details/pageWrapper";
import LibraryPage from "./pages/Library";
import MyLists from "./pages/Library/Home";
import SavedLists from "./pages/Library/SavedLists";
import ReadingHistory from "./pages/Library/ReadingHistory";
import MePageWrapper from "./pages/Me";
import MePageDefaultComp from "./components/Me/DefaultComp";
import MyFollowing from "./pages/Recommendation/Following";
import MyReadingHistory from "./pages/Recommendation/ReadingHistory";
import Muted from "./pages/Recommendation/Muted";
import Suggestions from "./pages/Recommendation/Suggestions";
import CommonLayout from "./pages/Settings/CommonLayout";
import Account from "./pages/Settings/Account";
import Publishing from "./pages/Settings/Publishing";
import Security from "./pages/Settings/Security";
import NewPublication from "./pages/NewPublication";
import PublicationFollowers from "./pages/Publication/Followers";
import PublicationInbox from "./pages/Publication/Inbox";
import PublicationDetailsWrapper from "./pages/Publication/PublicationDetails/wrapper";
import PublicationSettingsWrapper from "./pages/Publication/Settings/wrapper";
import TopicDetails from "./pages/TopicDetails";
import NotificationPage from "./pages/Notification";
import StatsPageWrapper from "./pages/Stats";
import AllStatsPage from "./pages/Stats/AllStats";
import BlogStatsPage from "./pages/Stats/Blog";
import AudienceStats from "./pages/Stats/Audience";

function App() {
  const { isInitialLoading } = useContext(UserContext);

  // onPointerDownOutside={(e) => e.preventDefault()}
  return (
    <>
      {isInitialLoading && <GlobalLoaderComp />}
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/new-story" element={<CreatePostPage />} />
        <Route path="p/:draftId/edit" element={<CreatePostPage />} />
        <Route path="/" element={<MainComp />}>
          // nested routes
          <Route index element={<HomePageProtected />} />
          <Route path="new-publication" element={<NewPublication />} />
          <Route path="me" element={<MePageWrapper />}>
            <Route index element={<MePageDefaultComp />} />
            <Route path="lists" element={<LibraryPage />}>
              <Route index element={<MyLists />} />
              <Route path="saved" element={<SavedLists />} />
              <Route path="reading-history" element={<ReadingHistory />} />
            </Route>
            <Route path="stories" element={<StoriesPage />} />
            <Route path="following">
              <Route index element={<MyFollowing />} />
              <Route path="suggestions" element={<Suggestions />} />
            </Route>
            <Route path="settings/mute" element={<Muted />} />
            <Route path="settings" element={<CommonLayout />}>
              <Route index element={<Account />} />
              <Route path="publishing" element={<Publishing />} />
              <Route path="security" element={<Security />} />
            </Route>
            <Route path="readinghistory" element={<MyReadingHistory />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="stats" element={<StatsPageWrapper />}>
              <Route index element={<AllStatsPage />} />
              <Route path="post/:postId" element={<BlogStatsPage />} />
            </Route>
            <Route path="audience" element={<AudienceStats />} />
          </Route>
          <Route path="profile/:username" element={<ProfilePage />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="lists" element={<List />} />
            <Route path="followers" element={<Follower />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route path="profile/:username/list/:slug/:listId" element={<ListDetailsPage />} />
          <Route path="publication/:slug" element={<PublicationDetailsWrapper />} />
          <Route path="publication/:slug/followers" element={<PublicationFollowers />} />
          <Route path="publication/:slug/manage/inbox" element={<PublicationInbox />} />
          <Route path="tag/:slug" element={<TopicDetails />} />
          <Route path=":slug/settings" element={<PublicationSettingsWrapper />} />
          <Route path=":slug/:id" element={<PostDetailsPageWrapper />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
