import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isShowSignupPopup, setIsShowSignupPopup] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [signUpHeading, setSignUpHeading] = useState("");

  return <UserContext.Provider value={{ userInfo, setUserInfo, isUserLoggedIn, setIsUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isShowSignupPopup, setIsShowSignupPopup, signUpHeading, setSignUpHeading }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
