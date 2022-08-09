import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteRequest = createAsyncThunk(
  "SEND_DELETE_ADMIN_REQUEST",
  (data, thunkAPI) => {
    const { type, id } = data;
    return axios.delete(`/api/${type}/delete/${id}`).then((res) => res.data);
  }
);

export const deleteRequestReducer = createReducer(
  {},
  {
    [deleteRequest.fulfilled]: (state, action) => action.payload,
  }
);
