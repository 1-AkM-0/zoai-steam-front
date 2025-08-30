import api from "./api";

const authServices = {
  async refresh() {
    const response = await api.post(
      "/auth/refresh",
      {},
      {
        withCredentials: true,
      },
    );
    const { accessToken } = response.data;
    return accessToken;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Error on logout", error);
    }
    localStorage.removeItem("accessToken");

    window.location.href = "/login";
  },
};

export default authServices;
