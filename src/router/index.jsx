import { createBrowserRouter } from "react-router-dom";
import CoursePage from "../pages/CoursePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CoursePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;
