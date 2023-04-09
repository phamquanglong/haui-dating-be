import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import UserApi from "../api/user.api";
import { IUserInformationRequest } from "../interface/User";

interface State {
  loadingUpload: boolean;
  imageUrl: any;
  loadingPost: boolean;
}

const initState: State = {
  loadingUpload: false,
  imageUrl: {},
  loadingPost: false,
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
});
