import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HomeLayOut,
  Register,
  Login,
  DashBoard,
  AllJob,
  AddJob,
  Profile,
  Stats,
  Admin,
  Errors,
  EditJob,
} from "./pages";
import Landing from "./pages/Landing";
import { ErrorMsg } from "./components";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobLoader } from "./pages/AllJob";
import { loader as dashBoardLoader } from "./pages/DashBoard";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as profileAction } from "./pages/Profile";
import { action as deleteAction } from "./pages/DeleteJob";
import { loader as statLoader } from "./pages/Stats";
import { loader as adminLoader } from "./pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    errorElement: <Errors />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashBoard queryClient={queryClient} />,
        loader: dashBoardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AllJob />,
            loader: allJobLoader(queryClient),
            errorElement: <ErrorMsg />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statLoader(queryClient),
            errorElement: <ErrorMsg />,
          },
          {
            path: "addjob",
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "editjob/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: "deletejob/:id",
            action: deleteAction(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
