import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import UserApi from "../api/user.api";
import {
  IUpdateUserInformationRequest,
  IUserInformationRequest,
} from "../interface/User";

interface State {
  loadingUpload: boolean;
  imageUrl: any;
  loadingPost: boolean;
  loadingUpdate: boolean;
}

const initState: State = {
  loadingUpload: false,
  imageUrl: {},
  loadingPost: false,
  loadingUpdate: false,
};

export const callApiPostUserInformation = createAsyncThunk(
  "USER.POST_USER_INFORMATION",
  async (body: IUserInformationRequest, thunkApi) => {
    try {
      return await UserApi.postUserInformation(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiUpdateUserInformation = createAsyncThunk(
  "USER.UPDATE_USER_INFORMATION",
  async (body: IUpdateUserInformationRequest, thunkApi) => {
    try {
      return await UserApi.updateUserInformation(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiUploadImage = createAsyncThunk(
  "USER.UPLOAD_IMAGE",
  async (payload: { file: any }, thunkApi) => {
    try {
      return await UserApi.uploadImage(payload.file);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const userReducer = createReducer(initState, (builder) => {
  builder
    .addCase(callApiUploadImage.pending, (state) => {
      state.loadingUpload = true;
      state.imageUrl = {};
    })
    .addCase(callApiUploadImage.fulfilled, (state, { payload }) => {
      state.imageUrl = payload?.data || {};
      state.loadingUpload = false;
    })
    .addCase(callApiUploadImage.rejected, (state) => {
      state.imageUrl = {};
      state.loadingUpload = false;
    });

  builder
    .addCase(callApiPostUserInformation.pending, (state) => {
      state.loadingPost = true;
    })
    .addCase(callApiPostUserInformation.fulfilled, (state, { payload }) => {
      state.loadingPost = false;
    })
    .addCase(callApiPostUserInformation.rejected, (state) => {
      state.loadingPost = false;
    });

  builder
    .addCase(callApiUpdateUserInformation.pending, (state) => {
      state.loadingUpdate = true;
    })
    .addCase(callApiUpdateUserInformation.fulfilled, (state, { payload }) => {
      state.loadingUpdate = false;
    })
    .addCase(callApiUpdateUserInformation.rejected, (state) => {
      state.loadingUpdate = false;
    });
});
