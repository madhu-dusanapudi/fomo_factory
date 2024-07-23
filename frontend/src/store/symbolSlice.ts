// store/symbolSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SymbolState {
  symbol: string;
}

const initialState: SymbolState = {
  symbol: 'bitcoin', // Default symbol
};

const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
