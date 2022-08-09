import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const addRequest = createAsyncThunk(
  "SEND_ADD_ADMIN_REQUEST",
  (data, thunkAPI) => {
    const { type, body } = data;
    return axios.post(`/api/${type}`, body).then((res) => res.data);
  }
);

export const addRequestReducer = createReducer(
  {},
  {
    [addRequest.fulfilled]: (state, action) => action.payload,
  }
);
