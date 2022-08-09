import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const defaultCategoriesRequest = createAsyncThunk(
  "SEND_ALLCATEGORIES_REQUEST",
  () => {
    return axios.get("/api/categories").then((res) => res.data);
  }
);

export const defaultCategoriesReducer = createReducer([], {
  [defaultCategoriesRequest.fulfilled]: (state, action) => action.payload,
});
