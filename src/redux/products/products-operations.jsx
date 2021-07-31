import serviceAPI from '../../service';
import { toast } from 'react-toastify';
import { productsReducer } from '.';

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
} = productsReducer.actions;

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

const searchProducts = value => async dispatch => {
  dispatch(searchProductsRequest());
  try {
    const {
      data: { productsList },
    } = await serviceAPI.searchProductQuery(value);
    if (
      productsList.length < 10
        ? dispatch(searchProductsSuccess(productsList))
        : toast.warning('Введите запрос точнее')
    );
  } catch (error) {
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

export {
  addProducts,
  deleteProducts,
  dowloadProducts,
  searchProducts,
  getProducts,
};
