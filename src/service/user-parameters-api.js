import apiService from './service-api';

const sendUserParameters = async credentials => {
  try {
    await apiService.setUserParameters(credentials);
  } catch (error) {
    console.log(error)
  }
};

export {
  sendUserParameters
}