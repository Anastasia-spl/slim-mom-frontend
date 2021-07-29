import { createSelector } from '@reduxjs/toolkit';

const getNotAllowedProducts = state => state.products.items;

// eslint-disable-next-line
export default {
  getNotAllowedProducts,
};
