import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import UserActionsApi from "../api/user-actions.api";
import { IUserActionRequest } from "../interface/user-actions";

interface State {
  targetUsers: any;
  loading: boolean;
}

const initState: State = {
  targetUsers: [],
  loading: false,
};

export const callApiGetHistory = createAsyncThunk(
  "USER_ACTION.LIST",
  async (type: string, thunkApi) => {
    try {
      return await UserActionsApi.getHistory(type);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiCreateAction = createAsyncThunk(
  "USER_ACTION.CREATE",
  async (body: IUserActionRequest, thunkApi) => {
    try {
      return await UserActionsApi.createAction(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const userActionsReducer = createReducer(initState, (builder) => {
  builder
    .addCase(callApiGetHistory.pending, (state) => {
      state.loading = true;
      state.targetUsers = [];
    })
    .addCase(callApiGetHistory.fulfilled, (state, { payload }) => {
      state.targetUsers = payload?.data || [];
      state.loading = false;
    })
    .addCase(callApiGetHistory.rejected, (state) => {
      state.targetUsers = [];
      state.loading = false;
    });
});
