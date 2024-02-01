import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <div className="error-wrap">
      <h1>Oops...</h1>
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
