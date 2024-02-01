import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Head from "../components/Head";
import Footer from "../components/Footer";

const ErrorPage = () => {
    const error = useRouteError();

  return (
      <>
    <div className="main-container">
      <Head />
      <div className="error-wrap">
        <h1>Oops...</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "Invalid page"
            : "Something went wrong"}
        </p>
    </div>
      <Footer />
    </div>
      
    </>
  );
};

export default ErrorPage;

