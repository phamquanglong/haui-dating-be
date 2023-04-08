import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import HobbyApi from "../api/hobby.api";

interface State {
  hobbies: any;
  loading: boolean;
}

const initState: State = {
  hobbies: [],
  loading: false,
};

export const callApiGetAllHobby = createAsyncThunk(
  "HOBBY.LIST",
  async (_, thunkApi) => {
    try {
      return await HobbyApi.getAllHobbies();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const hobbyReducer = createReducer(initState, (builder) => {
  builder
    .addCase(callApiGetAllHobby.pending, (state) => {
      state.loading = true;
    })
    .addCase(callApiGetAllHobby.fulfilled, (state, { payload }) => {
      state.hobbies = payload?.data || [];
      state.loading = false;
    })
    .addCase(callApiGetAllHobby.rejected, (state) => {
      state.hobbies = [];
      state.loading = false;
    });
});
