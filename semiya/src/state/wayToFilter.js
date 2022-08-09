import { createAction, createReducer } from "@reduxjs/toolkit";

export const setWayToFilter = createAction("SET_WAY_TO_FILTER");

export const setWayToFilterReducer = createReducer(
  {},
  {
    [setWayToFilter]: (state, action) => action.payload,
  }
);
