import * as actionTypes from './actionTypes';

export const addNewListItem = (text, parentID, isChild) => ({
  type: actionTypes.ADD_NEW_LIST_ITEM,
  text,
  parentID,
  isChild
});