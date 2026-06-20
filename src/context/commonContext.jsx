import { createContext, useEffect, useState } from "react";
import { useRequestHandler } from "../hooks/requestHandler";

const CommonContext = createContext();

const CommonProvider = ({ children }) => {
  const { requestHandler } = useRequestHandler();
  const [sidebarData, setSidebarData] = useState({
    isLoading: true,
    blogs: [],
    topics: [],
    toFollow: [],
  });

  const getSidebarData = async () => {
    try {
      const response = await requestHandler("/users/top-recommendation");
      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        setSidebarData((prev) => ({ ...prev, ...result.data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSidebarData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return <CommonContext.Provider value={{ sidebarData, getSidebarData }}>{children}</CommonContext.Provider>;
};

export { CommonContext };
export default CommonProvider;
