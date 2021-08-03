import serviceAPI from '../../service';
// import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { actions } from '.';
// import { debounce } from 'debounce';

const {
  addProductsSuccess,
  addProductsRequest,
  addProductsError,
  deleteProductSuccess,
  deleteProductRequest,
  deleteProductError,
  downloadProductsSuccess,
  downloadProductsRequest,
  downloadProductsError,
  searchProductsSuccess,
  searchProductsRequest,
  searchProductsError,
  fetchRecommendationSuccess,
  fetchRecommendationRequest,
  fetchRecommendationError,
  searchTotalPagesSuccess,
} = actions;

const addProducts = payload => async dispatch => {
  dispatch(addProductsRequest());
  try {
    const { data } = await serviceAPI.addProductQuery(payload);
    dispatch(addProductsSuccess(data.product));
  } catch (error) {
    dispatch(addProductsError(error.massage));
  }
};

const deleteProducts = id => async dispatch => {
  dispatch(deleteProductRequest());
  try {
    await serviceAPI.deletProductQuery(id);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductError(error.massage));
  }
};

const dowloadProducts = isCurrentDate => async dispatch => {
  dispatch(downloadProductsRequest());
  try {
    const { data } = await serviceAPI.getProductsQuery(isCurrentDate);
    dispatch(downloadProductsSuccess(data.userFoodListByDay));
  } catch (error) {
    dispatch(downloadProductsError(error.message));
    dispatch(downloadProductsSuccess([]));
  }
};

const searchProducts = (value, page, limit) => async dispatch => {
  dispatch(searchProductsRequest());
  try {
    const { data } = await serviceAPI.searchProductQuery(value, page, limit);
    dispatch(searchProductsSuccess(data.productsList));
    dispatch(searchTotalPagesSuccess(data.totalPages));
  } catch (error) {
    toast.warning('Продукт не найден');
    dispatch(searchProductsError(error.message));
  }
};

const getProducts = bloodGroup => async dispatch => {
  dispatch(fetchRecommendationRequest());
  try {
    const { data } = await serviceAPI.getnotAllowedProducts(bloodGroup);
    dispatch(fetchRecommendationSuccess(data.productsNotAllowed));
  } catch (error) {
    dispatch(fetchRecommendationError(error.message));
  }
};

const updateUserInfo = () => async dispatch => {
  dispatch(fetchRecommendationRequest());
  try {
    const {
      data: { userInfo },
    } = await serviceAPI.getUserParameters();
    dispatch(fetchRecommendationSuccess(userInfo.productsNotAllowed));
    return userInfo;
  } catch (error) {
    dispatch(fetchRecommendationError(error.message));
  }
};

export {
  addProducts,
  deleteProducts,
  dowloadProducts,
  searchProducts,
  getProducts,
  updateUserInfo,
};
