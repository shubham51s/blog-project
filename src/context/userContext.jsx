import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [isShowSignupPopup, setIsShowSignupPopup] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [signUpHeading, setSignUpHeading] = useState("");

  return <UserContext.Provider value={{ userData, setUserData, isUserLoggedIn, setIsUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isShowSignupPopup, setIsShowSignupPopup, signUpHeading, setSignUpHeading }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
