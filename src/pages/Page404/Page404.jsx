import styles from './Page404.module.scss';
import strawberry from '../../assets/pictures/StrawberryBig.png';

const Page404 = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.errorWrapper}>
        <span>4</span>
        <img src={strawberry} alt="strawberry" height={90} width={90} className={styles.strawberry}/>
        <span>4</span>
      </div>
      <h2 className={styles.subTitle}>Ой, кажется ты потерялся!</h2>
      <p className={styles.text}>Страница, которую ты ищешь, не существует.</p>
    </div>
  );
};

export default Page404;
