// import axios from 'axios';
// import reducer from './notAllowed-reducer';

// const { actions } = reducer;

// const getProducts = bloodGroup => async dispatch => {
//   dispatch(actions.fetchRecommendationRequest());
//   try {
//     const { data } = await axios.get(
//       `/products/recommendation?bloodGroup=${bloodGroup}`,
//     );
//     dispatch(actions.fetchRecommendationSuccess(data.productsNotAllowed));
//   } catch (error) {
//     dispatch(actions.fetchRecommendationError(error.message));
//   }
// };

// // eslint-disable-next-line
// export default { getProducts };
