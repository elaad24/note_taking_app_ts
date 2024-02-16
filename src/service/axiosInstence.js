import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:50001",
});

api.interceptors.response.use(
  (resonse) => resonse,
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // marking the request to avoid infinite loop

      // Request a new access token using the refresh token
      try {
        const response = await axios.post(
          "/refresh_token",
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        // Update the header of the failed request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        // Store the new access token in the frontend securely (if not using HttpOnly cookies for access tokens)
        document.cookie = `accessToken:${accessToken}; path=/; expires=${new Date(
          Date.now() + 900000
        )} secure; SameSite=Lax`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
