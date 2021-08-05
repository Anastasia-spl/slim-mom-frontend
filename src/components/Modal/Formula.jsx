export const countDailyCalorieIntake = ({
  height,
  age,
  weight,
  desiredWeight,
}) => {
  const result =
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);

  const formula = Math.floor(result * 100) / 100;

  return formula;
};
