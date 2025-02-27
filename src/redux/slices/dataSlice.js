import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApiData } from '../api/apiService';

export const getApiData = createAsyncThunk(
  'data/getApiData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchApiData();
      console.log('API Response:', response); 
      return response;  
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);  
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    statesWithDistricts: [], 
    genders: [],
    maritalStatus: [],
    religion: [],
    occupations: [],
    bloodGroups: [],
    componentList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiData.pending, (state) => {
        console.log('Fetching data...');
        state.status = 'loading';
      })
      .addCase(getApiData.fulfilled, (state, action) => {
        console.log('API Fulfilled:', action.payload);
        state.status = 'succeeded';
        state.statesWithDistricts = action.payload.statesWithDistricts || []; 
        state.genders = action.payload.genders || [];
        state.maritalStatus = action.payload.maritalStatus || [];
        state.religion = action.payload.religion || [];
        state.occupations = action.payload.occupations || [];
        state.bloodGroups = action.payload.bloodGroups || [];
        state.componentList = action.payload.componentList || [];
      })
      .addCase(getApiData.rejected, (state, action) => {
        console.error('API Rejected:', action.payload || action.error.message); 
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default dataSlice.reducer;
