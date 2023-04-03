import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import UserApi from "../api/user.api";
import { ApiServiceSetAuthToken } from "../config/axiosConfig";

interface State {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  accessToken: string;
}

const initState: State = {
  user: null,
  isAuthenticated: localStorage.getItem("isLogin") ? true : false,
  loading: false,
  accessToken: (localStorage.getItem("accessToken") as string) || "",
};

export const callApiGetInfo = createAsyncThunk(
  "AUTH.GET_INFO",
  async (_, thunkApi) => {
    try {
      return await UserApi.getInfo();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiRegister = createAsyncThunk(
  "AUTH.REGISTER",
  async (
    body: { userName: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      return await UserApi.register(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiLogin = createAsyncThunk(
  "AUTH.LOGIN",
  async (body: { userName: string; password: string }, thunkApi) => {
    try {
      return await UserApi.login(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutAction = createAction("AUTH.ACTION_LOGOUT");

export const authReducer = createReducer(initState, (builder) => {
  builder.addCase(logoutAction, (state) => {
    state.isAuthenticated = false;
    state.user = null;
    state.accessToken = "";
    ApiServiceSetAuthToken(undefined);
  });

  builder
    .addCase(callApiGetInfo.pending, (state) => {
      state.loading = true;
    })
    .addCase(callApiGetInfo.fulfilled, (state, { payload }) => {
      state.user = payload?.data || null;
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(callApiGetInfo.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    });

  builder
    .addCase(callApiRegister.pending, (state) => {
      state.loading = true;
    })
    .addCase(callApiRegister.fulfilled, (state, { payload }) => {
      ApiServiceSetAuthToken(payload.data.accessToken);
      state.accessToken = payload.data.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(callApiRegister.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    });

  builder
    .addCase(callApiLogin.pending, (state) => {
      state.loading = true;
    })
    .addCase(callApiLogin.fulfilled, (state, { payload }) => {
      ApiServiceSetAuthToken(payload.data.accessToken);
      state.accessToken = payload.data.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(callApiLogin.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    });
});
