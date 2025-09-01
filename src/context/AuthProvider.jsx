import { useState } from "react";
import { getToken } from "../api/api";
import authServices from "../api/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken())

  const refresh = async () => {
    const newToken = await authServices.refresh()
    setToken(newToken)
  }
  const logout = async () => {
    await authServices.logout()
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

