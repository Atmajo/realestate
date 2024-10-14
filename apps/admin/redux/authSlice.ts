import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Initial state
const initialState: AuthState = {
  user: null,
  token: Cookies.get("auth-token") || null, // Persist the token
  loading: false,
  error: null,
};

// Async thunk for sign-in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: SignInProps, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/sign-in", credentials);
      Cookies.set("auth-token", response.data.token, { path: "/" });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

// Async thunk for sign-up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpProps, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/sign-up", userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
      state.error = null;
      Cookies.remove("auth-token"); // Remove token from cookies on logout
    },
  },
  extraReducers: (builder) => {
    // Handle sign-in
    builder
      .addCase(signIn.pending, (state: AuthState) => {
        state.loading = true; // Loading state
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false; // Fulfilled state
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase(
        signIn.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false; // Failed state
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Sign-in failed";
        }
      );

    // Handle sign-up
    builder
      .addCase(signUp.pending, (state: AuthState) => {
        state.loading = true; // Loading state
        state.error = null;
      })
      .addCase(
        signUp.fulfilled,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false; // Fulfilled state
          state.user = action.payload.user;
          state.token = null;
          state.error = null;
        }
      )
      .addCase(
        signUp.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false; // Failed state
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Sign-up failed";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
