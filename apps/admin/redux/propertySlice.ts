import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PropertyState {
  property: Property | null;
  properties: Property[];
  loading: {
    fetchProperties: boolean;
    fetchProperty: boolean;
    createProperty: boolean;
    updateProperty: boolean;
    deleteProperty: boolean;
  };
  success: {
    createProperty: boolean;
    updateProperty: boolean;
    deleteProperty: boolean;
  };
  error: {
    fetchProperties: string | null;
    fetchProperty: string | null;
    createProperty: string | null;
    updateProperty: string | null;
    deleteProperty: string | null;
  };
}

const initialState: PropertyState = {
  property: null,
  properties: [],
  loading: {
    fetchProperties: false,
    fetchProperty: false,
    createProperty: false,
    updateProperty: false,
    deleteProperty: false,
  },
  success: {
    createProperty: false,
    updateProperty: false,
    deleteProperty: false,
  },
  error: {
    fetchProperties: null,
    fetchProperty: null,
    createProperty: null,
    updateProperty: null,
    deleteProperty: null,
  },
};

export const createProperty = createAsyncThunk(
  "property/create",
  async (propertyData: Omit<Property, "id">, { rejectWithValue }) => {
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

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/property/get");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch properties"
      );
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  "property/fetchById",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/property/getById", {
        id: propertyId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch property"
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
    resetSuccess: (state) => {
      state.success = {
        createProperty: false,
        updateProperty: false,
        deleteProperty: false,
      };
    },
    resetError: (state) => {
      state.error = {
        fetchProperties: null,
        fetchProperty: null,
        createProperty: null,
        updateProperty: null,
        deleteProperty: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading.createProperty = true;
        state.success.createProperty = false;
        state.error.createProperty = null;
      })
      .addCase(
        createProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading.createProperty = false;
          state.success.createProperty = true;
          state.properties.push(action.payload);
          state.error.createProperty = null;
        }
      )
      .addCase(createProperty.rejected, (state, action) => {
        state.loading.createProperty = false;
        state.success.createProperty = false;
        state.error.createProperty = action.payload as string;
      });

    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading.fetchProperties = true;
        state.error.fetchProperties = null;
      })
      .addCase(
        fetchProperties.fulfilled,
        (state, action: PayloadAction<{ properties: Property[] }>) => {
          state.loading.fetchProperties = false;
          state.properties = action.payload.properties;
        }
      )
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading.fetchProperties = false;
        state.error.fetchProperties = action.payload as string;
      });

    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading.fetchProperty = true;
        state.error.fetchProperty = null;
      })
      .addCase(
        fetchPropertyById.fulfilled,
        (state, action: PayloadAction<{ property: Property }>) => {
          state.loading.fetchProperty = false;
          state.property = action.payload.property;
          state.error.fetchProperty = null;
        }
      )
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading.fetchProperty = false;
        state.error.fetchProperty = action.payload as string;
      });

    builder
      .addCase(updateProperty.pending, (state) => {
        state.loading.updateProperty = true;
        state.success.updateProperty = false;
        state.error.updateProperty = null;
      })
      .addCase(
        updateProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading.updateProperty = false;
          state.success.updateProperty = true;
          state.property = action.payload;
          const index = state.properties.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.properties[index] = action.payload;
          }
          state.error.updateProperty = null;
        }
      )
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading.updateProperty = false;
        state.success.updateProperty = false;
        state.error.updateProperty = action.payload as string;
      });

    builder
      .addCase(deleteProperty.pending, (state) => {
        state.loading.deleteProperty = true;
        state.success.deleteProperty = false;
        state.error.deleteProperty = null;
      })
      .addCase(
        deleteProperty.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading.deleteProperty = false;
          state.success.deleteProperty = true;
          state.properties = state.properties.filter(
            (property) => property.id !== action.payload.id
          );
          if (state.property && state.property.id === action.payload.id) {
            state.property = null;
          }
          state.error.deleteProperty = null;
        }
      )
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading.deleteProperty = false;
        state.success.deleteProperty = false;
        state.error.deleteProperty = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = propertySlice.actions;
export default propertySlice.reducer;
