import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getLocalStorage from "../services/getLocalStorage";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {

  const [value, setValue] = useState<T>(() => getLocalStorage<T>(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;




