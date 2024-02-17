import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiResponse {
  accessToken: string;
}

// Extend AxiosRequestConfig to include custom properties
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Optional property to indicate retry status
}

const api = axios.create({
  baseURL: "http://localhost:50001",
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    if (error.response && error.response.status === 401) {
      // Use the extended interface with a non-null assertion
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Initialize headers object if undefined
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }

      // Check if the error is due to an expired access token and to avoid infinite loop
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Marking the request to avoid infinite loop

        // Request a new access token using the refresh token
        try {
          const response = await axios.post<ApiResponse>(
            `${originalRequest.baseURL}/refresh_token`, // Ensure to use the full path if baseURL is not automatically applied
            {},
            { withCredentials: true }
          );
          const { accessToken } = response.data;

          // Update the header of the failed request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          // Store the new access token in the frontend securely
          document.cookie = `accessToken=${accessToken}; path=/; expires=${new Date(
            Date.now() + 900000
          ).toUTCString()}`;

          // Retry the original request with the new access token
          return api(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., redirect to login page)
          return Promise.reject(refreshError);
        }
      }
    }

    // Return or handle the error if it's not a 401 or if retrying didn't work
    return Promise.reject(error);
  }
);

export default api;
