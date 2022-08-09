import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const defaultProductRequest = createAsyncThunk(
  "SEND_ALLPRODUCTS_REQUEST",
  (data, thunkAPI) => {
    return axios.get("/api/products").then((res) => res.data);
  }
);

export const defaultProductReducer = createReducer([], {
  [defaultProductRequest.fulfilled]: (state, action) => action.payload,
});
