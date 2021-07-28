import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,
PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

/* ПРИМЕР ИМПОРТА РЕДЬЮСЕРОВ*/

<<<<<<< Updated upstream
import { usersReducer } from './users';
// import { someReducer } from './folderName';
=======
import { notAllowedProductsReducer } from './notAllowedProducts';
import { productsReducer } from './products';
import { authSlice } from './auth';
>>>>>>> Stashed changes

const middleWare = [
  ...getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
}}), logger];

const usersPersistConfig = {
  key: 'authToken',
  storage,
  whitelist: ['token'],
}

<<<<<<< Updated upstream
// const store = configureStore({
//   reducer: {
//     // foodOrDate: someReducer,
//     auth: persistReducer(usersPersistConfig, usersReducer)
//   },
//   middleWare,
//   devTools: process.env.NODE_ENV === "development",
// });
=======
const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    products: productsReducer.reducer,
    notAllowedProducts: notAllowedProductsReducer.reducer,
  },
  middleWare,
  devTools: process.env.NODE_ENV === 'development',
});
>>>>>>> Stashed changes

// const persistor = persistStore(store);

// eslint-disable-next-line
// export { store, persistor };