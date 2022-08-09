import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const singleProductRequest = createAsyncThunk(
  "SEND_SINGLEPRODUCT_REQUEST",
  (id_any_filter) => {
    return axios.get(`/api/products/${id_any_filter}`).then((res) => res.data);
  }
);

export const singleProductReducer = createReducer(
  {},
  {
    [singleProductRequest.fulfilled]: (state, action) => action.payload,
  }
);
