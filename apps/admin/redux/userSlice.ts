import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: User | null;
  users: User[];
  loading: {
    fetchUsers: boolean;
    fetchUserById: boolean;
    updateUser: boolean;
    deleteUser: boolean;
  };
  success: {
    updateUser: boolean;
    deleteUser: boolean;
  };
  error: {
    fetchUsers: string | null;
    fetchUserById: string | null;
    updateUser: string | null;
    deleteUser: string | null;
  };
}

const initialState: UserState = {
  user: null,
  users: [],
  loading: {
    fetchUsers: false,
    fetchUserById: false,
    updateUser: false,
    deleteUser: false,
  },
  success: {
    updateUser: false,
    deleteUser: false,
  },
  error: {
    fetchUsers: null,
    fetchUserById: null,
    updateUser: null,
    deleteUser: null,
  },
};

// Async thunks for user-related operations
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/get");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user/getById`, { id: userId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user by ID"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/update", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user/delete`, { id: userId });
      return { id: userId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = {
        updateUser: false,
        deleteUser: false,
      };
    },
    resetError: (state) => {
      state.error = {
        fetchUsers: null,
        fetchUserById: null,
        updateUser: null,
        deleteUser: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading.fetchUsers = true;
        state.error.fetchUsers = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<{ users: User[] }>) => {
          state.loading.fetchUsers = false;
          state.users = action.payload.users;
          state.error.fetchUsers = null;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.fetchUsers = false;
        state.error.fetchUsers = action.payload as string;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading.fetchUserById = true;
        state.error.fetchUserById = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.loading.fetchUserById = false;
          state.user = action.payload.user;
          state.error.fetchUserById = null;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading.fetchUserById = false;
        state.error.fetchUserById = action.payload as string;
      });
    
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading.updateUser = true;
        state.success.updateUser = false;
        state.error.updateUser = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.updateUser = false;
        state.success.updateUser = true;
        state.user = action.payload;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error.updateUser = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.updateUser = false;
        state.success.updateUser = false;
        state.error.updateUser = action.payload as string;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading.deleteUser = true;
        state.success.deleteUser = false;
        state.error.deleteUser = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading.deleteUser = false;
          state.success.deleteUser = true;
          state.users = state.users.filter(
            (user) => user.id !== action.payload.id
          );
          if (state.user && state.user.id === action.payload.id) {
            state.user = null;
          }
          state.error.deleteUser = null;
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.deleteUser = false;
        state.success.deleteUser = false;
        state.error.deleteUser = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = userSlice.actions;
export default userSlice.reducer;
