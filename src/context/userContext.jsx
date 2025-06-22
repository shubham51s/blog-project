import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState("username");

  return <UserContext.Provider value={(userData, setUserData)}>{children}</UserContext.Provider>;
};

export { UserContext };

export default UserProvider;
