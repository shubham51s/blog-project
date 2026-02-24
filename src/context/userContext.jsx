import { createContext, useContext, useEffect, useRef, useState } from "react";
import { urlBasePath } from "../constants/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { FollowingContext } from "./followingContext";
import { ListContext } from "./listContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(null);
  const { fetchFollowingAuthorIds } = useContext(FollowingContext);
  const { fetchMyLists } = useContext(ListContext);
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

      if (response.status === 200 && result?.data?.user) {
        setUserInfo({ ...result.data.user });
        setIsUserLoggedIn(true);
        fetchFollowingAuthorIds();
        fetchMyLists();
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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      verifyAuthentication();
    }
  }, []);

  return <UserContext.Provider value={{ userInfo, isUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isInitialLoading, setIsInitialLoading, isLoginTabActive, setIsLoginTabActive, isShowMenu, setIsShowMenu, verifyAuthentication }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
