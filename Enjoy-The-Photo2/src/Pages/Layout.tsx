import { Outlet } from "react-router-dom";
import Head from "../components/Head";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="main-container">
      <Head />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
