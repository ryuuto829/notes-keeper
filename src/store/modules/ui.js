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
    shortcuts: null,
    initializing: false,
    document: null
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
    }
    //
  }
});

export const selectShorcuts = state => state.ui.shortcuts;
export const selectShorcutsById = state => state.ui.shortcutsById;
export const selectInitializing = state => state.ui.initializing;
export const selectDocument = state => state.ui.document;
export const { initializingRequest, initializingSuccess } = uiSlice.actions;
export default uiSlice.reducer;
