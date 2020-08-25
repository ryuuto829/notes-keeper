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
  shift: 0 | 1,
  list: ?Array<string>,
  start: string,
  id: string
): ?Array<string> => {
  const updatedArray = createArrayCopy(list);

  if (!updatedArray) return [id];

  updatedArray.splice(updatedArray.indexOf(start) + shift, 0, id);
  return updatedArray;
};

export const addChildAfter = (...params: any) => addChild(1, ...params);

export const addChildBefore = (...params: any) => addChild(0, ...params);

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

// Find id of the last children of the given id
export const getLastNode = (
  state: { collection: { ... } },
  id: string
): string => {
  const children = state.collection[id].children;

  if (children === null) return id;

  const index = children.length - 1;
  return getLastNode(state, children[index]);
};

// Change parent id of items in given list
export const changeParent = (
  state: { collection: { ... } },
  list: Array<string>,
  parentId: string
) => {
  if (!list) return null;

  const updatedChildren = {};

  list.forEach(id => {
    updatedChildren[id] = {
      ...state.collection[id],
      parent: parentId
    };
  });

  return updatedChildren;
};

// Remove item by id from collection
export const removeFromCollection = (
  state: { collection: { ... } },
  currentId: string
) => {
  const updatedKeys = Object.keys(state.collection).filter(
    itemId => itemId !== currentId
  );

  const updatedState = {};
  updatedKeys.forEach(id => {
    updatedState[id] = state.collection[id];
  });
  return updatedState;
};
