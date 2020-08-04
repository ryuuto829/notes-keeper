// @flow
export const saveToLocalStorage = (name: string, state: {}) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const loadFromLocalStorage = (name: string): ?{} => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null || serializedState === undefined) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const clearLocalStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.log(error);
  }
};
