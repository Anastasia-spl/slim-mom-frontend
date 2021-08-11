import { NavLink } from 'react-router-dom';
import { authSelectors, authOperations } from '../../redux/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { modalAddProduct, actions } from '../../redux/products';

import { v4 as uuidv4 } from 'uuid';

import routes from '../../routes';
import styles from './NavAuth.module.scss';
import BurgerMenu from '../BurgerMenu';
import BurgerBtn from '../BurgerBtn';

export default function NavAuth() {
  const [menuActive, setMenuActive] = useState(false);

  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const isModalAddProducts = useSelector(modalAddProduct);

  const navLinks = useMemo(() => routes.filter(route => route.isNav), []);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = menuActive ? 'hidden' : 'auto';
  }, [menuActive]);

  const onLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  const handelCloseModal = e => {
    dispatch(actions.modalAddProductSuccess());
  };

  const handleCloseBurger = () => {
    setMenuActive(false);
  };

  return (
    <div className={styles.NavAuthWrapper}>
      <div className={styles.linksWrapper}>
        {navLinks.map(link => (
          <NavLink
            key={uuidv4()}
            to={link.path}
            exact
            className={styles.enter}
            activeClassName={styles.activeEnter}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <BurgerMenu isActive={menuActive} onCloseBurger={handleCloseBurger} />

      <BurgerBtn active={menuActive} setActive={setMenuActive} />

      <div className={styles.userWrapper}>
        {isModalAddProducts ? (
          <button className={styles.closeModal} onClick={handelCloseModal}>
            <svg
              width="12"
              height="7"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.5V4.5H2M2 4.5L5.5 1M2 4.5L5.5 8"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </button>
        ) : null}

        <p className={styles.userName}>{name}</p>
        <button onClick={onLogOut} className={styles.logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
