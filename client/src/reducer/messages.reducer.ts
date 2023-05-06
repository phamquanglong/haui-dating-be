import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import MessagesApi from "../api/messages.api";

interface State {
  listMessages: any;
  loading: boolean;
  loadingPost: boolean;
  loadingUpdate: boolean;
}

const initState: State = {
  listMessages: [],
  loading: false,
  loadingPost: false,
  loadingUpdate: false,
};

export const callApiGetAllMessagesOfConversation = createAsyncThunk(
  "MESSAGES.GET_ALL",
  async (conversationId: number, thunkApi) => {
    try {
      return await MessagesApi.getAllMessageOfConversation(conversationId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const callApiPostMessage = createAsyncThunk(
  "MESSAGES.POST",
  async (payload: { conversationId: number; message: string }, thunkApi) => {
    try {
      return await MessagesApi.postMessage({
        conversationId: payload.conversationId,
        message: payload.message,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const pushNewMessageAction = createAction<any>("MESSAGE.PUSH_NEW_MESS");

export const messagesReducer = createReducer(initState, (builder) => {
  builder
    .addCase(callApiGetAllMessagesOfConversation.pending, (state) => {
      state.loading = true;
      state.listMessages = [];
    })
    .addCase(
      callApiGetAllMessagesOfConversation.fulfilled,
      (state, { payload }) => {
        state.listMessages = payload?.data || [];
        state.loading = false;
      }
    )
    .addCase(callApiGetAllMessagesOfConversation.rejected, (state) => {
      state.listMessages = [];
      state.loading = false;
    });

  builder.addCase(pushNewMessageAction, (state, { payload }) => {
    state.listMessages = [...state.listMessages, payload];
  });
});
