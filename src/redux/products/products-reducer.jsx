import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = {
  products: [],
  isLoading: false,
  searchList: [],
  filter: '',
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
      state.products = state.products.filter(product => product.id !== payload);
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
    fetchRecommendationRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRecommendationSuccess: (state, { payload }) => {
      state.notAllowedProducts = payload;
      state.isLoading = false;
    },
    fetchRecommendationError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default { actions, reducer };
