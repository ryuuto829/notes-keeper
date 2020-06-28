import {
  ADD_LIST_ITEM,
  EDIT_LIST_ITEM,
  DELETE_LIST_ITEM,
  SET_DOCUMENT_EDITABLE,
  RESET_DOCUMENT_EDITABLE
} from '../actions/actionTypes';

export const addListItem = (text, parentID, isChild) => ({
  type: ADD_LIST_ITEM,
  text,
  parentID,
  isChild
});

export const editListItem = (text, parentID) => ({
  type: EDIT_LIST_ITEM,
  text,
  parentID
});

export const deleteListItem = id => ({
  type: DELETE_LIST_ITEM,
  id
});

export const toggleListEditable = id => ({
  type: SET_DOCUMENT_EDITABLE,
  id
});

export const removeListEditable = () => ({
  type: RESET_DOCUMENT_EDITABLE,
});