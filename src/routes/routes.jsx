import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },

]

export default routes
