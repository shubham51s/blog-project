import { createContext, useContext, useEffect, useRef, useState } from "react";
import { urlBasePath } from "../constants/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { FollowingContext } from "./followingContext";
import { ListContext } from "./listContext";
import { showToast } from "../utils/toaster";
import { PublicationContext } from "./publication";
import { MuteContext } from "./mute";
import { CommonContext } from "./commonContext";

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
  const [isShowMenu, setIsShowMenu] = useState(localStorage.hasOwnProperty("isShowMenu") ? JSON.parse(localStorage.getItem("isShowMenu")) : true); // to toggle left side menu bar

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
        fetchFollowingAuthorIds();
        fetchFollowingPublicationIds();
        fetchMyLists();
        fetchMutedUsersAndPublications();
        getSidebarData();
      } else {
        // need to check later
        if (location.pathname !== "/") navigate("/");
      }
    } catch (err) {
      // need to check later
      if (location.pathname !== "/") navigate("/");
    } finally {
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

  useEffect(() => {
    verifyAuthentication();
  }, []);

  return <UserContext.Provider value={{ userInfo, isUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isInitialLoading, setIsInitialLoading, isLoginTabActive, setIsLoginTabActive, isShowMenu, setIsShowMenu, verifyAuthentication, fetchUpdatedUserDetails }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
