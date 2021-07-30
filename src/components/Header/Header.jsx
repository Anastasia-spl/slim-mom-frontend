import Logo from '../Logo';
import Nav from '../Nav';
import NavAuth from '../NavAuth';
import NavNotAuth from '../NavNotAuth';
// import Language from '../Language';

import { ReactComponent as ArrowBack } from '../../assets/pictures/arrowBack.svg';
import { useHistory } from 'react-router-dom';

import styles from './Header.module.scss';

export default function Header({ goBack }) {
  let history = useHistory();
  function handleGoBack() {
    history.push('/');
    goBack = false;
  }
  const isAuthenticated = false;
  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.navWrapper}>
        {/* <Language /> */}
        <Logo isAuthorized={isAuthenticated} />
        {/* <Nav> {isAuthenticated ? <NavNotAuth /> : <NavAuth />} </Nav> */}
        <Nav> {isAuthenticated ? <NavAuth /> : <NavNotAuth />} </Nav>
        {goBack && (
          <button type="button" className={styles.arrowBtn}>
            <ArrowBack onClick={handleGoBack} />
          </button>
        )}
      </div>
    </div>
  );
}
