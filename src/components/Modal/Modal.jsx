import { useSelector } from 'react-redux';
import { getNotAllowedProducts, isLoading } from '../../redux/products';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader';
import styles from './Modal.module.scss';
const shortid = require('shortid');

export default function Modal({ active, setActive, calories }) {
  const isOnLoading = useSelector(isLoading);
  const products = useSelector(getNotAllowedProducts);
  const history = useHistory();
  const buttonClose = () => {
    setActive(false);
    history.push('/register');
  };

  return (
    <>
      <div
        className={
          active ? `${styles.modalBackdrop} ${styles.active}` : styles.backdrop
        }
        onClick={() => setActive(false)}
      >
        <div className={styles.modalClose2}></div>
        <div className={styles.modalRectangle}></div>
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
            {isOnLoading ? (
              <div className={styles.modalLoader}>
                <Loader />
              </div>
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
