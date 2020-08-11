import { createSlice } from "@reduxjs/toolkit";

export const DATA = {
  documentsMeta: {
    id1: {
      id: "id1",
      title: "My First Page",
      url: "/page/id1",
      shortcuted: true,
      text: "This is content for FIRST PAGE"
    },
    id2: {
      id: "id2",
      title: "My Second Page",
      url: "/page/id2",
      shortcuted: true,
      text: "This is content for SECOND PAGE"
    },
    id3: {
      id: "id3",
      title: "My Third Page",
      url: "/page/id3",
      shortcuted: false,
      text: "This is content for THIRD PAGE"
    }
  },
  shortcutsById: ["id1", "id2"]
};

export const collectionSlice = createSlice({
  name: "_test_database",
  initialState: DATA,
  reducers: {}
});

export default collectionSlice.reducer;