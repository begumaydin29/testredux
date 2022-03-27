
import {createSlice} from "@reduxjs/toolkit";

const revisionDateSlice = createSlice({
  name: 'revisionDate',
  initialState: {
    data: "",
  },
  reducers: {
    fetchRevisionDate: (state  = { data:"" }, action) => {
      state.data = action.payload;
    }
  }

  }
)

export const { fetchRevisionDate } = revisionDateSlice.actions;
export default revisionDateSlice.reducer;



