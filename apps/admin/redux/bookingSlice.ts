import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export enum Status {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: Status;
  // Add other booking properties here
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  loading: {
    fetchBookings: boolean;
    createBooking: boolean;
    updateBooking: boolean;
    deleteBooking: boolean;
  };
  success: {
    createBooking: boolean;
    updateBooking: boolean;
    deleteBooking: boolean;
  };
  error: {
    fetchBookings: string | null;
    createBooking: string | null;
    updateBooking: string | null;
    deleteBooking: string | null;
  };
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: {
    fetchBookings: false,
    createBooking: false,
    updateBooking: false,
    deleteBooking: false,
  },
  success: {
    createBooking: false,
    updateBooking: false,
    deleteBooking: false,
  },
  error: {
    fetchBookings: null,
    createBooking: null,
    updateBooking: null,
    deleteBooking: null,
  },
};

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/booking/get");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch bookings"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData: Omit<Booking, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/booking/add", bookingData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create booking"
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/update",
  async (
    bookingData: Partial<Booking> & { id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/booking/update", bookingData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update booking"
      );
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/booking/delete", {
        id: bookingId,
      });
      return { id: bookingId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete booking"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = {
        createBooking: false,
        updateBooking: false,
        deleteBooking: false,
      };
    },
    resetError: (state) => {
      state.error = {
        fetchBookings: null,
        createBooking: null,
        updateBooking: null,
        deleteBooking: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading.fetchBookings = true;
        state.error.fetchBookings = null;
      })
      .addCase(
        fetchBookings.fulfilled,
        (state, action: PayloadAction<{ bookings: Booking[] }>) => {
          state.loading.fetchBookings = false;
          state.bookings = action.payload.bookings;
          state.error.fetchBookings = null;
        }
      )
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading.fetchBookings = false;
        state.error.fetchBookings = action.payload as string;
      });

    builder
      .addCase(createBooking.pending, (state) => {
        state.loading.createBooking = true;
        state.success.createBooking = false;
        state.error.createBooking = null;
      })
      .addCase(
        createBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.loading.createBooking = false;
          state.success.createBooking = true;
          state.bookings.push(action.payload);
          state.error.createBooking = null;
        }
      )
      .addCase(createBooking.rejected, (state, action) => {
        state.loading.createBooking = false;
        state.success.createBooking = false;
        state.error.createBooking = action.payload as string;
      });

    builder
      .addCase(updateBooking.pending, (state) => {
        state.loading.updateBooking = true;
        state.success.updateBooking = false;
        state.error.updateBooking = null;
      })
      .addCase(
        updateBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.loading.updateBooking = false;
          state.success.updateBooking = true;
          const index = state.bookings.findIndex(
            (b) => b.id === action.payload.id
          );
          if (index !== -1) {
            state.bookings[index] = {
              ...state.bookings[index],
              ...action.payload,
            };
          }
          if (
            state.currentBooking &&
            state.currentBooking.id === action.payload.id
          ) {
            state.currentBooking = {
              ...state.currentBooking,
              ...action.payload,
            };
          }
          state.error.updateBooking = null;
        }
      )
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading.updateBooking = false;
        state.success.updateBooking = false;
        state.error.updateBooking = action.payload as string;
      });

    builder
      .addCase(deleteBooking.pending, (state) => {
        state.loading.deleteBooking = true;
        state.success.deleteBooking = false;
        state.error.deleteBooking = null;
      })
      .addCase(
        deleteBooking.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading.deleteBooking = false;
          state.success.deleteBooking = true;
          state.bookings = state.bookings.filter(
            (booking) => booking.id !== action.payload.id
          );
          if (
            state.currentBooking &&
            state.currentBooking.id === action.payload.id
          ) {
            state.currentBooking = null;
          }
          state.error.deleteBooking = null;
        }
      )
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading.deleteBooking = false;
        state.success.deleteBooking = false;
        state.error.deleteBooking = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = bookingSlice.actions;
export default bookingSlice.reducer;
