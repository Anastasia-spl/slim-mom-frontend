import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/products/products-operations';
import { authSelectors } from '../../redux/auth';
import { createSelector } from 'reselect';
import Loader from '../../components/Loader';
import {
  getNotAllowedProducts,
  getStateProducts,
  getLoader,
  getCurrentDate,
} from '../../redux/products';
import styles from './RightInfoPanel.module.scss';

const RightInfoPanel = () => {
  const [dailyCal, setDailyCal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authSelectors) {
      const getBloudLS = JSON.parse(localStorage.getItem('user')).bloodGroup;
      dispatch(getProducts(getBloudLS));
      setDailyCal(JSON.parse(localStorage.getItem('dailyCalorieIntake')));
    }
  }, []);

  const productsListNAmemoSelector = createSelector(
    [getNotAllowedProducts],
    prod => {
      return prod.map(i => {
        return i;
      });
    },
  );

  const allEatenCaloriesMemoSelector = createSelector(
    [getStateProducts],
    prod => {
      return prod.map(i => {
        return i.calories;
      });
    },
  );

  const productsListNA = useSelector(productsListNAmemoSelector);
  const allProductsListCalories = useSelector(allEatenCaloriesMemoSelector);
  const getDate = useSelector(getCurrentDate);
  const isLoader = useSelector(getLoader);
  const date = getDate; // Дата для отображаемого списка

  const sumCalories = arrayCalories => {
    if (arrayCalories.length > 0) {
      return arrayCalories.reduce((acc = 0, item) => {
        return acc + item;
      });
    } else {
      return '000';
    }
  };
  function productsToString(productsArray) {
    let textString = '';
    productsArray.forEach((product, idx) => {
      if (idx === 0) {
        textString += `${product}`;
        textString = textString[0].toUpperCase() + textString.substring(1);
      } else if (idx > 0) {
        textString += `, ${product}`;
      }
    });
    return textString;
  }

  const eating = !authSelectors ? '000' : sumCalories(allProductsListCalories); //Употреблено
  const dailyRate = !authSelectors ? '000' : dailyCal; //Дневная норма
  const remaining = !authSelectors ? '000' : dailyRate - eating; //Осталось
  const percentOfRate = !authSelectors
    ? '000'
    : Math.trunc((eating / dailyRate) * 100); //n% от нормы

  return (
    <div className={styles.panelContainer}>
      {/* <div className={styles.userWrapper}>
        // <p className={styles.userName}>{name}</p>
        <button onClick={onLogOut} className={styles.logout}>
          // Выйти //{' '}
        </button>
      </div> */}
      <div className={styles.panelContainerInner}>
        <div className={styles.contentBlock}>
          <div className={styles.informationListBlock}>
            <h5 className={styles.informationListTitle}>Сводка за {date}</h5>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span>Осталось</span>
                <span className={styles.listItemValue}>{remaining} ккал</span>
              </li>
              <li className={styles.listItem}>
                <span>Употреблено</span>
                <span className={styles.listItemValue}>{eating} ккал</span>
              </li>
              <li className={styles.listItem}>
                <span>Дневная норма</span>
                <span className={styles.listItemValue}>{dailyRate} ккал</span>
              </li>
              <li className={styles.listItem}>
                <span>n% от нормы</span>
                <span className={styles.listItemValue}>
                  {percentOfRate}% ккал
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.productsBlock}>
          <h5 className={styles.productsTitle}>Нерекомендуемые продукты</h5>
          <span className={styles.products}>
            {!authSelectors ? (
              'Здесь будет отображаться Ваш рацион'
            ) : isLoader ? (
              <Loader />
            ) : (
              productsToString(productsListNA)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
export default RightInfoPanel;
