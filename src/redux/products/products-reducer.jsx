import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = {
  products: [],
  searchList: [],
  notAllowedProducts: [],
  newProduct: '',
  currentDate: '',
  totalPages: 1,
  notification: false,
  modalAddProduct: false,
  modalAddNewProduct: false,
  isLoading: false,
  error: null,
  userParameters: {},
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
    addNewProductSuccess: (state, { payload }) => {
      state.newProduct = payload;
      state.isLoading = false;
      state.error = null;
    },
    addNewProductRequest: state => {
      state.isLoading = true;
    },
    addNewProductError: (state, { payload }) => {
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
    searchTotalPagesSuccess: (state, { payload }) => {
      state.totalPages = payload;
      state.isLoading = false;
    },
    searchTotalPagesRequest: (state, { payload }) => {
      state.isLoading = true;
    },
    searchTotalPagesError: (state, { payload }) => {
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
    modalAddNewProductSuccess: state => {
      state.modalAddNewProduct = !state.modalAddNewProduct;
    },
    notificationAddNewProductSuccess: state => {
      state.notification = !state.notification;
    },
    modalAddProductSuccess: state => {
      state.modalAddProduct = !state.modalAddProduct;
      state.isLoading = false;
    },
    modalAddProductRequest: (state, { payload }) => {
      state.isLoading = true;
    },
    modalAddProductError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateUserInfoRequest: state => {
      state.isLoading = true;
    },
    updateUserInfoSuccess: (state, { payload }) => {
      state.userParameters = payload;
      state.isLoading = false;
    },
    updateUserInfoError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export { actions, reducer };
