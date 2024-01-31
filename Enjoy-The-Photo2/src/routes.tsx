import { createBrowserRouter } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import GalleryPage from "./Pages/GalleryPage";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import SettingPage from "./Pages/SettingPage";
import YouStoryPage from "./components/uStory/YouStory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "youstory", element: <YouStoryPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "setting", element: <SettingPage /> },
    ],
  },
]);

export default router;
