import serviceAPI from '../../service';
import { toast } from 'react-toastify';
import { actions } from '.';
import { countDailyCalorieIntake } from '../../components/Modal/Formula';

const {
  notificationAddNewProductSuccess,
  addNewProductSuccess,
  addNewProductRequest,
  addNewProductError,
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
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoError,
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
    dispatch(notificationAddNewProductSuccess());
    dispatch(searchProductsError(error.message));
  }
};

const getProductsRecommendation = bloodGroup => async dispatch => {
  dispatch(fetchRecommendationRequest());
  try {
    const { data } = await serviceAPI.getnotAllowedProducts(bloodGroup);
    dispatch(fetchRecommendationSuccess(data.productsNotAllowed));
  } catch (error) {
    dispatch(fetchRecommendationError(error.message));
  }
};

const getUserInfo = () => async dispatch => {
  dispatch(updateUserInfoRequest());
  try {
    const {
      data: { userInfo },
    } = await serviceAPI.getUserParameters();
    dispatch(updateUserInfoSuccess(userInfo));
    userInfo.productsNotAllowed &&
      dispatch(actions.fetchRecommendationSuccess(userInfo.productsNotAllowed));
  } catch (error) {
    dispatch(updateUserInfoError(error.message));
  }
};

const addNewProduct = newProduc => async dispatch => {
  dispatch(addNewProductRequest());
  try {
    const { data } = await serviceAPI.addNewProduct(newProduc);
    toast.success(`${data.product.title} успешно добавлена`);
    dispatch(addNewProductSuccess(data.product.title));
  } catch (error) {
    dispatch(addNewProductError(error.massage));
  }
};

export {
  addProducts,
  deleteProducts,
  dowloadProducts,
  searchProducts,
  getProductsRecommendation,
  getUserInfo,
  addNewProduct,
};
