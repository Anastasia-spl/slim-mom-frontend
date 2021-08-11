import axios from 'axios';
import apiService from '../../service/service-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authSlice } from '.';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => async dispatch => {
  dispatch(authSlice.actions.registerRequest());

  try {
    const { data } = await apiService.registerUser(credentials);
    token.set(data.user.token);
    dispatch(authSlice.actions.registerSuccess(data));
  } catch (error) {
    const err = error?.response?.data?.message || error?.response?.data?.status;
    toast.error(err);
    dispatch(authSlice.actions.registerError(err));
  }
};

const logIn = credentials => async dispatch => {
  dispatch(authSlice.actions.loginRequest());

  try {
    const { data } = await apiService.logInUser(credentials);
    token.set(data.user.token);
    dispatch(authSlice.actions.loginSuccess(data));
  } catch (error) {
    const err = error?.response?.data?.message || error?.response?.data?.status;
    toast.error(err);
    dispatch(authSlice.actions.loginError(err));
  }
};

const logOut = () => async dispatch => {
  dispatch(authSlice.actions.logoutRequest());

  try {
    await apiService.logOutUser();
    token.unset();
    dispatch(authSlice.actions.logoutSuccess());
    localStorage.setItem('user', JSON.stringify(null));
  } catch (error) {
    const err = error?.response?.data?.message || error?.response?.data?.status;
    toast.error(err);
    dispatch(authSlice.actions.logoutError(err));
  }
};

const currentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(authSlice.actions.getCurrentUserRequest());

  try {
    const { data } = await apiService.getCurrentUser();

    dispatch(authSlice.actions.getCurrentUserSuccess(data));
  } catch (error) {
    const err = error?.response?.data?.message || error?.response?.data?.status;
    dispatch(authSlice.actions.getCurrentUserError(err));
  }
};

// eslint-disable-next-line
export default { register, logIn, logOut, currentUser };
