const getStateProducts = state => state.products.products;
const getSearchList = state => state.products.searchList;
const getLoader = state => state.products.isLoading;
const getCurrentDate = state => state.products.currentDate;
const isTotalPages = state => state.products.totalPages;
const getNotAllowedProducts = state => state.products.notAllowedProducts;
const isLoading = state => state.products.isLoading;
const notification = state => state.products.notification;
const modalAddProduct = state => state.products.modalAddProduct;
const modalAddNewProduct = state => state.products.modalAddNewProduct;
const userParameters = state => state.products.userParameters;

export {
  getStateProducts,
  getSearchList,
  getLoader,
  getNotAllowedProducts,
  isLoading,
  getCurrentDate,
  modalAddProduct,
  isTotalPages,
  userParameters,
  modalAddNewProduct,
  notification,
};
