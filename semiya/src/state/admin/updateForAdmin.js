import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const updateRequest = createAsyncThunk(
  "SEND_UPDATE_ADMIN_REQUEST",
  (data, thunkAPI) => {
    const { type, id, body } = data;

    return axios.put(`/api/${type}/update/${id}`, body).then((res) => res.data);
  }
);

export const updateRequestReducer = createReducer(
  {},
  {
    [updateRequest.fulfilled]: (state, action) => action.payload,
  }
);
