import { NavLink } from 'react-router-dom';
import {
  // authSelectors,
  authOperations,
} from '../../redux/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';

import routes from '../../routes';
import styles from './NavAuth.module.scss';
import BurgerBtn from '../BurgerBtn';

export default function NavAuth() {
  const [menuActive, setMenuActive] = useState(false);

  const dispatch = useDispatch();
  // const name = useSelector(authSelectors.getUsername);
  const name = 'CurrentUser';
  const navLinks = useMemo(() => routes.filter(route => route.isNav), []);

  const onLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className={styles.NavAuthWrapper}>
      <div
        className={
          menuActive
            ? `${styles.linksWrapper} ${styles.active}`
            : `${styles.linksWrapper}`
        }
      >
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

      <BurgerBtn active={menuActive} setActive={setMenuActive} />

      <div className={styles.userWrapper}>
        <p className={styles.userName}>{name}</p>
        <button onClick={onLogOut} className={styles.logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
