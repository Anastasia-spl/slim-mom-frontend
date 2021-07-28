import formula from './Formula';
import styles from './Modal.module.scss';
const shortid = require('shortid');

export default function Modal({ active, setActive, products }) {
  const buttonClose = () => {
    const closeModal = () => setActive(false);
    const redirect = (window.location.href = '/register');
  };

  return (
    <>
      <div
        className={
          active ? `[${styles.backdrop} ${styles.active}]` : styles.backdrop
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
            {formula}
            <span className={styles.madalCalories}>ккал</span>
          </p>
          <div className={styles.modalLine}></div>
          <div className={styles.modalAlignment}>
            <h3 className={styles.modalProducts}>
              Продукты, которые вам <br />
              не рекомендуется употреблять
            </h3>
            {/* <ol className={styles.modalBlockList}>
              {products.map(product => (
                <li className={styles.modalList} key={shortid.generate()}>
                  {product.title.ru}
                </li>
              ))}
            </ol> */}
            <ol className={styles.modalBlockList}>
              <li className={styles.modalList}>Мучные продукты</li>
              <li className={styles.modalList}>Молоко</li>
              <li className={styles.modalList}>Красное мясо</li>
              <li className={styles.modalList}>Копчённости</li>
            </ol>
          </div>
          <button
            type="button"
            to="/register"
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
