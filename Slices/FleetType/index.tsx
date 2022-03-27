import {createAxios, getEnvironmentConfig} from "@tt/ttms-react-core";
import * as config from "../../config";
import {createSlice} from "@reduxjs/toolkit";

const envConfig = getEnvironmentConfig(config);
const http = createAxios({ baseURL: envConfig.api.baseUrl });


export const fetchDataAction = () => {
  return {
    type: 'FETCH_DATA',

  };
}

const fleetTypeSlice = createSlice({
    name: 'fleetType',
    initialState: {
      dataList: []
    },
    reducers: {
      fetchData: (state, action) => {
        state.dataList = action.payload;
      }
    }

  }
)

export const { fetchData } = fleetTypeSlice.actions;
export default fleetTypeSlice.reducer;



