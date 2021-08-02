import BaseLoader from 'react-loader-spinner';
import styles from './LoaderComponent.module.scss';

const LoaderComponent = () => {
  return (
    <div className={styles.loaderWrapper}>
      <BaseLoader type="ThreeDots" color="#fc842d" height={40} width={40} />
    </div>
  );
};

export default LoaderComponent;
