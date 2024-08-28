import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Pages/Mainpages/HomePage";
import DashBoard from "./components/DashBoard/DashBoard";
import AuthPage from "./components/Pages/AuthPages/AuthPage";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import Analytics from "./components/Analytics/Analytics";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [{ path: "dashboard", element: <DashBoard /> },
        {path:'analysis',element:<Analytics/>},
      ],
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
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
