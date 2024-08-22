import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  course: [],
};

export const getCourse = createAsyncThunk(
  "course/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://mohammadrezagh80.pythonanywhere.com/api/course-list/?page=1&limit=5",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://mohammadrezagh80.pythonanywhere.com/api/accounts/refresh/",
            {
              refresh: JSON.parse(localStorage.getItem("refreshToken")),
            }
          );
          localStorage.setItem(
            "accessToken",
            JSON.stringify(refreshRes.data.access)
          );
        } catch (error) {
          console.log(error);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.results;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
