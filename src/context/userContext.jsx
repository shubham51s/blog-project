import { createContext, useContext, useEffect, useRef, useState } from "react";
import { urlBasePath } from "../constants/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { FollowingContext } from "./followingContext";
import { ListContext } from "./listContext";
import { showToast } from "../utils/toaster";
import { PublicationContext } from "./publication";
import { MuteContext } from "./mute";
import { CommonContext } from "./commonContext";
import { appChannel } from "../utils/authChannel";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchFollowingAuthorIds } = useContext(FollowingContext);
  const { fetchMutedUsersAndPublications } = useContext(MuteContext);
  const { fetchFollowingPublicationIds } = useContext(PublicationContext);
  const { fetchMyLists } = useContext(ListContext);
  const { getSidebarData } = useContext(CommonContext);
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [isLoginTabActive, setIsLoginTabActive] = useState(true);
  const [isAnyErr, setIsAnyErr] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(localStorage.hasOwnProperty("isShowMenu") ? JSON.parse(localStorage.getItem("isShowMenu")) : true); // to toggle left side menu bar
  const lastDataFetched = useRef(Date.now());
  const isLoggedIn = useRef(null);

  const verifyAuthentication = async () => {
    setIsInitialLoading(true);
    try {
      const response = await fetch(`${urlBasePath}/users/me`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();

      if (response?.status === 200 && result?.data?.user) {
        setUserInfo(result.data.user);
        setIsUserLoggedIn(true);
        isLoggedIn.current = true;
        fetchFollowingAuthorIds();
        fetchFollowingPublicationIds();
        fetchMyLists();
        fetchMutedUsersAndPublications();
        getSidebarData();
      } else {
        isLoggedIn.current = null;
        setIsAnyErr(true);
      }
    } catch (err) {
      isLoggedIn.current = null;
      setIsAnyErr(true);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${urlBasePath}/users/refresh-token`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();

      if (response?.status === 200) {
        verifyAuthentication();
      } else {
        setIsInitialLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsAnyErr(true);
      setIsInitialLoading(false);
    }
  };

  const fetchUpdatedUserDetails = async () => {
    try {
      const response = await fetch(`${urlBasePath}/users/me`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();

      if (response?.status === 200 && result?.data?.user) {
        setUserInfo(result.data.user);
        return true;
      }

      showToast(result?.message || "Some error occured.");

      return false;
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
      return false;
    }
  };

  const handleFocusChange = () => {
    if (document.visibilityState === "visible" && isLoggedIn.current && Date.now() - lastDataFetched.current > 30 * 60 * 1000) {
      lastDataFetched.current = Date.now();
      fetchFollowingAuthorIds();
      fetchFollowingPublicationIds();
      fetchMutedUsersAndPublications();
    }
    if (document.visibilityState === "visible" && isLoggedIn.current && Date.now() - lastDataFetched.current > 5 * 60 * 1000) {
      fetchMyLists();
    }
  };

  useEffect(() => {
    refreshToken();

    window.addEventListener("visibilitychange", handleFocusChange);
    return () => {
      window.removeEventListener("visibilitychange", handleFocusChange);
    };
  }, []);

  // created broadcast channel for sync login / logout across multiple open tabs for consistancy
  useEffect(() => {
    const handleAppMessage = (data) => {
      const type = event.data.type;
      if (type === "login" || type === "logout") {
        window.location.reload();
      }
    };

    appChannel.addEventListener("message", handleAppMessage);

    return () => {
      document.removeEventListener("message", handleAppMessage);
    };
  }, []);

  return <UserContext.Provider value={{ userInfo, isUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isInitialLoading, setIsInitialLoading, isLoginTabActive, setIsLoginTabActive, isShowMenu, setIsShowMenu, verifyAuthentication, fetchUpdatedUserDetails, isAnyErr }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
