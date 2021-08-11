import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfo } from '../../redux/products/products-operations';
import {
  getNotAllowedProducts,
  getCurrentDate,
  getCaloriesListPerDay,
  getLoader,
  getDailyCaloriesIntake,
} from '../../redux/products/products-selectors';
import Loader from '../Loader';
import styles from './RightInfoPanel.module.scss';

const RightInfoPanel = () => {
  const date = useSelector(getCurrentDate);
  const dailyCaloriesIntake = useSelector(getDailyCaloriesIntake);
  const caloriesListPerDay = useSelector(getCaloriesListPerDay);
  const notAllowedProducts = useSelector(getNotAllowedProducts);
  const isLoading = useSelector(getLoader);

  const dispatch = useDispatch();

  useEffect(() => {
    const takeUserInfo = () => dispatch(getUserInfo());
    takeUserInfo();
    // eslint-disable-next-line
  }, []);

  const notAllowedProductsString =
    notAllowedProducts.length === 0
      ? 'Здесь будет отображаться Ваш рацион. Для этого заполните форму в калькуляторе!'
      : notAllowedProducts[0][0].toUpperCase() +
        notAllowedProducts.join(', ').slice(1);

  const sumCalories = arrayCalories => {
    if (arrayCalories.length > 0) {
      return arrayCalories.reduce((acc = 0, item) => {
        return acc + item;
      });
    } else {
      return '000';
    }
  };

  const eating = Math.round(sumCalories(caloriesListPerDay)); //Употреблено
  const dailyRate = Math.round(dailyCaloriesIntake); //Дневная норма
  const remaining = Math.round(dailyRate) - eating; //Осталось

  const percentOfRate = Math.trunc((eating / dailyRate) * 100); //n% от нормы

  const displayRemaining = remaining => {
    if (remaining !== '000' && remaining < 0) {
      return (
        <li key="qk-1" className={styles.listItem}>
          <span>Осталось</span>
          <span className={styles.listItemValue}>
            0 ккал
            <br />
            <span style={{ color: 'red' }} className={styles.listItemValueRed}>
              ! Превышено: {remaining * -1} ккал
            </span>
          </span>
        </li>
      );
    } else {
      return (
        <li key="qk-1" className={styles.listItem}>
          <span>Осталось</span>
          <span className={styles.listItemValue}>{remaining} ккал</span>
        </li>
      );
    }
  };
  return (
    <div className={styles.panelContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.panelContainerInner}>
          <div className={styles.contentBlock}>
            <div className={styles.informationListBlock}>
              <h5 className={styles.informationListTitle}>Сводка за {date}</h5>
              <ul className={styles.list}>
                {displayRemaining(remaining)}
                <li key="qk-2" className={styles.listItem}>
                  <span>Употреблено</span>
                  <span className={styles.listItemValue}>{eating} ккал</span>
                </li>
                <li key="qk-3" className={styles.listItem}>
                  <span>Дневная норма</span>
                  <span className={styles.listItemValue}>{dailyRate} ккал</span>
                </li>
                <li key="qk-4" className={styles.listItem}>
                  <span>n% от нормы</span>
                  <span className={styles.listItemValue}>
                    {isNaN(percentOfRate) || percentOfRate === Infinity
                      ? 0
                      : percentOfRate}
                    %
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.productsBlock}>
            <h5 className={styles.productsTitle}>Нерекомендуемые продукты</h5>
            <span className={styles.products}>{notAllowedProductsString}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default RightInfoPanel;
