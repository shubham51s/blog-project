import { useContext } from "react";
import { urlBasePath } from "../constants/constant";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export function useApi() {
  const { setUserInfo, setIsUserLoggedIn } = useContext(UserContext);

  async function fetchRequest(url, method, param = null) {
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

  return { fetchRequest };
}
