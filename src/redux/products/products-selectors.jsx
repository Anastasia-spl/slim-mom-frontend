import { createSelector } from '@reduxjs/toolkit';

const getStateProducts = state => state.products.products;
const getSearchList = state => state.products.searchList;
const getLoader = state => state.products.isLoading;
const getNotAllowedProducts = state => state.products.notAllowedProducts;
const isLoading = state => state.products.isLoading;

// const getFilterProducts = createSelector(
//   [getStateProducts, getStateFilterProducts],
//   (products, inputFilter) => {
//     const normolizeInputFilter = inputFilter.toLowerCase();
//     return products.filter(product =>
//       product.title.toLocaleLowerCase().includes(normolizeInputFilter),
//     );
//   },
// );

export default {
  getStateProducts,
  getSearchList,
  getLoader,
  getNotAllowedProducts,
  isLoading,
};
