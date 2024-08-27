import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";
import AuthPage from "./components/Pages/AuthPages/AuthPage";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [{ path: "dashboard", element: <DashBoard /> }],
    },
    {
      path: "/auth",
      element: <AuthPage />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
