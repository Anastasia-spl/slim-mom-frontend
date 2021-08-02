import styles from './Page404.module.scss';

const Page404 = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subTitle}>Ой, кажется ты потерялся!</h2>
      <p className={styles.text}>Страница, которую ты ищешь, не существует.</p>
    </div>
  );
};

export default Page404;
