import {
  DOCUMENT_ADD_TO_SHORTCUT
} from '../actions/actionTypes';

export const documentAddToShortcut = documentID => ({
  type: DOCUMENT_ADD_TO_SHORTCUT,
  documentID
});
