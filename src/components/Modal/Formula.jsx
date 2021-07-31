// const value = localStorage.getItem('user');
// const parsData = JSON.parse(value);

// // console.log(parsData);

// export let formula;

export const result = ({ height, age, weight, desiredWeight }) => {
  const formula =
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
  console.log(formula);

  localStorage.setItem('dailyCalorieIntake', JSON.stringify(formula));

  return formula;
};

// parsData
//   ? (formula =
//       10 * parsData.weight +
//       6.25 * parsData.height -
//       5 * parsData.age -
//       161 -
//       10 * (parsData.weight - parsData.desiredWeight))
//   : (formula = 'Введите свои данные');

// localStorage.setItem('dailyCalorieIntake', JSON.stringify(formula));

// console.log(result);

// export default formula;
