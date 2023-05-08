import { createAction, createReducer } from "@reduxjs/toolkit";
import { EXPLORE } from "../config/constant";

interface State {
  component: string;
}

const initState: State = {
  component: EXPLORE,
};

export const actionSetComponent = createAction<string>("LAYOUT.SET_COMP");

export const layoutReducer = createReducer(initState, (builder) => {
  builder.addCase(actionSetComponent, (state, { payload }) => {
    state.component = payload;
  });
});
