import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  error: null,
  loading: false,
  message: "",
};

export const logIn = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://mohammadrezagh80.pythonanywhere.com/api/accounts/login/",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://mohammadrezagh80.pythonanywhere.com/api/accounts/register/",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.access)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(action.payload.refresh)
        );
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
