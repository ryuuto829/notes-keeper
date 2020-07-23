export const saveToLocalStorage = (name, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const loadFromLocalStorage = name => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const clearLocalStorage = name => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    return undefined;
  }
};
