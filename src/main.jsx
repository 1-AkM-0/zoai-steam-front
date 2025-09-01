import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.jsx";
import routes from './routes/routes.jsx'
import { AuthProvider } from "./context/AuthProvider"
const router = createBrowserRouter(routes)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Header />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
