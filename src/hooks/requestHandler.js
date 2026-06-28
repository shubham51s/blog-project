import { urlBasePath } from "../constants/constant";
let refreshPromise = null;

export function useRequestHandler() {
  async function sendRequest(url, method = "GET", param = null) {
    return fetch(`${urlBasePath}${url}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method,
      body: param ? JSON.stringify(param) : null,
    });
  }

  async function refreshAccessToken() {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const response = await sendRequest("/users/refresh-token");
          return response.status === 200;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    return refreshPromise;
  }

  async function requestHandler(url, method = "GET", param = null, retry = true) {
    try {
      let response = await sendRequest(url, method, param);

      if (!retry || response.status !== 401) {
        return response;
      }

      const refreshSuccess = await refreshAccessToken();

      if (!refreshSuccess) {
        window.location.reload();
        return null;
      }

      return await requestHandler(url, method, param, false);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return { requestHandler };
}
