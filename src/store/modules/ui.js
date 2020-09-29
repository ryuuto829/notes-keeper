import { createSlice } from "@reduxjs/toolkit";

// Generate fake dataset
const list = {};
[...Array(15).keys()].forEach(num => {
  list[`id${num}`] = {
    title: `My ${num} Shortcut Page`,
    url: `/page/id${num}`
  };
});

const listById = [...Array(15).keys()].map(num => `id${num}`);

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    shortcutsById: null,
    shortcuts: [],
    initializing: false,
    document: {
      id: null,
      title: null
    }
  },
  reducers: {
    initializingRequest: (state, action) => {
      console.log("[initializingRequest] ui");
      return {
        ...state,
        initializing: true
      };
    },
    initializingSuccess: (state, action) => {
      const { document } = action.payload;
      console.log("[initializingSuccess] ui");
      return {
        ...state,
        initializing: false,
        document: document
      };
    },
    addShortcut: (state, action) => {
      const { id } = action.payload;
      console.log("[addShortcut] ui");

      // Add new id to selected
      const updatedList = [...state.shortcuts];
      updatedList.push(id);

      const updatedFull = { ...state.shortcutsById };
      updatedFull[id] = { url: "/", title: "asdas" };

      return {
        ...state,
        shortcutsById: updatedFull,
        shortcuts: updatedList
      };
    },
    removeShortcut: (state, action) => {
      const { id } = action.payload;
      console.log("[addShortcut] ui");

      // Remove id from selected
      const updatedList = [...state.shortcuts];
      updatedList.splice(id, 0);

      return {
        ...state,
        shortcuts: updatedList
      };
    },
    updateShortcuts: (state, action) => {
      const { list } = action.payload;
      console.log("[updateShortcuts] ui");

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
