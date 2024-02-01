import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <div className="information-wrap">
        <h2>Oops...</h2>
        <p>
          {children}</p>
    </div>
  );
};

export default ErrorMessage;
