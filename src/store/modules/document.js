// @flow
import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv4 } from "uuid";

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    documentId: "id1",
    editable: null,
    title: "Current approaches to knowledge management",
    isShortcuted: false,
    createdAt: "",
    updatedAt: "",
    archivedAt: "",
    children: ["id2", "id3"],
    collection: {
      id2: {
        content:
          "- Many technologies for organizing knowledge outside of the brain have arisen in response to these limitations. Physical books and journals proliferated after the invention of the Gutenberg Press, and have since been partially supplanted by word processors, websites, blogs, forums, wikis, and software applications.",
        children: ["id4", "id5"]
      },
      id3: {
        content:
          "- While we are presented with a plethora of choices for organizing knowledge, almost every technology follows the same basic ‘file cabinet’ format.",
        children: null
      },
      id4: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: null
      },
      id5: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: ["id6"]
      },
      id6: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: null
      }
    }
  },
  reducers: {
    addItem: (state, action) => {
      // const { id, parentId, hasChildren } = action.payload;

      return {
        ...state
      };
    },
    setEditable: (state, action) => {
      const { id } = action.payload;

      return {
        ...state,
        editable: id
      };
    }
  }
});

export const selectDocumentTitle = state => state.document.title;
export const selectDocumentChildren = state => state.document.children;
export const selectDocumentCollection = state => state.document.collection;
export const selectDocumentEditable = state => state.document.editable;

export const {
  updateContent,
  addItem,
  setEditable,
  updateTitle,
  addChild
} = documentSlice.actions;
export default documentSlice.reducer;
