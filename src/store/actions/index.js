import * as actionTypes from './actionTypes';

export const addNewListItem = (text, parentID, isChild, isEdit) => ({
  type: actionTypes.ADD_NEW_LIST_ITEM,
  text,
  parentID,
  isChild,
  isEdit
});

export const deleteListItem = id => ({
  type: actionTypes.DELETE_LIST_ITEM,
  id
});

export const toggleListEditable = isEditable => ({
  type: actionTypes.SET_DOCUMENT_EDITABLE,
  isEditable
});

export const removeListEditable = () => ({
  type: actionTypes.RESET_DOCUMENT_EDITABLE,
});