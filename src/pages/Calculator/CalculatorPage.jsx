import DailyCaloriesForm from '../../components/DailyCaloriesForm';
import Header from '../../components/Header';
import style from './CalculatorPage.module.scss';
import DiaryContainer from '../../components/DiaryContainer';
import RightInfoPanel from '../../components/RightInfoPanel';

const CalculatorPage = () => {
  return (
    <DiaryContainer style={{ padding: 0 }}>
      <div className={style.flexContainer}>
        <div>
          <Header goBack={false} />

          <DailyCaloriesForm />
        </div>
        <RightInfoPanel />
      </div>
    </DiaryContainer>
  );
};

export default CalculatorPage;
