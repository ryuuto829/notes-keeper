import { createSlice } from '@reduxjs/toolkit';
import { DATA } from '../_test_database'; // DELETE LATER

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: DATA,
  reducers: {}
});

export const selectAllDocuments = state => state.collection;
export default collectionSlice.reducer;
