import apiService from './service-api';
// import { actions } from '../redux/products/products-reducer';
// const {updateUserInfoSuccess} = actions;
const sendUserParameters = credentials =>  async dispatch => {
  try {
    await apiService.setUserParameters(credentials);
    // dispatch(updateUserInfoSuccess(credentials))
  } catch (error) {
    console.log(error)
  }
};

export {
  sendUserParameters
}