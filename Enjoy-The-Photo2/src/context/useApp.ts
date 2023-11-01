import { useContext } from "react";
import { AppContext } from "../App";


function useApp() {
    const value = useContext(AppContext);
    if (!value) {
      throw new Error("useAppContext must be used within a AppContext.Provider");
    }
    return value;
  }

  export default useApp;