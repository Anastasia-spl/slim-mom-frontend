import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = {
  products: [],
  isLoading: false,
  searchList: [],
  currentDate: new Date(),
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    addProductsSuccess: (state, { payload }) => {
      state.products = [...state.products, payload];
      state.isLoading = false;
      state.error = null;
    },
    addProductsRequest: state => {
      state.isLoading = true;
    },
    addProductsError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    deleteProductSuccess: (state, { payload }) => {
      state.products = state.products.filter(
        product => product._id !== payload,
      );
      state.isLoading = false;
    },
    deleteProductRequest: state => {
      state.isLoading = true;
    },
    deleteProductError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    downloadProductsSuccess: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
      state.error = null;
    },
    downloadProductsRequest: state => {
      state.isLoading = true;
    },
    downloadProductsError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    searchProductsSuccess: (state, { payload }) => {
      state.searchList = payload;
      state.isLoading = false;
    },
    searchProductsRequest: (state, { payload }) => {
      state.isLoading = true;
    },
    searchProductsError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    currentDateSuccess: (state, { payload }) => {
      state.currentDate = payload;
      state.isLoading = false;
    },
    currentDateRequest: (state, { payload }) => {
      state.isLoading = true;
    },
    currentDateError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default { actions, reducer };
