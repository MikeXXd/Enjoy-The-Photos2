import { Outlet } from "react-router-dom";
import Head from "../components/Head";
import Footer from "../components/Footer";
import useStories from "../components/uStory/store";
import OnStoryView from "../components/OnStoryView";

const Layout = () => {
const {uStories, isUStoryCreating} = useStories()

  return (
    <>
    <div className="main-container">
      <Head />
      <Outlet />
      <Footer />
    </div>
    {isUStoryCreating && (
        <OnStoryView uStory={uStories[0]} />
      )}</>
  );
};

export default Layout;
