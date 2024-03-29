import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const filteredCategoryRequest = createAsyncThunk(
  "SEND_FILTEREDCATEGORY_REQUEST",
  (data, thunkAPI) => {
    const { wayToFilter } = thunkAPI.getState();

    const { value } = wayToFilter;
    return axios.get(`/api/categories/${value}`).then((res) => res.data);
  }
);

export const filteredCategoryReducer = createReducer([], {
  [filteredCategoryRequest.fulfilled]: (state, action) => action.payload,
});
