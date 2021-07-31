import serviceAPI from '../../service';
import { productsReducer } from '.';
import axios from 'axios';

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
} = productsReducer.actions;

const addProducts = payload => async dispatch => {
  dispatch(addProductsRequest());
  try {
    const { data } = await serviceAPI.addProductQuery(payload);
    console.log(data.product);
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

    console.log(data.userFoodListByDay);
    dispatch(downloadProductsSuccess(data.userFoodListByDay));
  } catch (error) {
    dispatch(downloadProductsError(error.message));
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
        : console.log('Введите точнее запрос')
    );
  } catch (error) {
    dispatch(searchProductsError(error.message));
  }
};

export { addProducts, deleteProducts, dowloadProducts, searchProducts };
