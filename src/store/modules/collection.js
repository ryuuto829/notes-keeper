// @flow
import { createSlice } from "@reduxjs/toolkit";
import { createArrayCopy, removeChild } from "../../utils/document";

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

      // Add new id to selected
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

      // Remove id from selected
      const updatedSelected = removeChild(state.selected, id) || [];

      return {
        ...state,
        selected: updatedSelected,
        selectAll: updatedSelected.length > 0
      };
    },
    addSelectedAll: (state, action) => ({
      ...state,
      selected: state.pages.map(page => page.id),
      selectAll: true
    }),
    removeSelectedAll: (state, action) => ({
      ...state,
      selected: [],
      selectAll: false
    }),
    updateList: (state, action) => {
      const { list } = action.payload;

      return {
        ...state,
        pages: list,
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
  removeSelectedAll,
  updateList
} = collectionSlice.actions;
export default collectionSlice.reducer;
