import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";

export const virtualCart = createAsyncThunk(
  "SET_VIRTUAL_CART",
  (data, thunkAPI) => {
    const thunk = thunkAPI.getState();

    return (
      thunk.cart &&
      thunk.cart.filter((item, i) => thunk.cart.indexOf(item) === i)
    );
  }
);

export const clearVirtualCart = createAction("CLEAR_VIRTUAL_CART");

export const virtualCartReducer = createReducer([], {
  [virtualCart.fulfilled]: (state, action) => action.payload,
  [clearVirtualCart]: (state, action) => [],
});
