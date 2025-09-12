import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { AuthForm } from "../components/AuthForm";

export default function Login() {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues = location.state;
  const handleLogin = async ({ username, password }) => {
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.errors || "Username ou Senha incorretos");
    }
  };

  return (
    <AuthForm
      title={"Login"}
      buttonText={"Login"}
      onSubmit={handleLogin}
      initialValues={initialValues}
      error={error}
    />
  );
}
