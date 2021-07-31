import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import styles from './BurgerMenu.module.scss';
import routes from '../../routes';

const BurgerMenu = ({ isActive }) => {
  const navLinks = useMemo(() => routes.filter(route => route.isNav), []);

  return (
    <div
      className={
        isActive
          ? `${styles.burgerMenu} ${styles.active}`
          : `${styles.burgerMenu}`
      }
    >
      {navLinks.map(link => (
        <NavLink
          key={uuidv4()}
          to={link.path}
          exact
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default BurgerMenu;
