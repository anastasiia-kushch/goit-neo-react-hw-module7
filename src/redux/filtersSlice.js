import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload.toLowerCase();
    },
  },
});

export const { setFilter } = slice.actions;
export const selectNameFilter = (state) => state.filters;
export default slice.reducer;
