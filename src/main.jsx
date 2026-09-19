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
import MuteProvider from "./context/mute.jsx";
import CommonProvider from "./context/commonContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../constants.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MuteProvider>
        <PublicationProvider>
          <FollowingProvider>
            <ListProvider>
              <CommonProvider>
                <UserProvider>
                  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <App />
                  </GoogleOAuthProvider>
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      duration: 3000,
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
              </CommonProvider>
            </ListProvider>
          </FollowingProvider>
        </PublicationProvider>
      </MuteProvider>
    </BrowserRouter>
  </StrictMode>,
);
