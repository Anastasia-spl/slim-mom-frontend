import axios from 'axios';

axios.defaults.baseURL = `https://slim-mom-5group.herokuapp.com`;

const apiService = {
  getCurrentUser() {
    return axios.get(`/users/current`);
  },

  getnotAllowedProducts(bloodGroup) {
    return axios.get(`/products/recommendation?bloodGroup=${bloodGroup}`);
  },

  logInUser(credentials) {
    return axios.post(`/users/login`, credentials);
  },

  registerUser(credentials) {
    return axios.post(`/users/registration`, credentials);
  },

  logOutUser() {
    return axios.post(`/users/logout`);
  },
  addProductQuery(payload) {
    return axios.post('/products', payload);
  },

  getProductsQuery(date) {
    return axios.get(`/products/eaten?date=${date}&page=1&limit=10`);
  },

  deletProductQuery(id) {
    return axios.delete(`/products/${id}`);
  },

  searchProductQuery(value) {
    return axios.get(`products/search?query=${value}`);
  },
};

export default apiService;
