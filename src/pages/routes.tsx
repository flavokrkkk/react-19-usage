import { createBrowserRouter, Navigate } from "react-router-dom";
import RootPage from "./rootPage";
import { lazy } from "react";

const TaskPage = lazy(() => import("./taskPage/"));
const UserPage = lazy(() => import("./userPage/"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/tasks"} replace />,
      },
      {
        path: "/tasks",
        element: <TaskPage />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
    ],
  },
]);
