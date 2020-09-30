import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    shortcuts: [],
    initializing: false,
    document: {
      id: null,
      title: null
    }
  },
  reducers: {
    initializingRequest: (state, action) => {
      return {
        ...state,
        initializing: true
      };
    },
    initializingSuccess: (state, action) => {
      const { document } = action.payload;

      return {
        ...state,
        initializing: false,
        document: document
      };
    },
    addShortcut: (state, action) => {
      const { id, url, title } = action.payload;

      // Add id to selected
      const updatedList = [...state.shortcuts];
      updatedList.push({ id: id, url: url, title: title });

      return {
        ...state,
        shortcuts: updatedList
      };
    },
    removeShortcut: (state, action) => {
      const { id } = action.payload;

      // Remove id from selected
      const updatedList = [...state.shortcuts];
      updatedList.splice(updatedList.indexOf(id), 1);

      return {
        ...state,
        shortcuts: updatedList
      };
    },
    updateShortcuts: (state, action) => {
      const { list } = action.payload;

      return {
        ...state,
        shortcuts: list
      };
    }
  }
});

export const selectShorcuts = state => state.ui.shortcuts;
export const selectShorcutsById = state => state.ui.shortcutsById;
export const selectInitializing = state => state.ui.initializing;
export const selectDocument = state => state.ui.document;
export const selectDocumentTitle = state => state.ui.document.title;
export const {
  initializingRequest,
  initializingSuccess,
  addShortcut,
  removeShortcut,
  updateShortcuts
} = uiSlice.actions;
export default uiSlice.reducer;
