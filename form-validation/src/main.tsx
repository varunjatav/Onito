// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Personal from "./components/Personal.tsx";
import Address from "./components/Address.tsx";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Personal />,
      },
      {
        path: "/address",
        element: <Address />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
