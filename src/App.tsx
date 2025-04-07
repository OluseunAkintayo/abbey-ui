import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import LoginPage from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
