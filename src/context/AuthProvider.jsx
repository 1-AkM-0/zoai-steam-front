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

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken && !accessToken) {
      refreshTokens(refreshToken);
    }
  }, []);

  const refreshTokens = async (refreshToken) => {
    try {
      const res = await api.post("auth/refresh", { refreshToken });
      setAccessToken(res.data.accessToken);
    } catch (e) {
      logout();
    }
  };

  const login = async (username, password) => {
    const res = await api.post("auth/login", { username, password });
    setAccessToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    console.log(accessToken);
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
    return api.post(url, data, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });
  };

  const authGetRequest = async (url) => {
    return api.get(url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });
  };

  const authDeleteJoke = async (id) => {
    return api.delete(`/jokes/${id}`, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });
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
