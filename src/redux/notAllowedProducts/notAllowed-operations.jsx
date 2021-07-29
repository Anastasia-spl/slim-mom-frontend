import apiService from '../../service';
import axios from 'axios';
import actions from './notAllowed-actions';

const getProducts = () => dispatch => {
  dispatch(actions.getProductRequest());

  axios
    .get(apiService)
    .then(({ data }) => dispatch(actions.getProductSuccess(data)))
    .catch(error => dispatch(actions.getProductError(error.message)));
};

// eslint-disable-next-line
export default { getProducts };
