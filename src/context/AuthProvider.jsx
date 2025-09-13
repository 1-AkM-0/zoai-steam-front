import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export function AuthProvider({ children }) {
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  const [accessToken, setAccessToken] = useState(getAccessToken());

  const isExpiring = (token) => {
    const decode = jwtDecode(token);
    const now = Date.now() / 1000;
    return decode.exp - now < 60;
  };

  const requestInterceptor = async (requestFn) => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (refreshToken && isExpiring(token)) {
      await refreshTokens();
    }
    return requestFn();
  };

  const refreshTokens = async () => {
    const refreshToken = getRefreshToken();
    try {
      const res = await api.post("auth/refresh", { refreshToken });
      setAccessToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (e) {
      await logout();
    }
  };

  const login = async (username, password) => {
    const res = await api.post("auth/login", { username, password });
    setAccessToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  };

  const logout = async () => {
    try {
      const refreshToken = getRefreshToken();
      await api.post("auth/logout", { refreshToken });
    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setAccessToken(null);
  };

  const authRequest = async (url, data) => {
    return requestInterceptor(() =>
      api.post(url, data, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })
    );
  };

  const authGetRequest = async (url) => {
    return requestInterceptor(() =>
      api.get(url, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })
    );
  };

  const authDeleteJoke = async (id) => {
    return requestInterceptor(() =>
      api.delete(`/jokes/${id}`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        authGetRequest,
        getAccessToken,
        accessToken,
        refreshTokens,
        login,
        setAccessToken,
        logout,
        authRequest,
        authDeleteJoke,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
