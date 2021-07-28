import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';

import routes from '../../routes';
import styles from './NavNotAuth.module.scss';

export default function NavNotAuth() {
  const navLinks = useMemo(() => routes.filter(route => !route.isNav), []);
  return (
    <div className={styles.NavNotAuthWrapper}>
      {navLinks.map(link => (
        <NavLink
          to={link.path}
          exact
          className={styles.enter}
          activeClassName={styles.activeEnter}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
