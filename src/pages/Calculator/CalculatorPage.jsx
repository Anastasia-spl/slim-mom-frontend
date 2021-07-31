import DailyCaloriesForm from '../../components/DailyCaloriesForm';
import Header from '../../components/Header';

const CalculatorPage = () => {
  return (
    <div>
      <Header goBack={false} />

      <DailyCaloriesForm />
    </div>
  );
};

export default CalculatorPage;
