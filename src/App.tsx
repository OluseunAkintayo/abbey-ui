import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./Pages/Profile";
import LoginPage from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <Signup />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Profile />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
