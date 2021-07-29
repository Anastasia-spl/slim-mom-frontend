import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';

import routes from '../../routes';
import styles from './NavNotAuth.module.scss';

export default function NavNotAuth() {
  const navLinks = useMemo(() => routes.filter(route => !route.isNav), []);
  return (
    <div className={styles.NavNotAuthWrapper}>
      <NavLink
        to="/login"
        className={styles.enter}
        activeClassName={styles.activeEnter}
      >
        вход
      </NavLink>
      <NavLink
        to="/register"
        className={styles.enter}
        activeClassName={styles.activeEnter}
      >
        регистрация
      </NavLink>
    </div>
  );
}
