const getStateProducts = state => state.products.products;
const getSearchList = state => state.products.searchList;
const getLoader = state => state.products.isLoading;
const getCurrentDate = state => state.products.currentDate;
const getNotAllowedProducts = state => state.products.notAllowedProducts;
const isLoading = state => state.products.isLoading;
const modalAddProduct = state => state.products.modalAddProduct;

export {
  getStateProducts,
  getSearchList,
  getLoader,
  getNotAllowedProducts,
  isLoading,
  getCurrentDate,
  modalAddProduct,
};
