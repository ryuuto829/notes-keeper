import * as actionTypes from './actionTypes';

export const addNewListItem = (text, parentID, isChild, isEdit) => ({
  type: actionTypes.ADD_NEW_LIST_ITEM,
  text,
  parentID,
  isChild,
  isEdit
});

export const toggleListEditable = isEditable => ({
  type: actionTypes.SET_DOCUMENT_EDITABLE,
  isEditable
});