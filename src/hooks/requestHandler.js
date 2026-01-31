import { useContext } from "react";
import { urlBasePath } from "../constants/constant";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

// same as useApi custom hook but created later for better names
export function useRequestHandler() {
  // const { setUserInfo, setIsUserLoggedIn } = useContext(UserContext);

  async function requestHandler(url, method = "GET", param = null) {
    try {
      const response = await fetch(`${urlBasePath}${url}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method,
        body: param ? JSON.stringify(param) : null,
      });

      if (response?.status === 401) {
        // setIsUserLoggedIn(false);
        // setUserInfo({});
        // useNavigate("/");
        window.location.reload();
      }

      return response;
    } catch (err) {
      window.location.reload();
      return null;
    }
  }

  return { requestHandler };
}
