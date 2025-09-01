/* import api, { getRefreshToken } from "./api";

const authServices = {
  async refresh() {
    const refreshToken = getRefreshToken();
    const response = await api.post(
      "/auth/refresh",
      { refreshToken: refreshToken },
      {
        withCredentials: true,
      },
    );
    const { accessToken } = response.data;
    return accessToken;
  },

  async logout() {
    const refreshToken = getRefreshToken();
    try {
      await api.post(
        "/auth/logout",
        { refreshToken },
        { withCredentials: true },
      );
    } catch (error) {
      console.warn("Error on logout", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export default authServices; */
