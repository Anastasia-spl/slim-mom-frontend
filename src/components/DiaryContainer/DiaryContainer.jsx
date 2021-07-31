import styles from './DiaryContainer.module.scss';

const Container = ({ children }) => (
  <div className={styles.Container}>{children} </div>
);
export default Container;
