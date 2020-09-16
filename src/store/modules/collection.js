// @flow
import { createSlice } from "@reduxjs/toolkit";
import { COLLECTION_DATA } from "./_test_database"; // DELETE LATER
import { createArrayCopy, removeChild } from "../../utils/document";
// import type { DocumentStore } from "../../types/DocumentStore";

// type State = {
//   document: DocumentStore
// };

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    pages: null,
    selected: [],
    selectAll: false
  },
  reducers: {
    addSelection: (state, action) => {
      const { id } = action.payload;

      // Add new item
      const updatedSelected = createArrayCopy(state.selected);
      updatedSelected.push(id);

      return {
        ...state,
        selected: updatedSelected,
        selectAll: updatedSelected.length > 0
      };
    },
    removeSelection: (state, action) => {
      const { id } = action.payload;

      // Remove item
      const updatedSelected = removeChild(state.selected, id) || [];

      return {
        ...state,
        selected: updatedSelected,
        selectAll: updatedSelected.length > 0
      };
    },
    addSelectedAll: (state, action) => {
      return {
        ...state,
        selected: Object.keys(state.pages),
        selectAll: true
      };
    },
    removeSelectedAll: (state, action) => {
      return {
        ...state,
        selected: [],
        selectAll: false
      };
    }
  }
});

export const selectPages = state => state.collection.pages;
export const selectSelectedPages = state => state.collection.selected;
export const selectSelectAll = state => state.collection.selectAll;

export const {
  addSelection,
  removeSelection,
  addSelectedAll,
  removeSelectedAll
} = collectionSlice.actions;
export default collectionSlice.reducer;
