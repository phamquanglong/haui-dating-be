import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import ConversationApi from "../api/conversation.api";

interface State {
  listConversations: any;
  loading: boolean;
}

const initState: State = {
  listConversations: [],
  loading: false,
};

export const callApiGetAllConversations = createAsyncThunk(
  "CONVERSATIONS.LIST",
  async (_, thunkApi) => {
    try {
      return await ConversationApi.getAllConversation();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const conversationsReducer = createReducer(initState, (builder) => {
  builder
    .addCase(callApiGetAllConversations.pending, (state) => {
      state.loading = true;
    })
    .addCase(callApiGetAllConversations.fulfilled, (state, { payload }) => {
      state.listConversations = payload?.data || [];
      state.loading = false;
    })
    .addCase(callApiGetAllConversations.rejected, (state) => {
      state.listConversations = [];
      state.loading = false;
    });
});
