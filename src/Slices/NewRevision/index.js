import { createSlice } from '@reduxjs/toolkit';

const newRevisionSlice = createSlice({
  name: 'newRevision',
  initialState: {
    dataList: [],
    status: 'idle',
  },
  reducers: {
    postSaveNewRevision: (state, action) => {
      state.dataList = action.payload;
      state.status = 'success';
    },
  },
});

export const { postSaveNewRevision } = newRevisionSlice.actions;
export default newRevisionSlice.reducer;
