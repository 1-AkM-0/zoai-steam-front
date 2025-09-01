import { useLocation } from "react-router-dom";
import api, { setToken } from "../api/api";
import { AuthForm } from "../components/AuthForm";
export default function Login() {
  const location = useLocation()
  const initialValues = location.state
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await api.post(
        '/auth/login', { username, password }
      )
      setToken(response.data.accessToken)
      window.location.href = '/'
    }
    catch (err) {
      console.log(err)
    }
  }

  return (

    <AuthForm title={'Login'} buttonText={'Login'} onSubmit={handleLogin} initialValues={initialValues} />


  )
}
