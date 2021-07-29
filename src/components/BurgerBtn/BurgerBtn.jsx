import styles from './BurgerBtn.module.scss';

const BurgerBtn = ({ active, setActive }) => {
  return (
    <div className={styles.burgerBtnWrapper}>
      <div
        className={
          active
            ? `${styles.burgerBtn} ${styles.cross}`
            : `${styles.burgerBtn}`
        }
        onClick={() => setActive(!active)}
      >
        <span className={styles.burgerBtn__line} />
      </div>
    </div>
  );
};

export default BurgerBtn;
