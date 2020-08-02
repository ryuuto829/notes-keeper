import { createSlice } from '@reduxjs/toolkit';
import { DATA } from '../_test_database'; // DELETE LATER

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
    data: DATA.documentsMeta.id3,
    shortcuts: DATA.shortcutsById,
  },
  reducers: {
    updateShortcut: (state, action) => {
      const { id } = action.payload;
      const updatedState = state.shortcuts;
      const index = updatedState.indexOf(id);

      if (id === '') return state;

      if (state.shortcuts.includes(id)) {
        updatedState.splice(index, 0);
      } else {
        updatedState.push(id);
      }

      return {
        ...state,
        shortcuted: !state.shortcuted,
        shortcuts: updatedState
      };
    },
  }
});

export const selectShortcuts = state => state.document.shortcuts;
export const selectShorcuted = state => state.document.shortcuted;
export const selectDocumentById = state => state.document.allDocuments;
export const { updateShortcut } = documentSlice.actions;
export default documentSlice.reducer;
