import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { AuthForm } from "../components/AuthForm";
export default function Login() {
  const { login } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const initialValues = location.state
  const handleLogin = async ({ username, password }) => {
    try {
      await login(username, password)
      navigate('/')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (

    <AuthForm title={'Login'} buttonText={'Login'} onSubmit={handleLogin} initialValues={initialValues} />


  )
}
