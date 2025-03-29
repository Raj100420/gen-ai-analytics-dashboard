import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { QueryResult, ChartData } from '@/types';
import { generateMockData } from '@/lib/mockData';

interface QueryState {
  currentQuery: string;
  queryHistory: {
    id: string;
    text: string;
    timestamp: number;
  }[];
  results: Record<string, QueryResult>;
  isProcessing: boolean;
  error: string | null;
}

const initialState: QueryState = {
  currentQuery: '',
  queryHistory: [
    { id: '1', text: 'Show monthly sales for Q1 2023', timestamp: Date.now() - 7200000 },
    { id: '2', text: 'Compare customer acquisition cost by channel', timestamp: Date.now() - 86400000 },
    { id: '3', text: 'Calculate churn rate for premium users', timestamp: Date.now() - 259200000 },
  ],
  results: {},
  isProcessing: false,
  error: null,
};

export const processQuery = createAsyncThunk(
  'query/processQuery',
  async (query: string, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random failure (10% of the time)
      if (Math.random() > 0.9) {
        throw new Error('Failed to process query. Please try again.');
      }
      
      // Generate mock data for the query result
      const chartData = generateMockData();
      
      return {
        query,
        timestamp: Date.now(),
        title: query.charAt(0).toUpperCase() + query.slice(1),
        description: `Showing results for "${query}"`,
        chartData,
      } as QueryResult;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery(state, action: PayloadAction<string>) {
      state.currentQuery = action.payload;
    },
    clearCurrentQuery(state) {
      state.currentQuery = '';
    },
    setChartType(state, action: PayloadAction<{ queryId: string; chartType: 'bar' | 'line' | 'pie' | 'table' }>) {
      const { queryId, chartType } = action.payload;
      if (state.results[queryId]) {
        state.results[queryId].chartType = chartType;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.isProcessing = false;
        const result = action.payload;
        const queryId = `query-${Date.now()}`;
        
        // Add to results
        state.results[queryId] = {
          ...result,
          id: queryId,
          chartType: 'bar',
        };
        
        // Add to history if not already there
        const exists = state.queryHistory.some(item => item.text === result.query);
        if (!exists) {
          state.queryHistory.unshift({
            id: queryId,
            text: result.query,
            timestamp: result.timestamp,
          });
        }
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentQuery, clearCurrentQuery, setChartType } = querySlice.actions;
export default querySlice.reducer;
