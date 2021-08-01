import styles from './BurgerBtn.module.scss';

const BurgerBtn = ({ active, setActive }) => {
  return (
    <div className={styles.burgerBtnWrapper} onClick={() => setActive(!active)}>
      <div
        className={
          active ? `${styles.burgerBtn} ${styles.cross}` : `${styles.burgerBtn}`
        }
      >
        <span className={styles.burgerBtn__line} />
      </div>
    </div>
  );
};

export default BurgerBtn;
