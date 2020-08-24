// @flow
/**
 * UTILS FUNCTIONS FOR DOCUMENT REDUCER
 */

// Create the copy of given array
export const createArrayCopy = (list: ?Array<string>): ?Array<string> => {
  if (list) return [...list];
  return null;
};

// Add given id to the array of id's before | after the certain start id
const addChild = (
  list: ?Array<string>,
  start: string,
  id: string,
  shift: 0 | 1 = 1
): ?Array<string> => {
  const updatedArray = createArrayCopy(list);

  if (!updatedArray) return [id];

  updatedArray.splice(updatedArray.indexOf(start) + shift, 0, id);
  return updatedArray;
};

export const addChildAfter = (...params) => addChild(...params, 1);

export const addChildBefore = (...params) => addChild(...params, 0);

// Remove certain id from the array of id's
export const removeChild = (
  list: ?Array<string>,
  id: string
): ?Array<string> => {
  const updatedArray = createArrayCopy(list);

  if (!updatedArray) return null;

  updatedArray.splice(updatedArray.indexOf(id), 1);

  if (updatedArray.length === 0) return null;
  return updatedArray;
};
