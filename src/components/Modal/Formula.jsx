export const countDailyCalorieIntake = ({
  height,
  age,
  weight,
  desiredWeight,
}) => {
  const formula =
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
  return formula;
};
