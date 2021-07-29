import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'notAllowedProducts',
  initialState: initialProductsState,
  reducers: {
    getProductRequest: (state, { payload }) => {
      state.products = [...state.products, payload];
      state.isLoading = false;
      state.error = null;
    },
    getProductSuccess: state => {
      state.isLoading = true;
    },
    getProductError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default { actions, reducer };
