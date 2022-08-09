import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const myPurchasesRequest = createAsyncThunk(
  "SEND_MY_PURCHASES_REQUEST",
  (data, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const { id } = user;
    return axios.get(`/api/purchases/${id}`).then((res) => res.data);
  }
);

export const myPurchasesReducer = createReducer([], {
  [myPurchasesRequest.fulfilled]: (state, action) => action.payload,
});
