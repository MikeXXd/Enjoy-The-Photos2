function getLocalStorage<T>(key: string, defaultValue: T): T {
    let currentValue: T;
  
    try {
      const storedValue = localStorage.getItem(key);
      currentValue = storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }
  
    return currentValue;
  }

  export default getLocalStorage;