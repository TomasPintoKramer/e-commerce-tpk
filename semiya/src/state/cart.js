const { createAction, createReducer, createAsyncThunk } = require("@reduxjs/toolkit");


export const addToCart = createAction("ADD_TO_CART");
export const deleteFromCart = createAction("DELETE_TO_CART");
export const updateFromStorage = createAsyncThunk("UPDATE_FROM_STORAGE", () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
});
export const clearCart = createAction("CLEAR_TO_CART");

export const cartReducer = createReducer([], {
  [updateFromStorage.fulfilled]: (state, action) => action.payload,
  [addToCart]: (state, action) => [...state, action.payload],
  [deleteFromCart]: (state, action) => state.filter(item => item.id !== action.payload.id),
  [clearCart]: (state, action) => [],
});