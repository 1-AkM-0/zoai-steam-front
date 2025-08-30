import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthForm } from "../components/AuthForm";

export default function SignUp() {
  const navigate = useNavigate()
  const handleSignUp = async ({ username, password }) => {
    try {
      const response = await api.post(
        '/auth/register', { username, password }
      )
      if (response)
        navigate('/login', { state: { username, password } })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (

    <AuthForm title={'SignUp'} buttonText={'SignUp'} onSubmit={handleSignUp} />


  )
}
