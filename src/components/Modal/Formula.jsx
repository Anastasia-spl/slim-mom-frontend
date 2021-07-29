// const formula = 2800;
const value = localStorage.getItem('user');
const parsData = JSON.parse(value);

console.log(value);
console.log(parsData);

const formula =
  10 * parsData.weight +
  6.25 * parsData.height -
  5 * parsData.age -
  161 -
  10 * (parsData.weight - parsData.desiredWeight);

// const formula = 1;

export default formula;
