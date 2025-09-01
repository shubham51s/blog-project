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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* temporary home page changed */}
        <Route path="/post/:id" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        {/* temporary post details page changed */}
        <Route path="/" element={<PostDetailsPage />} />
        <Route path="/my-blogs/:id" element={<MyBlogsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
