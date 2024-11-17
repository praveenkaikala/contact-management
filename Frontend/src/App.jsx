import { useState } from "react";
import "./App.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ContactPage from "./pages/ContactPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PageNotFound from "./pages/PageNotFound";
const checkToken = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

function App() {
  const [count, setCount] = useState(0);
  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/contacts",
      element: <ContactPage />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
