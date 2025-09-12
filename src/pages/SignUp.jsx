import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = async ({ username, password }) => {
    try {
      const response = await api.post("/auth/register", { username, password });
      if (response) navigate("/login", { state: { username, password } });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.errors || "Erro inesperado");
    }
  };

  return (
    <AuthForm
      title={"SignUp"}
      buttonText={"SignUp"}
      onSubmit={handleSignUp}
      error={error}
    />
  );
}
