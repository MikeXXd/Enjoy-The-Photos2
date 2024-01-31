import React from "react";
import ReactDOM from "react-dom/client";
import { PhotosProvider } from "./context/Photos.tsx";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PhotosProvider>
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>
  </PhotosProvider>
);
