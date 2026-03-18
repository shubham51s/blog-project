import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserProvider from "./context/userContext.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "prosemirror-view/style/prosemirror.css";
import FollowingProvider from "./context/followingContext.jsx";
import ListProvider from "./context/listContext.jsx";
import PublicationProvider from "./context/publication.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PublicationProvider>
        <FollowingProvider>
          <ListProvider>
            <UserProvider>
              <App />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 2500,
                  style: {
                    background: "#111",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "14px",
                    padding: "12px 24px",
                  },
                }}
              />
            </UserProvider>
          </ListProvider>
        </FollowingProvider>
      </PublicationProvider>
    </BrowserRouter>
  </StrictMode>,
);
