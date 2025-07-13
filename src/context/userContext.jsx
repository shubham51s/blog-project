import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isShowSignupPopup, setIsShowSignupPopup] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(true);

  return <UserContext.Provider value={{ userData, setUserData, isUserLoggedIn, setIsUserLoggedIn, isShowLoginPopup, setIsShowLoginPopup, isShowSignupPopup, setIsShowSignupPopup }}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
