import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Router } from "@tanstack/router";
import router from "./Routes/rootRoute.jsx";
import { RouterProvider } from "@tanstack/react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
