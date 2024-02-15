export default function setupAxios(axios, store) {
  let isRefreshing = false;
  let refreshSubscribers = [];

  /**
   * axios interceptors runs before and after a request, letting the developer modify req,req more
   * For more details on axios interceptor see https://github.com/axios/axios#interceptors
   */
  axios.interceptors.request.use(
    (config) => {
      const { accessToken } =
        JSON.parse(localStorage.getItem("authToken")) || {};

      if (!config.baseURL) {
        config.baseURL = process.env.REACT_APP_API_URL;
      }

      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      const { refreshToken } =
        JSON.parse(localStorage.getItem("authToken")) || {};

      const originalRequest = config;

      if (
        status === 401 &&
        originalRequest.url !== "login" &&
        originalRequest.url !== "refresh-token"
      ) {
        if (!isRefreshing) {
          isRefreshing = true;

          axios
            .post("refresh-token", {
              refresh: refreshToken,
            })
            .then((response) => {
              localStorage.setItem("authToken", JSON.stringify(response.data));

              isRefreshing = false;
              onRrefreshed(response.data.accessToken);
            })
            .catch((error) => {
              localStorage.removeItem("authToken");
            });

          const retryOriginalRequest = new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              // replace the expired token and retry
              originalRequest.headers["Authorization"] = "Bearer " + token;
              resolve(axios(originalRequest));
            });
          });

          return retryOriginalRequest;
        }
      } else if (data.error) {
        return Promise.reject(data.error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRrefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
  };
}
