/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { authSelectors } from '../../redux/auth';
import { createSelector } from 'reselect';
import { updateUserInfo } from '../../redux/products/products-operations';
import {
  userParameters,
  getNotAllowedProducts,
} from '../../redux/products/products-selectors';
import LoaderComponent from '../LoaderComponent';
import { countDailyCalorieIntake } from '../Modal/Formula';
import {
  getStateProducts,
  getLoader,
  getCurrentDate,
} from '../../redux/products';
// import { actions } from '../../redux/products/products-reducer';
import styles from './RightInfoPanel.module.scss';

const RightInfoPanel = () => {
  const userParametersInfo = useSelector(userParameters);

  const [dailyCal, setDailyCal] = useState(0);
  const [naProducts, setNaProducts] = useState('');
  const [userInfoState, setUserInfoState] = useState(userParametersInfo);
  const dispatch = useDispatch();
  const getUserInfo = () => dispatch(updateUserInfo());
  const notAllowedProductsSelector = useSelector(getNotAllowedProducts);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const dailyCalories = localStorage.getItem('dailyCalorieIntake');

  const notAllowedProducts =
    userInfo && userInfo.productsNotAllowed.length !== 0
      ? productsToString(userInfo.productsNotAllowed)
      : 'Здесь будет отображаться Ваш рацион. Для этого заполните форму в калькуляторе!';

  useEffect(() => {
    getUserInfo();
    setUserInfoState(userInfo);
    setNaProducts(notAllowedProducts);
    // const dailyCalories =
    //   userInfo && userInfo.weight && countDailyCalorieIntake(userInfo);

    setDailyCal(dailyCalories);
  }, []);

  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
      setUserInfoState({ userParametersInfo });
    }
  });

  const allEatenCaloriesMemoSelector = createSelector(
    [getStateProducts],
    prod => {
      return prod.map(i => {
        return i.calories;
      });
    },
  );

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
    if (productsArray === undefined) {
      return;
    }
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

  const eating = !userInfo
    ? '000'
    : Math.round(sumCalories(allProductsListCalories)); //Употреблено
  const dailyRate = !userInfo ? '000' : Math.round(dailyCal); //Дневная норма
  const remaining = !userInfo ? '000' : Math.round(dailyRate) - eating; //Осталось

  const percentOfRate = !authSelectors
    ? '000'
    : Math.trunc((eating / dailyRate) * 100); //n% от нормы

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
    // <div className={styles.mainContainerForRightBar}>
    <div className={styles.panelContainer}>
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
          <span className={styles.products}>
            {isLoader ? <LoaderComponent /> : naProducts}
          </span>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default RightInfoPanel;
