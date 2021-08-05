import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { authOperations } from '../../redux/auth';
import styles from './RegisterForm.module.scss';
import * as yup from 'yup';
import routes from '../../routes';
import eye from '../../assets/pictures/eye.svg';
import eyeCrossed from '../../assets/pictures/eye-crossed.svg';

import GoogleAuthBtn from '../GoogleAuthBtn';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const onRegister = credentials =>
    dispatch(authOperations.register(credentials));

  const [cross, setCross] = useState(true);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setDataUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const handleClick = () => {
    setCross(!cross);
  };

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    email: yup
      .string()
      .email()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    password: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
  });

  const login = routes.find(route => route.label === 'Вход');

  return (
    <div className={styles.registration}>
      <Formik
        initialValues={{
          login: '',
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={values => {
          onRegister({ ...values, ...dataUser });
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Регистрация</h2>
            <div className={styles.input__form}>
              <label className={styles.label}>
                Логин*
                <input
                  className={
                    errors.login && touched.login
                      ? styles.input__error
                      : styles.input
                  }
                  type="text"
                  name="login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                />
              </label>
              {errors.login && touched.login && (
                <p className={styles.notification}>{errors.login}</p>
              )}
            </div>
            <div className={styles.input__form}>
              <label className={styles.label}>
                Почта*
                <input
                  className={
                    errors.email && touched.email
                      ? styles.input__error
                      : styles.input
                  }
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </label>
              {errors.email && touched.email && (
                <p className={styles.notification}>{errors.email}</p>
              )}
            </div>

            <div className={styles.input__form}>
              <label className={styles.label}>
                Пароль*
                <input
                  className={
                    errors.password && touched.password
                      ? styles.input__error
                      : styles.input
                  }
                  type={cross ? 'password' : 'text'}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type="button"
                  className={styles.btn__eye}
                  onClick={handleClick}
                >
                  {cross ? (
                    <img className={styles.img} src={eyeCrossed} alt="Eye" />
                  ) : (
                    <img className={styles.img} src={eye} alt="Eye" />
                  )}
                </button>
              </label>
              {errors.password && touched.password && (
                <p className={styles.notification}>{errors.password}</p>
              )}
            </div>

            <div className={styles.buttons}>
              <button
                className={styles.btn__register}
                type="submit"
                disabled={!isValid || !dirty}
                onClick={handleSubmit}
              >
                Регистрация
              </button>

              <NavLink className={styles.btn__login} to={`${login.path}`}>
                {login.label}
              </NavLink>
            </div>

            <GoogleAuthBtn />
          </form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;
