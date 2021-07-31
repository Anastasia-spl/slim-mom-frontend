const value = localStorage.getItem('user');
const parsData = JSON.parse(value);

// console.log(parsData);

let formula;

const result = parsData
  ? (formula =
      10 * parsData.weight +
      6.25 * parsData.height -
      5 * parsData.age -
      161 -
      10 * (parsData.weight - parsData.desiredWeight))
  : (formula = 'Введите свои данные');

// console.log(result);

export default formula;
