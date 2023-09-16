import React from "react";
import App from "../App";
import { Error } from "../Error";
import { createBrowserRouter } from "react-router-dom";
import { TodoBody } from "../components/todoBody";
import { LoginWindow } from "../login/loginWindow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/items/:itemId",
        element: <TodoBody />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginWindow />,
    errorElement: <Error />,
  },
]);
