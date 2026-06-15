import { createContext, useEffect, useState } from "react";
import { useRequestHandler } from "../hooks/requestHandler";

const CommonContext = createContext();

const CommonProvider = ({ children }) => {
  const { requestHandler } = useRequestHandler();
  const [sidebarData, setSidebarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSidebarData = async () => {
    try {
      const response = await requestHandler("/users/top-recommendation");
      const result = await response.json();

      console.log("result: ", result);
      if (response?.status === 200 && result?.data) {
        setSidebarData(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSidebarData();
  }, []);

  return <CommonContext.Provider value={{ sidebarData, isLoading }}>{children}</CommonContext.Provider>;
};

export { CommonContext };
export default CommonProvider;
