import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the state interface for the slice
interface PropertyState {
  property: Property | null;
  properties: Property[] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial state
const initialState: PropertyState = {
  property: null,
  properties: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async () => {
    const response = await axios.post("/api/property/get");
    return response.data;
  }
);

export const createProperty = createAsyncThunk(
  "property/create",
  async (propertyData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/property/add", propertyData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create property"
      );
    }
  }
);

export const updateProperty = createAsyncThunk(
  "property/update",
  async (propertyData: Property, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/property/update", propertyData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update property"
      );
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/property/delete", {
        id: propertyId,
      });
      return { id: propertyId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete property"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    resetState: (state) => {
      state.property = null;
      state.properties = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        createProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading = false;
          state.success = true;
          state.property = action.payload;
          if (state.properties) {
            state.properties.push(action.payload);
          } else {
            state.properties = [action.payload];
          }
          state.error = null;
        }
      )
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        updateProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading = false;
          state.success = true;
          state.property = action.payload;
          if (state.properties) {
            const index = state.properties.findIndex(
              (p) => p.id === action.payload.id
            );
            if (index !== -1) {
              state.properties[index] = action.payload;
            }
          }
          state.error = null;
        }
      )
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        deleteProperty.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          if (state.properties) {
            state.properties = state.properties.filter(
              (property) => property.id !== action.payload.id
            );
          }
        }
      )
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = propertySlice.actions;
export default propertySlice.reducer;
