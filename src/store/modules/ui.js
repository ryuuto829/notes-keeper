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
    shortcutsById: list,
    shortcuts: listById
  },
  reducers: {
    //
  }
});

export const selectShorcuts = state => state.ui.shortcuts;
export const selectShorcutsById = state => state.ui.shortcutsById;
// export const {
//   //
// } = uiSlice.actions;
export default uiSlice.reducer;
