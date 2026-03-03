import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";
import LoginPage from "./pages/Authentication/login";
import SignupPage from "./pages/Authentication/signup";
import CreatePostPage from "./pages/Create post";
import EditPostPage from "./pages/Edit post";
import MyBlogsPage from "./pages/My blogs";
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
import Settings from "./pages/Settings";
function App() {
  const { isInitialLoading } = useContext(UserContext);

  // onPointerDownOutside={(e) => e.preventDefault()}
  return (
    <>
      {isInitialLoading && <GlobalLoaderComp />}
      <Routes>
        <Route path="/" element={<MainComp />}>
          // nested routes
          <Route index element={<HomePageProtected />} />
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
            <Route path="settings">
              <Route index element={<Settings />} />
              <Route path="mute" element={<Muted />} />
            </Route>
            <Route path="readinghistory" element={<MyReadingHistory />} />
          </Route>
          <Route path="profile/:username" element={<ProfilePage />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="lists" element={<List />} />
            <Route path="followers" element={<Follower />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route path="profile/:username/list/:slug/:listId" element={<ListDetailsPage />} />
          <Route path=":slug/:id" element={<PostDetailsPageWrapper />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/new-story" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        <Route path="/my-blogs/:id" element={<MyBlogsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
