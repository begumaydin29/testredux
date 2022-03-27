
import {createSlice} from "@reduxjs/toolkit";

const revisionNoSlice = createSlice({
  name: 'revisionNo',
  initialState: {
    data: "",
  },
  reducers: {
    fetchRevisionNo: (state  = { data:"" }, action) => {
      state.data = action.payload;
    }
  }

  }
);

export const { fetchRevisionNo } = revisionNoSlice.actions;
export default revisionNoSlice.reducer;



