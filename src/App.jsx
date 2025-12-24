import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";
import LoginPage from "./pages/Authentication/login";
import SignupPage from "./pages/Authentication/signup";
import CreatePostPage from "./pages/Create post";
import EditPostPage from "./pages/Edit post";
import PostDetailsPage from "./pages/Post Details";
import MyBlogsPage from "./pages/My blogs";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/Not found";
import AboutPage from "./pages/About";
import GlobalLoaderComp from "./components/Common/globalLoader";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import MainComp from "./pages/Common";
import HomePageProtected from "./pages/Home/Home Protected";
import SavedBlogsPage from "./pages/Library";
import StoriesPage from "./pages/Stories";

function App() {
  const { isInitialLoading } = useContext(UserContext);
  return (
    <>
      {isInitialLoading && <GlobalLoaderComp />}
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<MainComp />}>
          // nested routes
          <Route index element={<HomePageProtected />} /> // home component
          <Route path="me/saved" element={<SavedBlogsPage />} />
          <Route path="me/stories" element={<StoriesPage />} />
          <Route path=":title/:id" element={<PostDetailsPage />} />
        </Route>
        {/* <Route path="/:title/:id" element={<PostDetailsPage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/new-story" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        <Route path="/my-blogs/:id" element={<MyBlogsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
