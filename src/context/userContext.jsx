import { createContext, useEffect, useState } from "react";
import { urlBasePath } from "../constants/constant";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isShowSignupPopup, setIsShowSignupPopup] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [signUpHeading, setSignUpHeading] = useState("");
  const tempUserProfile = "https://cdn-images-1.medium.com/fit/c/40/40/0*AbhaXOwX9-XpKPtX";

  const verifyAuthentication = async () => {
    try {
      const response = await fetch(`${urlBasePath}/users/me`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });

      setIsInitialLoading(false);

      if (response.status === 200) {
        const result = await response.json();
        setUserInfo({ ...result.data.user, profileImg: tempUserProfile });
        setIsUserLoggedIn(true);
      } else {
        // need to check later
        if (location.pathname !== "/") navigate("/");
      }
    } catch (err) {
      setIsInitialLoading(false);
      // need to check later
      if (location.pathname !== "/") navigate("/");
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  return <UserContext.Provider value={{ userInfo, setUserInfo, isUserLoggedIn, setIsUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isShowSignupPopup, setIsShowSignupPopup, signUpHeading, setSignUpHeading, isInitialLoading, setIsInitialLoading }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
