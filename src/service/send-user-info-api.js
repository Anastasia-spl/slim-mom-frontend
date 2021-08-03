import apiService from './service-api';

export const sendUserParameters = async credentials => {
  try {
    await apiService.setUserParameters(credentials);
  } catch (error) {
    console.log(error)
  }
};
