import { urlBasePath } from "../constants/constant";

// same as useApi custom hook but created later for better names
export function useRequestHandler() {
  async function requestHandler(url, method = "GET", param = null) {
    try {
      const response = await fetch(`${urlBasePath}${url}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method,
        body: param ? JSON.stringify(param) : null,
      });

      if (response?.status === 401) {
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
