import { useSelector } from 'react-redux';
import { getNotAllowedProducts, isLoading } from '../../redux/products';
// import { getProducts } from '../../redux/products/products-operations';
// import { formula } from './Formula';
import Loader from '../Loader';
import styles from './Modal.module.scss';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
const shortid = require('shortid');

export default function Modal({ active, setActive, calories }) {
  const isLoading = useSelector(isLoading);
  // const dispath = useDispatch();

  // useEffect(() => {
  //   const { bloodGroup } = JSON.parse(localStorage.getItem('user'));
  //   console.log(bloodGroup);
  //   const fetchProducts = () => dispath(getProducts(bloodGroup));
  //   fetchProducts();
  // }, [dispath]);

  const products = useSelector(getNotAllowedProducts);
  const buttonClose = () => {
    const closeModal = () => setActive(false);
    const redirect = (window.location.href = '/register');
  };

  return (
    <>
      <div
        className={
          active ? `${styles.backdrop} ${styles.active}` : styles.backdrop
        }
        onClick={() => setActive(false)}
      >
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div
            className={styles.modalClose}
            onClick={() => setActive(false)}
          ></div>
          <h2 className={styles.modalTitle}>
            Ваша рекомендуемая суточная норма калорий составляет
          </h2>
          <p className={styles.modalData}>
            {calories}
            <span className={styles.madalCalories}>ккал</span>
          </p>
          <div className={styles.modalLine}></div>
          <div className={styles.modalAlignment}>
            <h3 className={styles.modalProducts}>
              Продукты, которые вам <br />
              не рекомендуется употреблять
            </h3>
            {isLoading ? (
              <Loader />
            ) : (
              <ol className={styles.modalBlockList}>
                {products.map(product => (
                  <li className={styles.modalList} key={shortid.generate()}>
                    {product}
                  </li>
                ))}
              </ol>
            )}
          </div>
          <button
            type="button"
            className={styles.modalButton}
            onClick={buttonClose}
          >
            Начать худеть
          </button>
        </div>
      </div>
    </>
  );
}
