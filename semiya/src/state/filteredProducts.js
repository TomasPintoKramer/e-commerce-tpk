import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const filteredProductRequest = createAsyncThunk(
  "SEND_FILTEREDPRODUCTS_REQUEST",
  (data, thunkAPI) => {
    const { wayToFilter } = thunkAPI.getState();

    const { value, type } = wayToFilter;
    return axios.get(`/api/products?${type}=${value}`).then((res) => res.data);
  }
);

export const filteredProductReducer = createReducer([], {
  [filteredProductRequest.fulfilled]: (state, action) => action.payload,
});
