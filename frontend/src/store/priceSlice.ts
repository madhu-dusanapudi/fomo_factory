import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

interface PriceState {
  data: PriceData[];
  stock: string;
}

const initialState: PriceState = {
  data: [],
  stock: '',
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<PriceData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { updatePrice } = priceSlice.actions;
export default priceSlice.reducer;
